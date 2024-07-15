import gsap from "~/gsap";

export const globalOut = async (duration = 0.5) =>
  await gsap.to("main", {
    autoAlpha: 0,
    ease: "expo.out",
    duration,
    delay: 0.5,
  });
