"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FluidMembraneTransition = dynamic(
  () => import("./FluidMembraneTransition").then((m) => ({ default: m.FluidMembraneTransition })),
  { ssr: false }
);

const ParticleDisintegration = dynamic(
  () => import("./ParticleDisintegration").then((m) => ({ default: m.ParticleDisintegration })),
  { ssr: false }
);

type TransitionType = "fluid" | "particle" | "glass" | "none";

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

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const router   = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType,  setTransitionType]  = useState<TransitionType>("none");
  const [showFluid,       setShowFluid]       = useState(false);
  const [showParticle,    setShowParticle]    = useState(false);
  const [clickOrigin,     setClickOrigin]     = useState({ x: 0.5, y: 0.5 });
  const lastClick = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      lastClick.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  const navigateWithTransition = useCallback(
    (href: string, type?: TransitionType) => {
      if (isTransitioning || href === pathname) return;
      const selectedType = type ?? "fluid";
      setTransitionType(selectedType);
      setIsTransitioning(true);
      setClickOrigin({ ...lastClick.current });

      if (selectedType === "particle") {
        setShowParticle(true);
        setTimeout(() => router.push(href), 550);
        setTimeout(() => { setShowParticle(false); setIsTransitioning(false); setTransitionType("none"); }, 1500);
      } else if (selectedType === "fluid") {
        setShowFluid(true);
        setTimeout(() => router.push(href), 380);
        setTimeout(() => { setShowFluid(false); setIsTransitioning(false); setTransitionType("none"); }, 950);
      } else {
        router.push(href);
        setTimeout(() => { setIsTransitioning(false); setTransitionType("none"); }, 300);
      }
    },
    [isTransitioning, pathname, router]
  );

  useEffect(() => {
    return () => {
      setIsTransitioning(false); setTransitionType("none");
      setShowFluid(false); setShowParticle(false);
    };
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning, transitionType }}>
      {children}
      {showFluid && (
        <FluidMembraneTransition active={showFluid} originX={clickOrigin.x} originY={clickOrigin.y} color="#0b0d10" />
      )}
      {showParticle && (
        <ParticleDisintegration
          active={showParticle}
          originX={clickOrigin.x}
          originY={clickOrigin.y}
          onComplete={() => { setShowParticle(false); setIsTransitioning(false); setTransitionType("none"); }}
        />
      )}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;