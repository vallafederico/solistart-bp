import { Title } from "@solidjs/meta";
import Slider from "~/components/Slider";
import Section from "~/components/Section";
import Counter from "~/components/Counter";
import Aa from "~/components/Aa";
import Track from "~/components/Track";

import { animateAlpha } from "~/animation/alpha";

import { setLocationCallback } from "~/hooks/useLocationCallback";

export default function About() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] py-20">
      <Title>About</Title>
      <Section class="">
        <div use:animateAlpha class="flex flex-col items-start gap-10 px-gx">
          <Counter />

          <Aa to="/about">To About Page </Aa>
        </div>
      </Section>

      <div
        use:animateAlpha
        class="flex-center max-w-screen overflow-clip py-20"
      >
        <Slider class="h-[70vh]" />
      </div>

      <Section class="py-[100vh]">
        <Track class="">hello</Track>
      </Section>
    </main>
  );
}
