import { onMount, onCleanup, createSignal } from "solid-js";
import { Gl } from "~/app/gl/gl";

// (*) prevent recreation if one with same id already exists

export function createWebGlNode(
  self: HTMLElement,
  webglNode: any,
  attachTo: any = null,
) {
  if (!webglNode) return;
  if (!attachTo) attachTo = Gl.scene;

  const it = new webglNode(self);
  attachTo.add(it);
  return it;
}

export const useWebglNode = (
  classToInstantiate: any,
  sceneToAttachTo: any = null,
) => {
  const [ref, setRef] = createSignal<HTMLElement | null>(null);
  const [node, setNode] = createSignal<any>(null);

  onMount(() => {
    if (!ref()) return;
    setNode(createWebGlNode(ref(), classToInstantiate, sceneToAttachTo));
  });

  onCleanup(() => {
    if (node() && node().dispose) node().dispose();
  });

  return { setRef, ref, node };
};
