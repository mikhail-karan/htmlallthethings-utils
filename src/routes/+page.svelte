<script lang="ts">
   import type { PageProps } from './$types';

let { data }: PageProps = $props();
</script>

<main class="p-4  flex flex-col gap-6 items-center">
    <h1 class="text-2xl font-bold">{data.podcast?.name || 'Loading...'}</h1>
    
    <div class="flex flex-col gap-4 w-3/4">
        {#if data.podcast?.episodes}
        {#each data.podcast?.episodes as episode}
            <div class="flex flex-col gap-2">
                <h2 class="text-lg font-bold">{episode.name}</h2>
                <pre class="w-full overflow-auto">{`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`}</pre>
                <pre class="w-full overflow-auto">{`{% spotify spotify:episode:${episode.id} %}`}</pre>
            </div>
            {/each}
        {/if}
    </div>
    </main>
