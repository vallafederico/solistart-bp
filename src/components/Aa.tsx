import { useLocation, useNavigate } from "@solidjs/router";
import { animateOut, reset, out } from "~/stores/animation";
import gsap from "~/gsap";

export const Aa = ({
  children,
  to,
  doesAnimate = true,
  class: className,
}: {
  children: any;
  to: string;
  doesAnimate?: boolean;
  class?: string;
}) => {
  let el!: HTMLAnchorElement;
  const navigate = useNavigate();
  const location = useLocation();

  function animate(self: any) {
    if (doesAnimate) {
      out(async () => {
        await gsap.to(self, {
          autoAlpha: 0,
          y: 10,
          duration: 1.2,
          ease: "expo.out",
        });
      });
    }
  }

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (location.pathname === to) return;
    await Promise.all(animateOut.elements.map(async (fn) => await fn()));
    navigate(el.pathname);
    reset();
  };

  return (
    <a
      ref={el}
      use:animate={self}
      onClick={handleClick}
      href={to}
      class={`${className}`}
    >
      {children}
    </a>
    // <a ref={el} onClick={handleClick} href={to} class={`${className}`}>
    //   {children}
    // </a>
  );
};
