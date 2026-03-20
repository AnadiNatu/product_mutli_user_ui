import { CrmLog, SystemHealth } from '../types';

class AdminService {
  private logs: CrmLog[] = [
    { id: 'l1', action: 'CREATE', entity: 'Product', entityId: 'p1', timestamp: new Date().toISOString(), user: 'Admin', details: 'Added Premium Wireless Headphones' },
    { id: 'l2', action: 'UPDATE', entity: 'Stock', entityId: 'p2', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'System', details: 'Stock adjusted for Smart Watch' },
    { id: 'l3', action: 'DELETE', entity: 'Product', entityId: 'p99', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Admin', details: 'Removed obsolete accessory' },
    { id: 'l4', action: 'LOGIN', entity: 'User', entityId: 'u1', timestamp: new Date(Date.now() - 10800000).toISOString(), user: 'Admin', details: 'Admin login successful' },
  ];

  getLogs(): CrmLog[] {
    return this.logs;
  }

  getHealth(): SystemHealth {
    return {
      status: 'Healthy',
      uptime: '14 days, 6 hours',
      cpuUsage: 24,
      memoryUsage: 42,
      dbConnection: true,
      apiLatency: 45
    };
  }

  addLog(action: string, entity: string, entityId: string, details: string) {
    const newLog: CrmLog = {
      id: `l${Date.now()}`,
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString(),
      user: 'Admin',
      details
    };
    this.logs.unshift(newLog);
  }
}

export const adminService = new AdminService();
