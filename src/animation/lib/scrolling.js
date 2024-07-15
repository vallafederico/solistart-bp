import { Scroll } from "~/animation/scroll";
import { createEffect, onCleanup, createUniqueId } from "solid-js";

export function onScroll(fn) {
  const id = createUniqueId();

  createEffect(() => {
    Scroll.subscribe((value) => fn(value), id);
  });

  onCleanup(() => {
    Scroll.unsubscribe(id);
  });
}

export function onTrack(track, fn) {
  // Scroll.subscribe(fn, track);
}
