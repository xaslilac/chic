# Chic

[![main](https://github.com/aslilac/chic/actions/workflows/main.yml/badge.svg)](https://github.com/aslilac/chic/actions/workflows/main.yml)
![version](https://mckayla.dev/badge/v/chic/0.1.0/6d4771)

A CSS-sort-of-in-JS solution that's quite nice and well dressed

```tsx
import { chic, Stylist } from "chic";

import styles from "./Component.module.css";

const Component = (props) => {
	return (
		<Stylist styles={styles}>
			<chic.div cx={["color-blue", "font-lg", "padding-4"]}>Hello!</chic.div>
		</Stylist>
	);
};
```
