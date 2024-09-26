import { createWebGlNode } from "../scene";
import { onMount, onCleanup } from "solid-js";

export default function Node({ children }: { children?: any }) {
  let webglelement: any;

  const webgl = (self: HTMLElement) => {
    onMount(() => {
      queueMicrotask(() => {
        webglelement = createWebGlNode(self);
      });
    });

    onCleanup(() => {
      if (webglelement) webglelement.dispose();
    });
  };

  return (
    <div use:webgl class="mx-8 size-[10vw] border">
      {children}
    </div>
  );
}
