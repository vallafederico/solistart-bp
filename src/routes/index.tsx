import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import AppearingText from "~/components/AppearingText";
import Alpha from "~/components/Alpha";

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
      </Section>
    </main>
  );
}
