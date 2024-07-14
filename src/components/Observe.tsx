// import { createEffect, createSignal } from "solid-js";
// import { inView } from "~/stores/animation";
import gsap from "~/gsap";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect } from "solid-js";

export default function Observe({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  const animate = (self: any) => {
    console.log("self", self);

    // *** ACTUAL SETUP
    // inView(self, {
    //   inA: () => {},
    //   outA: () => {},
    // });

    // *** DEBUG
    // const vo = createVisibilityObserver(self, { threshold: 0.5 });
    // const visible = vo(() => self);

    // createEffect(() => {
    //   if (visible()) {
    //     console.log("in view");
    //   } else {
    //     console.log("not in view");
    //   }
    // });
  };

  return (
    <div use:animate={self} class={`${className}`}>
      {children}
    </div>
  );
}
