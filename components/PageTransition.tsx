import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useLocation } from '../context/ThemeContext';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'enter' | 'idle'>('enter');
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setTransitionStage('enter');
      setDisplayChildren(children);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  useEffect(() => {
    if (transitionStage === 'enter') {
      const timer = setTimeout(() => setTransitionStage('idle'), 400);
      return () => clearTimeout(timer);
    }
  }, [transitionStage]);

  return (
    <div
      key={pathname}
      className={transitionStage === 'enter' ? 'animate-page-enter' : ''}
      style={{ minHeight: '100%' }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
