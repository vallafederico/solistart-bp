import { useNavigate } from "@solidjs/router";
import { animateOut, reset, animationOut } from "~/stores/animation";
import gsap from "~/gsap";

export const Aa = ({ children, to }: { children: any; to: string }) => {
  let el!: HTMLAnchorElement;
  const navigate = useNavigate();

  animationOut(async () => {
    await gsap.to(el, {
      autoAlpha: 0,
      y: 10,
      duration: 1.2,
      ease: "expo.out",
    });
  });

  const handleClick = async (e: any) => {
    e.preventDefault();
    await Promise.all(animateOut.elements.map(async (fn) => await fn()));
    navigate(el.pathname);
    reset();
  };

  return (
    <a ref={el} onClick={handleClick} href={to} class="block">
      {children}
    </a>
  );
};
