export default function Section({
  children,
  class: className,
}: {
  children: any;
  class?: string;
}) {
  return <section class={className ? className + "" : ""}>{children}</section>;
}
