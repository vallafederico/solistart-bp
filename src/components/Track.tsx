import { createEffect, createSignal } from "solid-js";
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
  let track!: HTMLDivElement;
  const [val, setVal] = createSignal(0);

  const animate = (self: any) => {
    onTrack(
      track,
      (value: any, scroll: any) => {
        setVal(value);
        self.style.transform = `scale(${1 + value}) translateY(${(-0.5 + value) * -50}vh)`;
      },
      { lerp: 0.1 },
    );
  };

  return (
    <div
      ref={track}
      class={className ? className + "" : "flex-center h-[100vh] border px-gx"}
    >
      <div class="fixed top-gy">{val()}</div>
      <div use:animate class="">
        {children}
      </div>
    </div>
  );
}
