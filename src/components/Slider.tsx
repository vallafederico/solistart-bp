import { createUniqueId } from "solid-js";
import { createEffect } from "solid-js";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

// (*) add config
// set _snapMode(val = true) {
//   this._snapping = val;
// }

// set _enabled(val = true) {
//   this._isEnabled = val;
// }

import { onSlide, styles } from "~/animation/slide";

export default function Slider({
  class: className = "",
  childClass = "",
  children,
}: {
  class?: string;
  childClass?: string;
  children?: any;
} = {}) {
  // const id = createUniqueId();

  const animate = (self) => {
    onSlide();
  };

  const arr = Array.from({ length: 10 }, (v, i) => i);

  return (
    <div use:animate class={className + styles.wrapper}>
      {children
        ? children
        : arr.map((item) => (
            <div class={childClass + styles.children}>{item}</div>
          ))}
    </div>
  );
}
