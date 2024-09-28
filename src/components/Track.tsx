import { onScroll, onTrack, onIntersect, onPageLeave } from "~/animation/";
import gsap from "@app/gsap";

export default function Track({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  let track: any;
  const animate = (self: any) => {
    /** -- Router Lifecycle */
    // onPageLeave(async () => {
    //   await gsap.to(self, { opacity: 0, duration: 0.5 });
    // });
    /** -- Intersection Based */
    // onIntersect(self, {
    //   onEnter: () => {
    //     console.log("in");
    //   },
    //   onLeave: () => {
    //     console.log("out");
    //   },
    // });
    /** -- Scroll Based */
    // onScroll((value: any) => {
    //   console.log(value);
    // });
    /** -- Scroll Track Based */
    // onTrack(track, (value: any) => {
    //   console.log(value);
    //   self.style.transform = `translateX(${value * 1000}px)`;
    // });
  };

  return (
    <div ref={track} class={className ? className + "" : ""}>
      <div use:animate class="flex-center h-full border">
        {children}
      </div>
    </div>
  );
}
