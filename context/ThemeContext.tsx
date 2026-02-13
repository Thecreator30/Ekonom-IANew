import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// --- Theme Context ---

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check local storage or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// --- Router Shim (Replaces react-router-dom) ---

const RouterContext = createContext<{ path: string; navigate: (p: string) => void }>({ path: '/', navigate: () => {} });
const OutletContext = createContext<ReactNode>(null);

export const HashRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
        const p = window.location.hash.slice(1) || '/';
        setPath(p);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: string) => {
      window.location.hash = to;
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
};

export const useNavigate = () => {
    const { navigate } = useContext(RouterContext);
    return (to: string, opts?: any) => {
        if (opts?.replace) window.location.replace('#' + to);
        else navigate(to);
    };
};

export const useLocation = () => {
    const { path } = useContext(RouterContext);
    return { pathname: path };
};

export const useParams = () => {
    const { path } = useContext(RouterContext);
    // Simple regex for /promotions/:id pattern
    const match = path.match(/\/promotions\/([^/]+)/);
    if (match) return { id: match[1] };
    return {};
};

export const Link: React.FC<any> = ({ to, children, className }) => {
    const { navigate } = useContext(RouterContext);
    return (
        <a 
            href={`#${to}`} 
            className={className}
            onClick={(e) => { e.preventDefault(); navigate(to); }}
        >
            {children}
        </a>
    );
};

export const Navigate: React.FC<{ to: string, replace?: boolean }> = ({ to, replace }) => {
    const { navigate } = useContext(RouterContext);
    useEffect(() => navigate(to), [to, navigate]);
    return null;
};

export const Outlet = () => useContext(OutletContext);

export const Route: React.FC<any> = () => null;

export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { path } = useContext(RouterContext);

    const matchRoute = (nodes: ReactNode, parentPath = ''): ReactNode => {
        let result = null;

        React.Children.forEach(nodes, (node) => {
            if (result) return;
            if (!React.isValidElement(node)) return;

            const props = node.props as any;
            let { path: routePath, element, children } = props;
            
            let fullPath = parentPath;
            if (routePath) {
                if (routePath.startsWith('/')) fullPath = routePath;
                else fullPath = parentPath === '/' ? `/${routePath}` : `${parentPath}/${routePath}`;
            }
            if (fullPath.length > 1 && fullPath.endsWith('/')) fullPath = fullPath.slice(0, -1);

            const isExact = fullPath === path;
            const isParamMatch = fullPath.includes(':') && new RegExp('^' + fullPath.replace(/:[^/]+/g, '([^/]+)') + '$').test(path);

            if (isExact || isParamMatch) {
                result = element;
                return;
            }
            
            if (props.index && parentPath === path) {
                result = element;
                return;
            }

            const isLayout = !routePath;
            const isPrefix = fullPath !== '/' && path.startsWith(fullPath + '/');

            if ((isLayout || isPrefix) && children) {
                const childMatch = matchRoute(children, fullPath);
                if (childMatch) {
                     result = element ? <OutletContext.Provider value={childMatch}>{element}</OutletContext.Provider> : childMatch;
                }
            }
            
            if (routePath === '*') result = element;
        });
        return result;
    };

    return <>{matchRoute(children)}</>;
};