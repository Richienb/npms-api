"use strict"

const ky = require("ky-universal")
const { default: ow } = require("ow")

async function request(endpoint, data, extraOptions) {
	const response = await ky(endpoint, {
		prefixUrl: "https://api.npms.io/v2/",
		searchParams: data,
		...extraOptions
	})

	const result = await response.json()

	if (result.message) {
		throw new Error(result.message)
	}

	return result
}

module.exports.search = async (query, {
	suggestions = false,
	offset = 0,
	results = 25
} = {}) => {
	ow(query, ow.string.minLength(1))
	ow(suggestions, ow.boolean)
	ow(offset, ow.number.integer.inRange(0, 5000))
	ow(results, ow.number.integerOrInfinite.positive)

	if (suggestions) {
		return request("suggestions", {
			q: query,
			size: results
		})
	}

	if (results === Infinity) {
		results = 5250
	}

	if (results > 250) {
		const result = []

		const data = await module.exports.search(query, {
			results: 250,
			offset
		})

		if (data.total <= 250) {
			return data
		}

		result.push(...data.results)

		offset += 250

		if (offset > 5000) {
			const r = (await module.exports.search(query, {
				results: results - 250,
				offset: 5000
			})).results
			result.push(...r.slice(result.length - offset))
		} else {
			result.push(...(await module.exports.search(query, {
				results: results - 250,
				offset
			})).results)
		}

		return { results: result, total: data.total }
	}

	return request("search", {
		q: query,
		from: offset,
		size: results
	})
}

module.exports.info = async name => {
	ow(name, ow.any(ow.string, ow.array.ofType(ow.string)))

	if (Array.isArray(name)) {
		return request("package/mget", {}, {
			method: "post",
			json: name
		})
	}

	return request(`package/${name}`)
}
