import { createEffect } from "solid-js";
import { makeResizeObserver } from "@solid-primitives/resize-observer";
import { setViewport } from "~/stores/viewport";

import { App } from "~/app/app";

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
const initResize = (ref = document.body) => {
  const handleObserverCallback = (entries: ResizeObserverEntry[]) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    App.onResize({ width, height });
    setViewport("size", { width, height });
  };

  const { observe, unobserve } = makeResizeObserver(handleObserverCallback, {
    box: "content-box",
  });

  observe(document.body);
};
