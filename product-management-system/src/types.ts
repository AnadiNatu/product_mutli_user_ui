export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  brand: string;
  manufacturedDate: string;
  addedDate: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface CrmLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  user: string;
  details: string;
}

export interface SystemHealth {
  status: 'Healthy' | 'Degraded' | 'Down';
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  dbConnection: boolean;
  apiLatency: number;
}
