module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testPathIgnorePatterns: ["<rootDir>/target/"],
	globals: {
		"ts-jest": {
			tsconfig: {
				jsx: "react-jsxdev",
			},
		},
	},
};
