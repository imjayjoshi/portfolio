"use client";

import { forwardRef, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { usePageTransition } from "./TransitionProvider";

interface TransitionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  transitionType?: "particle" | "glass" | "auto";
  children: React.ReactNode;
  className?: string;
}

export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(
  (
    { href, transitionType = "auto", children, className, onClick, ...props },
    ref
  ) => {
    const { navigateWithTransition, isTransitioning } = usePageTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (isTransitioning) return;

      // Call original onClick if provided
      onClick?.(e);

      // Determine transition type
      const type = transitionType === "auto" ? undefined : transitionType;

      navigateWithTransition(href, type);
    };

    return (
      <Link
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
