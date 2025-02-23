<script lang="ts">
    import { getPodcastMarkdown } from '$lib';
    import type { Episode } from '../../types/Episode';
    let markdown = $state('');
    let episode = $state<{
        name: string;
        summary: string;
        content: string;
        markdown: string;
        image: string;
        slug: string;
    } | null>(null);
    let props = $props();
    let isLoading = $state(false);
    let image = $state('');
    let url = $state('https://www.htmlallthethings.com/podcasts');
    let isCopied = $state(false);
    
    const getMarkdown = async () => {
        if (!props.episode) return;
        isLoading = true;
        episode = await getPodcastMarkdown(props.episode);
        image = episode?.image || '';
        markdown = episode?.markdown || '';
        url = `https://www.htmlallthethings.com/podcasts/${episode?.slug}`;
        isLoading = false;
    }



    const copyToClipboard = () => {
        if (!markdown) return;
        navigator.clipboard.writeText(markdown);
        isCopied = true;
        setTimeout(() => {
            isCopied = false;
        }, 2000);
    }

    $effect(() => {
        // if image is not empty get the image and convert it to a png
        getImage();
     }) 

     const getImage = async () => {
        const img = new Image();
        img.src = image;
        img.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const png = canvas.toDataURL('image/png');
        console.log(png);
        image = png;
     }
</script>

<div class="flex flex-col gap-4 my-4">

    <button class="bg-blue-500 text-white p-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading} onclick={getMarkdown}>Get Podcast Markdown</button>
    
    {#if props.episode && markdown}
        <div class="flex flex-col gap-2">
            <pre class="text-sm">{url}</pre>
            <img src={image} alt="Podcast" class="w-1/2 h-1/2 rounded-lg" />
            <button class="bg-green-500 text-white p-2 rounded cursor-pointer" onclick={copyToClipboard}>{isCopied ? 'Copied' : 'Copy to Clipboard'}</button>
            <pre class="bg-gray-800 text-white p-3 rounded overflow-auto text-sm">{markdown}</pre>
        </div>
    {/if}
</div>