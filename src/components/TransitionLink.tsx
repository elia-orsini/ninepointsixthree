"use client";

import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({ children, href, ...props }: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const transitioningRef = useRef(false);

  useEffect(() => {
    if (transitioningRef.current) {
      // Route has changed, now fade out transition
      const body = document.querySelector(".main-content");
      sleep(300).then(() => {
        body?.classList.remove("page-transition");
        transitioningRef.current = false;
      });
    }
  }, [pathname]);

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const body = document.querySelector(".main-content");
    body?.classList.add("page-transition");
    transitioningRef.current = true;

    await sleep(400); // allow exit animation
    router.push(href);
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
