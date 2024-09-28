import gsap from "~/app/gsap";

export const globalOut = async () =>
  await gsap.to("main", {
    autoAlpha: 0,
    ease: "expo.out",
    duration: 0.6,
    delay: 0.5,
  });
