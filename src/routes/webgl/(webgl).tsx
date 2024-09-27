import { Title } from "@solidjs/meta";

import Section from "~/components/Section";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";

import Node from "~/gl/node/Node";

export default function WebGl() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] pt-20">
      <Title>Home</Title>
      <Section class="h-[40vh] px-gx">
        <h1 use:animateAlpha>Home</h1>
      </Section>

      <Section class="flex h-screen gap-6 px-gx">
        <Node></Node>
        <Node></Node>
      </Section>
    </main>
  );
}
