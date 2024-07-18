import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import { Aa } from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";
import { onTrack } from "~/animation";
import Track from "~/components/Track";

export default function Home() {
  setLocationCallback();

  return (
    <main class="min-h-[200vh] pt-20">
      <Title>Home</Title>

      <Section class="">
        <div use:animateAlpha class="flex flex-col items-start gap-10 px-gx">
          <Counter />

          <Aa to="/about">To About Page </Aa>
        </div>
      </Section>

      <Section class="py-[100vh]">
        <Track class="h-[100vh] border">hello</Track>
      </Section>
    </main>
  );
}
