import { Title } from "@solidjs/meta";
import { animateAlpha } from "~/animation/alpha";
import Slider from "~/components/Slider";
import { setLocationCallback } from "~/hooks/useLocationCallback";

export default function About() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] py-20">
      <Title>About</Title>
      <div use:animateAlpha class="flex-center max-w-screen overflow-clip">
        <Slider class="" />
      </div>
    </main>
  );
}
