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
import dynamic from "next/dynamic";

// Lazy load transition components
const ParticleTransition = dynamic(
  () =>
    import("./ParticleTransition").then((mod) => ({
      default: mod.ParticleTransition,
    })),
  { ssr: false }
);

const GlassWipe = dynamic(
  () => import("./GlassWipe").then((mod) => ({ default: mod.GlassWipe })),
  { ssr: false }
);

type TransitionType = "particle" | "glass" | "none";

interface TransitionContextType {
  navigateWithTransition: (href: string, type?: TransitionType) => void;
  isTransitioning: boolean;
  transitionType: TransitionType;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
  transitionType: "none",
});

export const usePageTransition = () => useContext(TransitionContext);

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>("none");
  const [showParticle, setShowParticle] = useState(false);
  const [showGlass, setShowGlass] = useState(false);

  const navigateWithTransition = useCallback(
    (href: string, type?: TransitionType) => {
      if (isTransitioning || href === pathname) return;

      const selectedType = type || "glass";

      setTransitionType(selectedType);
      setIsTransitioning(true);

      if (selectedType === "particle") {
        setShowParticle(true);
        // Navigate after particle animation starts (faster)
        setTimeout(() => {
          router.push(href);
        }, 300);
        // Hide particle after navigation
        setTimeout(() => {
          setShowParticle(false);
          setIsTransitioning(false);
          setTransitionType("none");
        }, 600);
      } else if (selectedType === "glass") {
        setShowGlass(true);
        // Navigate quickly with glass wipe
        setTimeout(() => {
          router.push(href);
        }, 150);
        // Hide glass after animation completes
        setTimeout(() => {
          setShowGlass(false);
          setIsTransitioning(false);
          setTransitionType("none");
        }, 400);
      } else {
        // No transition - immediate navigation
        router.push(href);
        setIsTransitioning(false);
        setTransitionType("none");
      }
    },
    [isTransitioning, pathname, router]
  );

  // Reset transition state if route changes unexpectedly
  useEffect(() => {
    return () => {
      setIsTransitioning(false);
      setTransitionType("none");
      setShowParticle(false);
      setShowGlass(false);
    };
  }, [pathname]);

  return (
    <TransitionContext.Provider
      value={{
        navigateWithTransition,
        isTransitioning,
        transitionType,
      }}
    >
      {children}

      {/* Particle Transition */}
      {showParticle && (
        <ParticleTransition active={showParticle} direction="in" />
      )}

      {/* Glass Wipe Transition */}
      {showGlass && <GlassWipe active={showGlass} direction="left" />}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
