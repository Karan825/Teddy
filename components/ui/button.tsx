import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "toffee";
type SharedButtonProps = { children: ReactNode; className?: string; variant?: ButtonVariant };

function buttonClassName(variant: ButtonVariant, className?: string) {
  const mapped =
    variant === "secondary"
      ? "btn-ghost"
      : "btn-primary";
  return ["btn", mapped, className].filter(Boolean).join(" ");
}

export function Button({ children, className, variant = "primary", ...props }: SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClassName(variant, className)} {...props}>{children}</button>;
}

type ButtonLinkProps = SharedButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

export function ButtonLink({ children, className, variant = "primary", external = false, href, ...props }: ButtonLinkProps) {
  const classNames = buttonClassName(variant, className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return <a className={classNames} href={href} {...props}>{children}</a>;
  return <Link className={classNames} href={href} {...props}>{children}</Link>;
}
