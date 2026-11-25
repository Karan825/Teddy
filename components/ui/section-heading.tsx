import type { HTMLAttributes, ReactNode } from "react";

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> { title: ReactNode; eyebrow?: ReactNode; description?: ReactNode; as?: "h1" | "h2" | "h3"; }

export function SectionHeading({ title, eyebrow, description, as: Heading = "h2", className = "", ...props }: SectionHeadingProps) {
  return <div className={`tp-section-heading ${className}`.trim()} {...props}>{eyebrow ? <p className="tp-section-heading__eyebrow">{eyebrow}</p> : null}<Heading className="tp-section-heading__title">{title}</Heading>{description ? <p className="tp-section-heading__description">{description}</p> : null}</div>;
}
