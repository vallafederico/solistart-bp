import "./RollingText.css";

export const RollingText = ({
  children,
  class: className,
}: {
  children: string;
  class?: string;
}) => {
  return (
    <p target={children} animate-hover="roll" class={className}>
      <span>{children}</span>
    </p>
  );
};
