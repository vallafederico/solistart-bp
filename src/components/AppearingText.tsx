import { createEffect, createSignal } from "solid-js";
import gsap from "~/gsap";

export default function AppearingText({ children }: { children: any }) {
  const animateIn = (self: any) => {
    gsap.from(self, {
      autoAlpha: 0,
      y: 10,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.3,
    });
  };

  return (
    <p use:animateIn={self} class="px-gx py-gy ">
      {children}
    </p>
  );
}
