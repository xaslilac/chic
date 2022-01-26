import { ComponentType, forwardRef, useContext, useMemo } from "react";

import { classNames } from "./classNames";
import { StylistContext, resolveClassName } from "./Stylist";
import { ChicPropsWithRef, HtmlTag } from "./types";

type Chic = {
	[Tag in HtmlTag]: ComponentType<ChicPropsWithRef<Tag>>;
};

export const chic = new Proxy(new Map<string, ComponentType>(), {
	get(target, tag: string) {
		if (target.has(tag)) {
			return target.get(tag);
		}

		const component = Styled(tag);
		component.displayName = `chic.${tag}`;

		target.set(tag, component);
		return component;
	},
}) as unknown as Chic;

// TODO: This isn't great, but TypeScript gives an error about the correct types
// being too complex to actually validate. Maybe one day we can make this better.
/* eslint-disable
	@typescript-eslint/no-explicit-any,
	@typescript-eslint/no-unsafe-assignment,
	@typescript-eslint/no-unsafe-argument */
const Styled = (Tag: string) =>
	forwardRef((props: any, ref) => {
		const { children, cx, ...attrs } = props;

		const context = useContext(StylistContext);

		const className = useMemo(() => {
			const rawNames = typeof cx === "string" ? cx.split(" ") : classNames(...cx);
			return rawNames.map((name) => resolveClassName(name, context)).join(" ");
		}, [cx]);

		return (
			<Tag ref={ref} className={className} {...attrs}>
				{children}
			</Tag>
		);
	});
