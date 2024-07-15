import gsap from "~/gsap";
import { animateAlpha } from "~/animation/alpha.js";

export default function Alpha({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  return (
    <div use:animateAlpha={self} class={className ? className + "" : ""}>
      {children}
    </div>
  );
}
