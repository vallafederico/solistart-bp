import { Title } from "@solidjs/meta";
import Slider from "~/components/Slider";
import { setLocationCallback } from "~/hooks/useLocationCallback";

export default function About() {
  setLocationCallback();

  return (
    <main class="min-h-[100vh] py-20">
      <Title>About</Title>
      {/* <div class="flex-center max-w-screen overflow-clip"> */}
      {/* <Slider class="" /> */}
      {/* </div> */}
    </main>
  );
}
