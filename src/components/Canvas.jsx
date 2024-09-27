import { createEffect, onCleanup } from "solid-js";
import { Gl } from "~/gl/gl";

export default function Canvas() {
  const webgl = (self) => {
    createEffect(() => {
      // console.log("start");
      Gl.start(self);
    });

    onCleanup(() => {
      // console.log("cleanup");
      Gl.destroy();
    });
  };

  return <div use:webgl class="fixed inset-0 z-[-1] h-screen w-screen"></div>;
}
