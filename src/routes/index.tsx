import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main class="pt-20 px-gx  min-h-[200vh]">
      <Title>Home</Title>
      <h1>YO</h1>
      <Counter />
    </main>
  );
}
