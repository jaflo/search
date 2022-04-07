const AZURE_SUBSCRIPTION_KEY = process.env["AZURE_SUBSCRIPTION_KEY"];
if (!AZURE_SUBSCRIPTION_KEY) {
	throw new Error("AZURE_SUBSCRIPTION_KEY is not set.");
}

const OPENAI_SUBSCRIPTION_KEY = process.env["OPENAI_SUBSCRIPTION_KEY"];
if (!OPENAI_SUBSCRIPTION_KEY) {
	throw new Error("OPENAI_SUBSCRIPTION_KEY is not set.");
}

async function internalBingWebSearch(query, params?) {
	const url = new URL("https://api.bing.microsoft.com/v7.0/search");
	url.searchParams.set("q", query);
	url.searchParams.set("safeSearch", "off");
	url.searchParams.set("setLang", "en");

	for (const key in params) {
		if (Object.hasOwnProperty.call(params, key)) {
			const element = params[key];
			url.searchParams.set(key, element);
		}
	}

	const response = await fetch(url.toString(), {
		headers: {
			"Ocp-Apim-Subscription-Key": AZURE_SUBSCRIPTION_KEY,
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	if (response.status === 200) {
		const data = await response.json();
		if (!data) throw data;
		else return data;
	} else {
		throw response.statusText;
	}
}

export async function webSearch(query): Promise<Website[]> {
	const allowedSites = [
		"wikipedia.org",
		"github.com",
		"stackoverflow.com",
		"stackexchange.com",
		"serverfault.com",
		"superuser.com",
		"askubuntu.com",
		"reddit.com",
		"news.ycombinator.com",
	];
	const response = await internalBingWebSearch(query + ` (${allowedSites.join(" OR ")})`, {
		responseFilter: "webpages",
		textDecorations: true,
		textFormat: "html",
	});
	return (
		response.webPages?.value
			.map((result) => ({
				title: result.name,
				url: result.url,
				snippet: result.snippet,
			}))
			.filter((result) => {
				// filter out clickbait like "10 best X" from non-allowed sites
				const containsNumber = result.title.match(/\d/);
				let isAllowedSite = false;
				for (const domain of allowedSites) {
					if (result.url.includes(domain)) {
						isAllowedSite = true;
					}
				}
				if (isAllowedSite) return true;
				else return !containsNumber;
			}) || []
	);
}

export async function knowledgeSearch(query): Promise<[Knowledge, any]> {
	const response = await internalBingWebSearch(query);
	return [
		{
			context: response.queryContext,
			computation: response.computation && {
				expression: response.computation.expression,
				value: response.computation.value,
			},
			entities: response.entities?.value.map((entity) => ({
				name: entity.name,
				url: entity.url,
				description: entity.description,
			})),
			timeZone: response.timeZone?.timeZoneDifference && {
				from: response.timeZone?.timeZoneDifference.location1,
				to: response.timeZone?.timeZoneDifference.location2,
			},
			relatedSearches: response.relatedSearches?.value.map((x) => x.text),
		},
		response,
	];
}

export async function openAiSearch(query): Promise<string> {
	const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
		body: JSON.stringify({
			prompt: `Someone asks you: ${query}\nYour best answer:`,
			temperature: 0.7,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		}),
		headers: {
			Authorization: "Bearer " + OPENAI_SUBSCRIPTION_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	if (response.status === 200) {
		const data = await response.json();
		if (!data.choices) throw data;
		else return data.choices[0].text.trim();
	} else {
		throw response.statusText;
	}
}
