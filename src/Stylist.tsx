import { createContext, memo, ReactNode, useContext, useMemo } from "react";

import { StyleModule } from "./types";

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
	styles?: StyleModule;
}

export const Stylist = memo((props: StylistProps) => {
	const { children, styles = {} } = props;

	const _super = useContext(StylistContext);

	const contextValue: StylistContextValue = useMemo(
		() => ({
			_super,
			styles,
		}),
		[_super, styles],
	);

	return (
		<StylistContext.Provider value={contextValue}>{children}</StylistContext.Provider>
	);
});

Stylist.displayName = "Stylist";
