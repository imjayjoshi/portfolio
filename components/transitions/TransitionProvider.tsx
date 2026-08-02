"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type TransitionContextType = {
  navigateWithTransition: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [show, setShow] = useState(false);

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (isTransitioning || href === pathname) return;
      setIsTransitioning(true);
      setShow(true);
      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          setShow(false);
          setIsTransitioning(false);
        }, 300);
      }, 200);
    },
    [isTransitioning, pathname, router],
  );

  useEffect(() => {
    setShow(false);
    setIsTransitioning(false);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            key="transition"
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ background: "#0d1117" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
