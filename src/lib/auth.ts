// Mock authentication system with predefined users
// In production, this should be replaced with a real backend

export type UserRole = 'admin' | 'client' | 'provider';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
  phone?: string;
  avatar?: string;
}

// Predefined users for testing
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@flyvenezuela.com',
    password: 'admin123',
    name: 'Administrador General',
    role: 'admin',
    company: 'FlyVenezuela',
    phone: '+58 212 000-0000',
    avatar: '👨‍💼',
  },
  {
    id: '2',
    email: 'cliente@demo.com',
    password: 'cliente123',
    name: 'Juan Pérez',
    role: 'client',
    company: 'Aviación Ejecutiva CA',
    phone: '+58 412 000-0001',
    avatar: '✈️',
  },
  {
    id: '3',
    email: 'proveedor@demo.com',
    password: 'proveedor123',
    name: 'María García',
    role: 'provider',
    company: 'Servicios Aeroportuarios VE',
    phone: '+58 414 000-0002',
    avatar: '🏢',
  },
];

export const authenticate = (email: string, password: string): User | null => {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const logout = (): void => {
  setCurrentUser(null);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: UserRole): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};
