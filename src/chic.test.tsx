/// <reference types="jest" />
import TestRenderer from "react-test-renderer";

import { chic } from "./chic";
import { Stylist } from "./Stylist";

test("chic.{tag}", () => {
	// Checks to make sure that the cache is working correctly, and that references will
	// be persistent. This would cause major performance issues in larger apps if this
	// assumption was ever broken, so it's worth having a test for.
	expect(chic.div).toBeDefined();
	expect(chic.div).toBe(chic.div);
});

test("chic.{tag} cx w/ string", () => {
	const tree = TestRenderer.create(<chic.div cx="hello">Hello!</chic.div>);

	const chicDivChild = tree.root.findByType(chic.div).findByType("div");

	expect(chicDivChild.type).toBe("div");
	expect(chicDivChild.props["className"]).toBe("hello");
});

test("chic.{tag} cx w/ array", () => {
	const tree = TestRenderer.create(
		<chic.div cx={["hey", false, 0, { a: false, b: true }]}>Hey!</chic.div>,
	);

	const chicDivChild = tree.root.findByType(chic.div).findByType("div");

	expect(chicDivChild.type).toBe("div");
	expect(chicDivChild.props["className"]).toBe("hey b");
});

// This file maybe isn't the best place for these kinds of tests, but for now it's fine
test("chic.{tag} doesn't accept className as a prop", () => {
	// @ts-expect-error - If you try passing `className` to a chic element it's almost
	// certainly a bug. Best to make sure TypeScript doesn't allow you to confuse the two.
	<chic.div className="hi">Hi</chic.div>;
	// @ts-expect-error - `div` elements don't have a type attribute, and if we're doing
	// our job correctly then the type info here should reflect that and disallow it.
	<chic.div type="button">Hello</chic.div>;

	// This should work! `input` elements do have a type attribute!
	<chic.input type="button">Click me!</chic.input>;
});

test("chic.{tag} correctly reads from Stylist contexts", () => {
	const styles = { hello: "hello-but-different" };

	const tree = TestRenderer.create(
		<Stylist styles={styles}>
			<chic.div cx="hello">Hello!</chic.div>
		</Stylist>,
	);

	const chicDivChild = tree.root.findByType(chic.div).findByType("div");

	expect(chicDivChild.props["className"]).toBe("hello-but-different");
});

test("chic.{tag} correctly reads from nested Stylist contexts", () => {
	const styles1 = { hello: "hello-but-different", hey: "incorrect-hey" };
	const styles2 = { hey: "hey-but-different" };

	const tree = TestRenderer.create(
		<Stylist styles={styles1}>
			<Stylist styles={styles2}>
				<chic.div cx="hey hello">Hello!</chic.div>
			</Stylist>
		</Stylist>,
	);

	const chicDivChild = tree.root.findByType(chic.div).findByType("div");

	expect(chicDivChild.props["className"]).toBe("hey-but-different hello-but-different");
});
