import { CxArgs } from "./types";

export function classNames(...args: CxArgs) {
	const names: string[] = [];

	for (const arg of args) {
		if (!arg) {
			continue;
		}

		if (typeof arg === "string") {
			names.push(arg);
			continue;
		}

		if (Array.isArray(arg)) {
			const recursiveResult = classNames(...arg);
			recursiveResult.forEach((name) => names.push(name));
			continue;
		}

		for (const [key, value] of Object.entries(arg)) {
			if (value) {
				names.push(key);
			}
		}
	}

	return names;
}
