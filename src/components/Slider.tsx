import { createUniqueId } from "solid-js";

// (*) add config
// set _snapMode(val = true) {
//   this._snapping = val;
// }

// set _enabled(val = true) {
//   this._isEnabled = val;
// }

import { slide, styles } from "~/animation/slide";

export default function Slider({
  class: className = "",
  childClass = "",
  children,
}: {
  class?: string;
  childClass?: string;
  children?: any;
} = {}) {
  const id = createUniqueId();

  const arr = Array.from({ length: 10 }, (v, i) => i);

  return (
    <div use:slide={id} class={className + styles.wrapper}>
      {children
        ? children
        : arr.map((item) => (
            <div class={childClass + styles.children}>{item}</div>
          ))}
    </div>
  );
}
