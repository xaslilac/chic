import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

export type HtmlTag = keyof JSX.IntrinsicElements;

type ToCx<T> = Omit<T, "className"> & { cx?: CxProp };
export type ChicProps<Tag extends HtmlTag> = ToCx<ComponentPropsWithoutRef<Tag>>;
export type ChicPropsWithRef<Tag extends HtmlTag> = ToCx<ComponentPropsWithRef<Tag>>;

export type StyleModule = Record<string, string>;
export type Styles = StyleModule | string;

export type CxArgs = Array<
	CxArgs | Record<string, unknown> | string | false | null | undefined | 0 | 0n
>;
export type CxProp = string | CxArgs;
