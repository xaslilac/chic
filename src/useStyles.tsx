import { useCallback, useContext, useMemo } from "react";

import { classNames } from "./classNames";
import { StylistContext, StylistContextValue, resolveClassName } from "./Stylist";
import { CxArgs, StyleModule } from "./types";

export function useStyles(styles?: StyleModule) {
	const context = useContext(StylistContext);

	const imaginaryContext: StylistContextValue = useMemo(
		() => (styles ? { _super: context, styles } : context),
		[context, styles],
	);

	const className = useCallback((...cx: CxArgs) => {
		const rawNames = classNames(...cx);
		return rawNames.map((name) => resolveClassName(name, imaginaryContext)).join(" ");
	}, []);

	return className;
}
