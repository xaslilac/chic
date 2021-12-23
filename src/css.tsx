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
