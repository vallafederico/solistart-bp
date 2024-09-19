import { Scroll } from "~/scroll";
import { Raf } from "~/app/raf";
import {
  createEffect,
  onCleanup,
  createUniqueId,
  createSignal,
} from "solid-js";
// import { viewport } from "~/stores/viewport";
import { clientRect } from "~/utils/clientRect";
import { clamp, map, lerp as lerpFunc } from "~/utils/math";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

interface ScrollEvent {
  velocity: number;
  scroll: number;
  direction: 1 | -1;
}

/** -- generic scroll event */

export function onScroll(fn: Function) {
  const id = createUniqueId();

  createEffect(() => {
    Scroll.subscribe((value: ScrollEvent) => fn(value), id);
  });

  onCleanup(() => {
    Scroll.unsubscribe(id);
  });
}

/** -- scroll tracking event */

function computeBounds(
  el: HTMLElement,
  config: { top: string; bottom: string },
) {
  const bounds = clientRect(el);

  switch (config.top) {
    case "top":
      bounds.top = bounds.top;
      break;
    case "center":
      bounds.top = bounds.top - bounds.wh / 2;
      break;
    case "bottom":
      bounds.top = bounds.top - bounds.wh;
      break;
  }

  switch (config.bottom) {
    case "top":
      bounds.bottom = bounds.bottom;
      break;
    case "center":
      bounds.bottom = bounds.bottom - bounds.wh / 2;
      break;
    case "bottom":
      bounds.bottom = bounds.bottom - bounds.wh;
      break;
  }

  return { ...bounds };
}

export function onTrack(
  track: HTMLElement,
  fn: Function,
  {
    top = "bottom",
    bottom = "top",
    lerp = false,
  }: {
    top?: "top" | "center" | "bottom";
    bottom?: "top" | "center" | "bottom";
    lerp?: number | false;
  } = {},
): void {
  const id = createUniqueId();
  const subscriber = lerp === false ? Scroll : Raf;
  let lerped = 0;

  const vo = createVisibilityObserver({ threshold: 0 });
  const visible = vo(track);

  createEffect(() => {
    const [bounds] = createSignal(computeBounds(track, { top, bottom }));

    const execute = (scroll = Scroll.scrollEventData) => {
      if (!visible()) return;

      let val = clamp(
        0,
        1,
        map(scroll.scroll, bounds().top, bounds().bottom, 0, 1),
      );

      if (lerp !== false) {
        lerped = lerpFunc(lerped, val, lerp);
        val = lerped;
      }

      fn(val, scroll);
    };

    subscriber.subscribe(() => {
      execute(Scroll.scrollEventData);
    }, id);

    execute();
  });

  onCleanup(() => {
    subscriber.unsubscribe(id);
  });
}
