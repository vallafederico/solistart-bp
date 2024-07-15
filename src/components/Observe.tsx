import { onView, onOut } from "~/stores/animationStore";
import gsap from "~/gsap";
import { onCleanup, onMount } from "solid-js";

export default function Observe({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  const animate = (self: any) => {
    gsap.set(self, { autoAlpha: 0, y: -10 });

    let inviewAnimation: gsap.core.Tween | null = null;

    onView(self, {
      onIn: () => {
        inviewAnimation = gsap.to(self, {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          delay: 0.1,
          ease: "slow.out",
        });
      },
      onOut: () => {
        if (inviewAnimation) inviewAnimation.kill();
        inviewAnimation = gsap.set(self, {
          autoAlpha: 0,
          y: -10,
        });
      },
    });

    onOut(async () => {
      await gsap.to(self, {
        x: 100,
        duration: 1.2,
        ease: "slow.out",
      });
    });
  };

  return (
    <div use:animate={self} class={className ? className + "" : ""}>
      {children}
    </div>
  );
}
