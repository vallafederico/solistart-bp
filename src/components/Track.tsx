import { createSignal } from "solid-js";
import { onScroll, onTrack } from "~/animation/";
import gsap from "~/gsap";

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
      class={
        className
          ? className + ""
          : "flex-center relative h-[100vh] border px-gx"
      }
    >
      <div class="sticky top-gy">{val()}</div>
      <div use:animate class="absolute">
        {children}
      </div>
    </div>
  );
}
