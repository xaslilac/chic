import { createContext, memo, ReactNode, useContext, useEffect, useMemo } from "react";

import { Styles } from "./types";

export function resolveClassName(name: string, context: StylistContextValue): string {
	return (
		context.styles[name] ??
		(context._super && resolveClassName(name, context._super)) ??
		name
	);
}

export interface StylistContextValue {
	_super?: StylistContextValue;
	styles: Record<string, string>;
}

export const StylistContext = createContext<StylistContextValue>({
	styles: {},
});

export interface StylistProps {
	children?: ReactNode;
	styles?: Styles;
}

export const Stylist = memo((props: StylistProps) => {
	const { children, styles } = props;

	// TODO: This could be more performant if we didn't unmount over eagerly
	useEffect(() => {
		if (typeof styles !== "string") {
			return;
		}

		const styleElement = document.createElement("style");
		styleElement.innerHTML = styles;
		document.head.appendChild(styleElement);

		return () => {
			document.head.removeChild(styleElement);
		};
	}, [styles]);

	const _super = useContext(StylistContext);

	const contextValue: StylistContextValue = useMemo(
		() => ({
			_super,
			styles: (typeof styles !== "string" && styles) || {},
		}),
		[_super, styles],
	);

	return (
		<StylistContext.Provider value={contextValue}>{children}</StylistContext.Provider>
	);
});

Stylist.displayName = "Stylist";
