import { OrderItem, Product } from '../types';

class CartService {
  private items: OrderItem[] = [];

  addToCart(product: Product) {
    const existing = this.items.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    this.notify();
  }

  removeFromCart(productId: string) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.notify();
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
    this.notify();
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.items = [];
    this.notify();
  }

  // Simple event system for React components to listen to
  private listeners: (() => void)[] = [];
  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }
  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const cartService = new CartService();
