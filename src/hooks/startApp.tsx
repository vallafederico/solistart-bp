import { createEffect } from "solid-js";
import { makeResizeObserver } from "@solid-primitives/resize-observer";

import { App } from "~/gl/app";

import { viewport, setViewport } from "~/stores/viewport";

export function startApp() {
  createEffect(() => {
    setViewport("size", {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    initResize();
    App.init();
  });
}

/** -- Resize */
const initResize = (ref = document.querySelector("body")) => {
  const handleObserverCallback = (entries: ResizeObserverEntry[]) => {
    const { width, height } = entries[0].contentRect;
    App.onResize({ width, height });
    setViewport("size", { width, height });
  };

  const { observe, unobserve } = makeResizeObserver(handleObserverCallback, {
    box: "content-box",
  });

  observe(document.body);
};
