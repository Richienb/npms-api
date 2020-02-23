# NPMS Api [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/npms-api/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/npms-api)

A small wrapper around the [npms.io api](https://api-docs.npms.io/).

[![NPM Badge](https://nodei.co/npm/npms-api.png)](https://npmjs.com/package/npms-api)

## Install

```sh
npm install npms-api
```

## Usage

```js
const { search, info } = require("npms-api");

(async () => {
	await search("cross-spawn");
	//=> { total: 45, results: [ { package: "cross-spawn", scope: "unscoped" ... } ... ] }

	await info("cross-spawn");
	//=> { analyzedAt: '2020-02-23T05:44:56.198Z', collected: { metadata: { name: "cross-spawn",  scope: "unscoped" ... } ... } ... }
})();
```

## API

### npmsApi.search(query, options?)

#### query

Type: `string`

The query to search with.

#### options

Type: `object`

##### suggestions

Type: `boolean`\
Default: `false`

Return search suggestions.

##### offset

Type: `number`\
Default: `0`

The offset of the results. Not compatible with `suggestions`.

##### results

Type: `number`\
Default: `25`

The amount of results to return.

### npmsApi.info(name)
### npmsApi.info(names)

#### name

Type: `string|string[]`

The name/names of the packages.
