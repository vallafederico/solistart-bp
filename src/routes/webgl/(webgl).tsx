import { Title } from "@solidjs/meta";

import Section from "~/components/Section";

import { setLocationCallback } from "~/hooks/useLocationCallback";

import DomGroupElement from "~/app/gl/domGroup/DomGroupElement";
import DomQuadElement from "~/app/gl/domQuad/DomQuadElement";

export default function WebGl() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] pt-20">
      <Title>Home</Title>

      <Section class="flex-center flex h-[150vh] gap-6 px-gx">
        <DomQuadElement />
      </Section>
    </main>
  );
}
