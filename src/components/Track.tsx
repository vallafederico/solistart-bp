import { createEffect } from "solid-js";
import { onScroll, onTrack } from "~/animation/";
import gsap from "~/gsap";
import { viewport } from "~/stores/viewport";

export default function Track({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  const animate = (self: any) => {
    onScroll((value: any) => {
      //   console.log(value);
    });
  };

  createEffect(() => {
    // console.log(viewport.size.width);
  });

  return (
    <div use:animate class={className ? className + "" : ""}>
      {children}
    </div>
  );
}
