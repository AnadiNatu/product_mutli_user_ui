import { Order, OrderItem } from '../types';

const ORDERS_KEY = 'app_orders';

export const orderService = {
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  getUserOrders: (userId: string): Order[] => {
    return orderService.getOrders().filter(order => order.userId === userId);
  },

  createOrder: (userId: string, items: OrderItem[], total: number): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const orders = orderService.getOrders();
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus: (orderId: string, status: Order['status']): Order | null => {
    const orders = orderService.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      return orders[index];
    }
    return null;
  }
};
