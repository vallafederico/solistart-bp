import { createEffect } from "solid-js";
import { Gl } from "~/gl/gl";

export default function Canvas() {
  const webgl = (self) => {
    // createEffect(() => {
    Gl.init(self);
    // });
  };

  return (
    <canvas use:webgl class="fixed inset-0 z-[-1] h-screen w-screen"></canvas>
  );
}
