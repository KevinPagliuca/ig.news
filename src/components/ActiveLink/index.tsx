import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
  activeClassName: string;
  aditionalClassName?: string;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  activeClassName,
  aditionalClassName,
  ...rest
}: ActiveLinkProps) {
  let isActive = false;

  const { asPath } = useRouter();

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: isActive
          ? activeClassName
          : aditionalClassName
          ? aditionalClassName
          : undefined,
      })}
    </Link>
  );
}
