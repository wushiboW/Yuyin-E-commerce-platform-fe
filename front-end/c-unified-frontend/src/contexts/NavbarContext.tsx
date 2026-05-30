import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavbarContextValue {
  isAtTop: boolean;
  isTransparent: boolean;
  isDark: boolean;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yuyin-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const isDark = themeMode === 'dark';
  const isTransparent = isAtTop;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('yuyin-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(current => current === 'dark' ? 'light' : 'dark');
  };

  return (
    <NavbarContext.Provider value={{ isAtTop, isTransparent, isDark, themeMode, toggleTheme }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within NavbarProvider');
  }
  return context;
}