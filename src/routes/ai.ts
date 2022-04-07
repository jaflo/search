import type { RequestHandler, ResponseBody } from "@sveltejs/kit";
import { openAiSearch } from "./_api";

export const post: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { query } = body;

	if (!query) {
		return {
			body: {
				status: 412,
				message: "Missing query",
			},
		};
	}

	try {
		const response = await openAiSearch(query);
		return {
			body: {
				query,
				response,
			} as unknown as ResponseBody,
		};
	} catch (error) {
		return {
			body: {
				query,
				message: error,
			} as unknown as ResponseBody,
		};
	}
};
