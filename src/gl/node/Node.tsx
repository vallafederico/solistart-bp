import { useWebglNode } from "~/hooks/useWebglNode";
import { Node as Nd } from ".";

export default function Node({ children }: { children?: any }) {
  const { setRef, ref, node } = useWebglNode(Nd);

  return (
    <div ref={setRef} class="size-[10vw] border">
      {children}
    </div>
  );
}
