import { ComponentType } from "react";

import { Stylist } from "./Stylist";
import { Styles } from "./types";

/**
 * Utility function that wraps your component in a Stylist provider
 */
export function withStyles<Props>(styles: Styles, Component: ComponentType<Props>) {
	const wrapper = function (props: Props) {
		return (
			<Stylist styles={styles}>
				<Component {...props} />
			</Stylist>
		);
	};

	wrapper.displayName = `withStyles(${Component.displayName ?? "Anonymous"})`;

	return wrapper;
}
