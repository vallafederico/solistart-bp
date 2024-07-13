// import { createEffect, createSignal } from "solid-js";

export default function Section({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  return <section class={`py-gy ${className}`}>{children}</section>;
}
