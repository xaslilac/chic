import { classNames } from "./classNames";

test("classNames filters falsey values", () => {
	expect(classNames("a", false, undefined, "d")).toEqual(["a", "d"]);
});

test("classNames can recurse", () => {
	expect(classNames("a", ["b", ["c"]])).toEqual(["a", "b", "c"]);
});
