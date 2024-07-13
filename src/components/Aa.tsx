import { useNavigate } from "@solidjs/router";
import { animateOut, setAnimateOut } from "~/stores/animation";
import gsap from "~/gsap";

export const Aa = ({ children, url }: { children: any; url: string }) => {
  let el!: HTMLAnchorElement;
  const navigate = useNavigate();

  // const outAnimation = async () => {
  //   console.log("hi", el);
  //   gsap.to(el, {
  //     scale: 3,
  //     duration: 1.2,
  //     ease: "expo.out",
  //     onStart: () => {},
  //   });
  // };

  // setAnimateOut("elements", (curr) => [...curr, outAnimation]);

  const handleClick = async (e: any) => {
    e.preventDefault();

    // Promise.allSettled([await animateOut.elements[0]()]);
    await Promise.allSettled(animateOut.elements.map((item) => item()));
    navigate(el.pathname);
  };

  return (
    <a ref={el} onClick={handleClick} href={url}>
      {children}
    </a>
  );
};
