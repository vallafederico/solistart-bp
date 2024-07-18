import { createEffect } from "solid-js";
import { onScroll, onTrack, onIntersect } from "~/animation/";
import gsap from "~/gsap";
import { viewport } from "~/stores/viewport";

export default function Track({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  let track: any;
  const animate = (self: any) => {
    // onScroll((value: any) => {
    //   console.log(value);
    // });
    // onIntersect(self, {
    //   onIn: () => {
    //     console.log("in");
    //   },
    //   onOut: () => {
    //     console.log("out");
    //   },
    // });
    // onTrack(track, (value: any) => {
    //   console.log(value);
    // });
  };

  createEffect(() => {
    // console.log(viewport.size.width);
  });

  return (
    <div ref={track} class={className ? className + "" : ""}>
      <div use:animate>{children}</div>
    </div>
  );
}
