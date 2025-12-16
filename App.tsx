import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage, CalculatorPage, AboutPage, ServicesPage, KnowledgeCenterPage, DynamicCustomPage } from './pages/PublicPages';
import { LoginPage } from './pages/AuthPage';
import { Dashboard } from './pages/DashboardPages';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/knowledge" element={<KnowledgeCenterPage />} />
      <Route path="/calculators" element={<CalculatorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/page/:slug" element={<DynamicCustomPage />} />

      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
