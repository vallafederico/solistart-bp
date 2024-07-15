import { onCleanup, onMount, createEffect } from "solid-js";

import { onView, onOut } from "~/animation/";
import gsap from "~/gsap";

import { Scroll } from "~/animation/scroll";

export default function Track({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  const animate = (self: any) => {
    createEffect(() => {
      Scroll.subscribe((value: any) => {
        // console.log(value.scroll);
      }, 0);
    });

    onCleanup(() => {
      Scroll.unsubscribe(0);
    });
  };

  return (
    <div use:animate class={className ? className + "" : ""}>
      {children}
    </div>
  );
}
