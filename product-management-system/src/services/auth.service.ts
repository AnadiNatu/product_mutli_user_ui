import { User } from '../types';

class AuthService {
  private readonly USER_KEY = 'orderflow_user';

  login(email: string, password: string): User | null {
    // Dummy authentication logic
    if (email === 'admin@orderflow.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'System Admin',
        email: 'admin@orderflow.com',
        role: 'admin',
        avatar: 'https://picsum.photos/seed/admin/100/100'
      };
      this.saveUser(user);
      return user;
    } else if (email === 'user@orderflow.com' && password === 'user123') {
      const user: User = {
        id: '2',
        name: 'John Customer',
        email: 'user@orderflow.com',
        role: 'customer',
        avatar: 'https://picsum.photos/seed/user/100/100'
      };
      this.saveUser(user);
      return user;
    }
    return null;
  }

  logout() {
    try {
      localStorage.removeItem(this.USER_KEY);
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  }

  getCurrentUser(): User | null {
    try {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      console.error('Error accessing localStorage', e);
      return null;
    }
  }

  private saveUser(user: User) {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  }

  updateUser(updates: Partial<User>): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    
    const updated = { ...current, ...updates };
    this.saveUser(updated);
    return updated;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  getUsers(): User[] {
    return [
      {
        id: '1',
        name: 'System Admin',
        email: 'admin@orderflow.com',
        role: 'admin',
        avatar: 'https://picsum.photos/seed/admin/100/100'
      },
      {
        id: '2',
        name: 'John Customer',
        email: 'user@orderflow.com',
        role: 'customer',
        avatar: 'https://picsum.photos/seed/user/100/100'
      }
    ];
  }
}

export const authService = new AuthService();
