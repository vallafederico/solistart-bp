// import { createEffect, createSignal } from "solid-js";
import gsap from "~/gsap";

export default function Alpha({ children }: { children: any }) {
  const animateIn = (self: any) => {
    gsap.from(self, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "linear",
      delay: 0.3,
    });
  };

  return (
    <div use:animateIn={self} class="px-gx py-gy block ">
      {children}
    </div>
  );
}
