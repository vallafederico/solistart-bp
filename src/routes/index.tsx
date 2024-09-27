import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import Aa from "~/components/Aa";
import Test from "~/components/Test";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";

export default function Home() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] pt-20">
      <Title>Home</Title>
      <Section class="h-[80vh] px-gx">
        <h1 use:animateAlpha>Home</h1>
        <Test />
      </Section>
    </main>
  );
}
