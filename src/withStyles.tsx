import { ComponentType } from "react";

import { Stylist } from "./Stylist";
import { StyleModule } from "./types";

/**
 * Utility function that wraps your component in a Stylist provider
 * You might want to use this instead of `Stylist` directly so that you can use the
 * `useStyles` hook directly in your component.
 */
export function withStyles<Props extends JSX.IntrinsicAttributes>(
	styles: StyleModule,
	Component: ComponentType<Props>,
) {
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
