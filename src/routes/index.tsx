import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import AppearingText from "~/components/AppearingText";
import Alpha from "~/components/Alpha";
import { Aa } from "~/components/Aa";

import { createLocationCallback } from "~/hooks/createLocationCallback";

export default function Home() {
  createLocationCallback();

  return (
    <main class="pt-20  min-h-[200vh]">
      <Title>Home</Title>

      <Section>
        <AppearingText>Hello</AppearingText>
        <Alpha>
          <Counter />
        </Alpha>

        <Alpha>
          <Aa url="/about">To About Page</Aa>
        </Alpha>
      </Section>
    </main>
  );
}
