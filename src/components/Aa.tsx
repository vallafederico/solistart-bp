import { useNavigate } from "@solidjs/router";
import { animateOut, setAnimateOut } from "~/stores/animation";
import gsap from "~/gsap";

export const Aa = ({ children, url }: { children: any; url: string }) => {
  let el!: HTMLAnchorElement;
  const navigate = useNavigate();

  const outAnimation = async () => {
    await gsap.to(el, {
      autoAlpha: 0,
      y: 10,
      duration: 1.2,
      ease: "expo.out",
    });
  };

  setAnimateOut("elements", [...animateOut.elements, outAnimation]);

  console.log(animateOut.elements);

  const handleClick = async (e: any) => {
    e.preventDefault();

    await Promise.all(animateOut.elements.map(async (fn) => await fn()));
    navigate(el.pathname);
  };

  return (
    <a ref={el} onClick={handleClick} href={url} class="block">
      {children}
    </a>
  );
};
