import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextProps {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {}
});

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem('user')
    if(!userData) {
      return null
    }
    return JSON.parse(userData);
  });

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setToken(token);

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null);

    localStorage.removeItem('user')
    setUser(null);
  };

  const contextValue: AuthContextProps = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

