<script lang="ts">
	import type { PageProps } from './$types';
	import { PodcastMarkdown } from '$lib';
	let { data }: PageProps = $props();
</script>

<main class="flex min-h-screen flex-col items-center bg-gray-100 p-8">
	<h1 class="mb-6 text-3xl font-bold">{data.podcast?.name || 'Loading...'}</h1>
	<div class="w-full max-w-4xl">
		{#if data.podcast?.episodes}
			{#each data.podcast.episodes as episode (episode.id)}
				<div class="mb-4 rounded-lg bg-white p-6 shadow">
					<h2 class="mb-2 text-xl font-semibold">{episode.name}</h2>
					<div class="mb-4">
						<h3 class="mb-1 block text-gray-700">Embed Code</h3>
						<pre class="overflow-auto rounded bg-gray-800 p-3 text-sm text-white">
{`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`}
						</pre>
					</div>
					<div>
						<h3 class="mb-1 block text-gray-700">Shortcode</h3>
						<pre class="overflow-auto rounded bg-gray-800 p-3 text-sm text-white">
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
