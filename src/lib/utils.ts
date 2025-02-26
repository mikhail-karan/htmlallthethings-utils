import type { Episode } from '../types/Episode';

const getPodcastMarkdown = async (episode: Episode) => {
    try {
        console.log(episode);
        const data = await fetch(`/api/get-webflow-podcast`, {
            method: 'POST',
            body: JSON.stringify({ podcastName: episode.name })
        });
        const markdown = await data.json();
        return markdown;
    } catch (error) {
        console.error(error);
        return '';
    }
}

export { getPodcastMarkdown };