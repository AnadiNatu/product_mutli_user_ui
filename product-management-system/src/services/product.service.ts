import { Product } from '../types';

class ProductService {
  private products: Product[] = [
    {
      id: 'p1',
      name: 'Premium Wireless Headphones',
      description: 'High-fidelity audio with active noise cancellation and 40-hour battery life.',
      price: 299.99,
      category: 'Audio',
      stock: 15,
      image: 'https://picsum.photos/seed/headphones/400/300',
      brand: 'AudioTech',
      manufacturedDate: '2025-10-15',
      addedDate: '2026-01-05'
    },
    {
      id: 'p2',
      name: 'Minimalist Smart Watch',
      description: 'Elegant design with heart rate monitoring, GPS, and water resistance.',
      price: 199.50,
      category: 'Electronics',
      stock: 25,
      image: 'https://picsum.photos/seed/watch/400/300',
      brand: 'FitLife',
      manufacturedDate: '2025-11-20',
      addedDate: '2026-01-10'
    },
    {
      id: 'p3',
      name: 'Ergonomic Mechanical Keyboard',
      description: 'Tactile switches with customizable RGB lighting and aluminum frame.',
      price: 149.00,
      category: 'Accessories',
      stock: 10,
      image: 'https://picsum.photos/seed/keyboard/400/300',
      brand: 'GamePro',
      manufacturedDate: '2025-09-05',
      addedDate: '2026-01-15'
    },
    {
      id: 'p4',
      name: 'Ultra-Wide Curved Monitor',
      description: '34-inch display with 144Hz refresh rate for immersive gaming and productivity.',
      price: 549.99,
      category: 'Electronics',
      stock: 5,
      image: 'https://picsum.photos/seed/monitor/400/300',
      brand: 'Visionary',
      manufacturedDate: '2025-12-01',
      addedDate: '2026-02-01'
    },
    {
      id: 'p5',
      name: 'Professional Studio Microphone',
      description: 'Cardioid polar pattern with built-in pop filter for crystal clear recording.',
      price: 129.00,
      category: 'Audio',
      stock: 20,
      image: 'https://picsum.photos/seed/mic/400/300',
      brand: 'VocalMaster',
      manufacturedDate: '2025-08-12',
      addedDate: '2026-02-10'
    },
    {
      id: 'p6',
      name: 'Leather Laptop Sleeve',
      description: 'Handcrafted genuine leather with soft microfiber lining for 14-inch laptops.',
      price: 79.00,
      category: 'Accessories',
      stock: 30,
      image: 'https://picsum.photos/seed/sleeve/400/300',
      brand: 'LuxCase',
      manufacturedDate: '2025-07-20',
      addedDate: '2026-02-15'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  deductStock(productId: string, quantity: number): boolean {
    const product = this.products.find(p => p.id === productId);
    if (product && product.stock >= quantity) {
      product.stock -= quantity;
      return true;
    }
    return false;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  updateProduct(id: string, updatedProduct: Partial<Product>) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
    }
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(p => p.id !== id);
  }
}

export const productService = new ProductService();
