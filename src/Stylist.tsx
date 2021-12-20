import { createContext, memo, ReactNode, useContext, useEffect, useMemo } from "react";

export function css(strings: TemplateStringsArray, ...fills: unknown[]): string {
	let result = "";

	for (let i = 0; i < fills.length; i++) {
		result += strings[i];
		result += String(fills[i]);
	}

	// TODO: strings.at(-1)
	result += strings[strings.length - 1];

	return result;
}

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
	styles?: Record<string, string> | string;
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

	const contextValue = useMemo<StylistContextValue>(
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
