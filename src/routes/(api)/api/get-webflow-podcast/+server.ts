import type { RequestHandler } from './$types';
import { WEBFLOW_API_TOKEN } from '$env/static/private';
import { WebflowClient } from 'webflow-api';
// @ts-expect-error TurndownService is not typed
import TurndownService from 'turndown';
// @ts-expect-error turndownPluginGfm is not typed
import turndownPluginGfm from 'turndown-plugin-gfm';
const gfm = turndownPluginGfm.gfm;

const webflow = new WebflowClient({ accessToken: WEBFLOW_API_TOKEN });
const turndown = new TurndownService({
	hr: '---',
	codeBlockStyle: 'fenced'
});

turndown.use(gfm);

const podcastDescription = `## What is HTML All The Things?

HTML All The Things is a [web development podcast](https://www.htmlallthethings.com/) and [discord community](https://discord.com/invite/jweMCx9) which was started by Matt and Mike, developers based in Ontario, Canada. 

The podcast speaks to web development topics as well as running a small business, self-employment and time management. You can join them for both their successes and their struggles as they try to manage expanding their Web Development business without stretching themselves too thin.

---`;

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const podcastName = body.podcastName;
	// const { podcastName } = await request.json();

	const podcasts = await webflow.collections.items.listItems('600f4a96cb38ff4fc3142b42', {
		limit: 50
	});

	console.log(podcastName)

	const podcast = podcasts.items?.find(
		(podcast) => podcast.fieldData?.name?.toLowerCase() === podcastName?.toLowerCase()
	);

	// console log the first 5 episode titles
	console.log(podcasts.items?.slice(0, 5).map((podcast) => podcast.fieldData.name));

	if (!podcast) {
		return new Response('Podcast not found', { status: 404 });
	}

	const markdownContent = turndown.turndown(podcast?.fieldData['show-notes']);
	const markdownEpisodeSummary = turndown.turndown(podcast?.fieldData['short-description']);

	const markdown = `${podcastDescription}\n\n
    ## What's This One About?\n\n
    ${markdownEpisodeSummary}\n\n
    ${markdownContent}`;

	const episode = {
		name: podcast?.fieldData.name,
		summary: markdownEpisodeSummary,
		content: markdownContent,
		markdown: markdown,
		image: podcast?.fieldData['episode-image'].url,
		slug: podcast?.fieldData.slug
	};

	return new Response(JSON.stringify(episode));
};
