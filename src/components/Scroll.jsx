import gsap from "../gsap";
import Lenis from "lenis";

import { App } from "~/gl/app";

export const Scroll = ({ children }) => {
  const lenis = () => {
    const lenis = new Lenis();
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    lenis.on("scroll", ({ velocity, scroll, direction }) => {
      App.onScroll({ velocity, scroll, direction });
    });
  };

  return <div use:lenis>{children}</div>;
};
