// authService.js - Simple authentication service using localStorage

const AUTH_KEY = 'ai-resume-builder-user';
const USERS_KEY = 'ai-resume-builder-users';

// Initialize with demo users
export const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const defaultUsers = [
      { id: 1, email: 'demo@example.com', password: 'demo123', name: 'Demo User' },
      { id: 2, email: 'test@example.com', password: 'test123', name: 'Test User' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

export const login = (email, password) => {
  initializeUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const userData = { id: user.id, email: user.email, name: user.name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    return { success: true, user: userData };
  }
  return { success: false, error: 'Invalid email or password' };
};

export const signup = (name, email, password) => {
  initializeUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }
  
  const newUser = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    email,
    password,
    name
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  return { success: true, user: userData };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
