import { useLocation, useNavigate } from "@solidjs/router";
import { animateOutAndTransition } from "~/animation/";

export default function Aa({
  children,
  to,
  class: className,
}: {
  children: any;
  to: string;
  class?: string;
}) {
  let el!: HTMLAnchorElement;
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async (e: any) => {
    e.preventDefault();
    await animateOutAndTransition(to, el, navigate, location);
  };

  return (
    <a
      ref={el}
      onClick={handleClick}
      href={to}
      class={className ? className + " inline-block" : "inline-block"}
    >
      {children}
    </a>
  );
}
