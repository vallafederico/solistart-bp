import { createWebGlNode } from "../scene";
import { onMount, onCleanup } from "solid-js";
import { Node as Nd } from ".";

export default function Node({ children }: { children?: any }) {
  let glEl: any;

  const webgl = (self: HTMLElement) => {
    onMount(() => {
      queueMicrotask(() => {
        glEl = createWebGlNode(self, Nd);
      });
    });

    onCleanup(() => {
      if (glEl) glEl.dispose();
    });
  };

  return (
    <div use:webgl class="mx-8 size-[10vw] border">
      {children}
    </div>
  );
}
