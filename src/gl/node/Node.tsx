import { webglNode } from "./";

// (*) do pixel calc in webgl
export default function Node({ children }: { children?: any }) {
  return (
    <div use:webglNode class="h-[10vw] w-[10vw] border">
      {children}
    </div>
  );
}
