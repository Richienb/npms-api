"use strict"

const ky = require("ky-universal")
const { default: ow } = require("ow")

async function request(endpoint, data, extraOptions) {
	const result = await ky(endpoint, {
		prefixUrl: "https://api.npms.io/v2/",
		searchParams: data,
		...extraOptions,
	}).json()

	if (result.message) throw new Error(result.message)

	return result
}

module.exports.search = async (query, {
	suggestions = false,
	offset = 0,
	results = 25,
} = {}) => {
	ow(query, ow.string.minLength(1))
	ow(suggestions, ow.boolean)
	ow(offset, ow.number.integer.greaterThanOrEqual(0))
	ow(results, ow.number.integer.positive)

	if (suggestions) {
		return request("suggestions", {
			q: query,
			size: results,
		})
	}

	return request("search", {
		q: query,
		from: offset,
		size: results,
	})
}

module.exports.info = async (name) => {
	ow(name, ow.any(ow.string, ow.array.ofType(ow.string)))

	if (Array.isArray(name)) {
		return request("package/mget", {}, {
			method: "post",
			json: name,
		})
	}

	return request(`package/${name}`)
}
