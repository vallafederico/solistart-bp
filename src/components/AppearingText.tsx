// import { createEffect, createSignal } from "solid-js";
import gsap from "~/gsap";
import { out } from "~/stores/animation";

export default function AppearingText({ children }: { children: any }) {
  const animate = (self: any) => {
    gsap.from(self, {
      autoAlpha: 0,
      y: 10,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.3,
    });

    out(() => {
      gsap.to(self, {
        autoAlpha: 0,
        y: 80,
        duration: 0.6,
        ease: "expo.out",
      });
    });
  };

  return (
    <p use:animate={self} class="px-gx py-gy ">
      {children}
    </p>
  );
}
