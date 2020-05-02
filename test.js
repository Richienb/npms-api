const test = require("ava")
const { search, info } = require(".")

test("npmsApi.search", async t => {
	const data = await search("cross-spawn")

	t.is(data.results[0].package.name, "cross-spawn")
})

test("npmsApi.info", async t => {
	const data = await info("cross-spawn")

	t.is(data.collected.metadata.name, "cross-spawn")
})
