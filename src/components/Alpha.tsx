import gsap from "~/gsap";
import { animateAlpha } from "./alpha.js";

export default function Alpha({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  return (
    <div use:animateAlpha={self} class={`${className}`}>
      {children}
    </div>
  );
}
