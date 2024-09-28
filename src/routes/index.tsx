import { Title } from "@solidjs/meta";

import Section from "~/components/Section";
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
      </Section>
    </main>
  );
}
