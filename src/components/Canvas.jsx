import { createEffect, onCleanup } from "solid-js";
import { Gl } from "~/app/gl";

export default function Canvas() {
  const webgl = (self) => {
    createEffect(() => {
      Gl.init(self);
    });

    onCleanup(() => {
      Gl.destroy();
    });
  };

  return (
    <canvas use:webgl class="fixed inset-0 z-[-1] h-screen w-screen"></canvas>
  );
}
