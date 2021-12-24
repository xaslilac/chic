import { ComponentType } from "react";

import { Styles, Stylist } from "./Stylist";

/**
 * Utility function that wraps your component in a Stylist provider
 */
export function withStyles<Props>(styles: Styles, Component: ComponentType<Props>) {
	return function (props: Props) {
		return (
			<Stylist styles={styles}>
				<Component {...props} />
			</Stylist>
		);
	};
}
