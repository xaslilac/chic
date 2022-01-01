export type CxArgs = Array<
	Record<string, unknown> | string | false | null | undefined | 0 | 0n
>;
export type CxProp = string | CxArgs;
export type StyleModule = Record<string, string>;
export type Styles = StyleModule | string;
