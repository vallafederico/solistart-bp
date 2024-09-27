import { createEffect, onMount, createSignal } from "solid-js";
import { webgl } from "~/stores/webgl";

const useSomething = () => {
  const [domItem, setDomItem] = createSignal(null);
  const [webglItem, setWebglItem] = createSignal<any>(null);

  onMount(() => {
    console.log("ref", domItem());
    setWebglItem({
      fun: (hi) => console.log("fun", hi),
    });
  });

  return [setDomItem, webglItem];
};

export default function Test() {
  const [setDomItem, webglItem] = useSomething();

  const handleClick = () => {
    webglItem().fun("hello");
  };

  return (
    <div onClick={handleClick} ref={setDomItem} class="border">
      <p>Test</p>
    </div>
  );
}
