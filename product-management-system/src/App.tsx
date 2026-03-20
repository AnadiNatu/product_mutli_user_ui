import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { LoginPage } from './modules/auth/LoginPage';
import { ProductList } from './modules/customer/ProductList';
import { CartPage } from './modules/customer/CartPage';
import { AdminDashboard } from './modules/admin/Dashboard';
import { CrmLogsPage } from './modules/admin/CrmLogsPage';
import { HealthCheckPage } from './modules/admin/HealthCheckPage';
import { ProductManagement } from './modules/admin/ProductManagement';
import { OrderHistory } from './modules/customer/OrderHistory';
import { ProfilePage } from './modules/user/ProfilePage';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-sky-50/30 dark:bg-slate-950 flex flex-col transition-colors duration-300">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <footer className="bg-white dark:bg-slate-900 border-t border-sky-100 dark:border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sky-400 dark:text-slate-500 text-sm font-medium">
          © 2026 OrderFlow Premium. Built with efficiency and style.
        </p>
      </div>
    </footer>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Customer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['customer', 'admin']} />}>
              <Route
                path="/"
                element={
                  <AppLayout>
                    <ProductList />
                  </AppLayout>
                }
              />
              <Route
                path="/cart"
                element={
                  <AppLayout>
                    <CartPage />
                  </AppLayout>
                }
              />
              <Route
                path="/orders"
                element={
                  <AppLayout>
                    <OrderHistory />
                  </AppLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <AppLayout>
                    <ProfilePage />
                  </AppLayout>
                }
              />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route
                path="/admin"
                element={
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                }
              />
              <Route
                path="/admin/logs"
                element={
                  <AppLayout>
                    <CrmLogsPage />
                  </AppLayout>
                }
              />
              <Route
                path="/admin/health"
                element={
                  <AppLayout>
                    <HealthCheckPage />
                  </AppLayout>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AppLayout>
                    <ProductManagement />
                  </AppLayout>
                }
              />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
