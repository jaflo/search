import type { RequestHandler, ResponseBody } from "@sveltejs/kit";
import { webSearch, knowledgeSearch } from "./_api";

export const get: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get("q");
	if (!query) {
		return {
			body: {
				status: 412,
				message: "Missing query",
			},
		};
	}

	const [websites, [{ context, relatedSearches, computation, entities, timeZone }, raw]] =
		await Promise.all([webSearch(query), knowledgeSearch(query)]);

	return {
		body: {
			query,
			context,
			relatedSearches,
			websites,
			computation,
			entities,
			timeZone,
			raw,
		} as unknown as ResponseBody,
	};
};
