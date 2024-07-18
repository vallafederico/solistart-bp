import gsap from "~/gsap";
import { onIntersect, onPageLeave } from "~/animation/";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      // use:model
      animateAlpha: typeof animateAlpha;
    }
  }
}

export const animateAlpha = (self: HTMLElement) => {
  let viewAnimation: GSAPAnimation;

  onIntersect(self, {
    onEnter: () => {
      viewAnimation = gsap.to(self, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "linear",
        delay: 0.3,
      });
    },
    onLeave: () => {
      if (viewAnimation) viewAnimation.kill();
      gsap.set(self, { autoAlpha: 0 });
    },
  });

  onPageLeave(async () => {
    gsap.to(self, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "slow.out",
    });
  });
};
