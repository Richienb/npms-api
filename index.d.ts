export namespace Result {
	export interface PackageData {
		name: string
		scope: "scoped" | "unscoped"
		version: string
		description: string
		keywords: string[]
		date: string
		links: {
			npm: string
			homepage: string
			repository: string
			bugs: string
		}
		publisher: {
			username: string
			email: string
		}
		maintainers: Array<{
			username: string
			email: string
		}>
	}

	export interface ScoreData {
		final: number
		detail: {
			quality: number
			popularity: number
			maintenance: number
		}
	}

	export interface Search {
		total: number
		results: Array<{
			package: PackageData
			score: ScoreData
			searchScore: number
		}>
	}

	export interface DateRangeData {
		from: string
		to: string
		count: number
	}

	export interface InfoPackageData extends PackageData {
		author: {
			username: string
			email: string
		}
		contributors?: {
			username: string
			email: string
		}
		repository: {
			type: string
			url: string
		}
		license: string
		devDependencies: Record<string, string>
		releases: DateRangeData[]
		hasTestScript: boolean
		hasSelectiveFiles: boolean
		readme: string
	}

	export interface NPMPackageData {
		downloads: DateRangeData[]
		dependentsCount: number
		starsCount: number
	}

	export interface GitHubData {
		starsCount: number
		forksCount: number
		subscribersCount: number
		issues: {
			count: number
			openCount: number
			distribution: {
				"3600": number
				"10800": number
				"32400": number
				"97200": number
				"291600": number
				"874800": number
				"2624400": number
				"7873200": number
				"23619600": number
				"70858800": number
				"212576400": number
			}
			isDisabled: boolean
		}
		contributors: ContributorData[]
		commits: DateRangeData[]
		status: StatusData[]
	}

	export interface ContributorData {
		username: string
		commitsCount: number
	}

	export interface StatusData {
		context: string
		state: string
	}

	export interface SourceData {
		files: {
			readmeSize: number
			testsSize: number
		}
		badges: Array<{
			urls: {
				original: string
				service?: string
				shields: string
				content: string
			}
			info: {
				services: string
				type: string
				modifiers?: Record<string, string>
			}
		}>
		linters: string[]
	}

	export interface EvaluationData {
		quality: {
			carefulness: number
			tests: number
			health: number
			branding: number
		}
		popularity: {
			communityInterest: number
			downloadsCount: number
			downloadsAcceleration: number
			dependentsCount: number
		}
		maintenance: {
			releasesFrequency: number
			commitsFrequency: number
			openIssues: number
			issuesDistribution: number
		}
	}

	export interface Info {
		analyzedAt: string
		collected: {
			metadata: InfoPackageData
			npm: NPMPackageData
			github: GitHubData
			source: SourceData
		}
		evaluation: EvaluationData
		score: ScoreData
	}
}

/**
Search for a package.
@param query The query to search with.
@param options Options.
@example
```
const { search } = require("npms-api");
(async () => {
	await search("cross-spawn");
	//=> { total: 45, results: [ { package: "cross-spawn", scope: "unscoped" ... } ... ] }
})();
```
*/
export declare async function search(query: string, options?: ({
	/** Return search suggestions. */
	suggestions?: false

	/** The offset of the results. */
	offset?: number
} | {
	/** Return search suggestions. */
	suggestions: true
}) & {
	/** The amount of results to return. */
	results?: number
}): Promise<Result.Search>

/**
Get the information about a package.
@param name The name of the package.
@param names The names of the packages.
@example
```
const { info } = require("npms-api");
(async () => {
	await info("cross-spawn");
	//=> { analyzedAt: '2020-02-23T05:44:56.198Z', collected: { metadata: { name: "cross-spawn",   * scope: scoped" ... } ... } ... }
})();
```
*/
export declare async function info(name: string): Promise<Result.Info>
export declare async function info(names: string[]): Promise<Result.Info[]>
