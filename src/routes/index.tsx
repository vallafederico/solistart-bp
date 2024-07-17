import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";

import { Aa } from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";

export default function Home() {
  setLocationCallback();

  return (
    <main class="min-h-[200vh] pt-20">
      <Title>Home</Title>

      <Section>
        <div use:animateAlpha class="flex flex-col items-start gap-10 px-gx">
          <Counter />

          <Aa to="/about">To About Page</Aa>
        </div>
      </Section>
    </main>
  );
}
