<script lang="ts">
	import type { PageProps } from './$types';
	import { PodcastMarkdown } from '$lib';
	let { data }: PageProps = $props();
</script>

<main class="min-h-screen bg-gray-100 flex flex-col items-center p-8">
	<h1 class="text-3xl font-bold mb-6">{data.podcast?.name || 'Loading...'}</h1>
	<div class="w-full max-w-4xl">
		{#if data.podcast?.episodes}
			{#each data.podcast.episodes as episode (episode.id)}
				<div class="bg-white rounded-lg shadow p-6 mb-4">
					<h2 class="text-xl font-semibold mb-2">{episode.name}</h2>
					<div class="mb-4">
						<label class="block text-gray-700 mb-1">Embed Code</label>
						<pre class="bg-gray-800 text-white p-3 rounded overflow-auto text-sm">
{`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`}
						</pre>
					</div>
					<div>
						<label class="block text-gray-700 mb-1">Shortcode</label>
						<pre class="bg-gray-800 text-white p-3 rounded overflow-auto text-sm">
{`{% spotify spotify:episode:${episode.id} %}`}
						</pre>
					</div>
					<PodcastMarkdown {episode} />
				</div>
			{/each}
		{:else}
			<p class="text-gray-600">Loading episodes...</p>
		{/if}
	</div>
</main>
