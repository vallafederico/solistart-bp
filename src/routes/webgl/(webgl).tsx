import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import Aa from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";
import Track from "~/components/Track";

import Node from "~/gl/node/Node";

export default function WebGl() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] pt-20">
      <Title>Home</Title>
      <Section class="h-[80vh] px-gx">
        <h1 use:animateAlpha>Home</h1>
      </Section>
      <Section class="flex h-screen px-gx">
        <Node>hello</Node>
        <Node>hello</Node>
      </Section>
    </main>
  );
}
