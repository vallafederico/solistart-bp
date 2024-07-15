import { onScroll, onTrack } from "~/animation/";
import gsap from "~/gsap";

export default function Track({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  const animate = (self: any) => {
    onScroll((value: any) => {
      // console.log(value);
    });
  };

  return (
    <div use:animate class={className ? className + "" : ""}>
      {children}
    </div>
  );
}
