import TestRenderer from "react-test-renderer";

import { chic } from "./chic";
import { withStyles } from "./withStyles";

const styles = { hello: "hello-but-different" };

const Example = withStyles(styles, () => <chic.div cx="hello">Hello!</chic.div>);

test("chic.{tag} correctly reads from Stylist contexts", () => {
	const tree = TestRenderer.create(<Example />);

	const chicDivChild = tree.root.findByType(chic.div).findByType("div");

	expect(chicDivChild.props["className"]).toBe("hello-but-different");
});
