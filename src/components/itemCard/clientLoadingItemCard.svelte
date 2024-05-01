<script lang="ts">
  import { inview } from 'svelte-inview';
  import type { ObserverEventDetails, Options } from 'svelte-inview';
  
  let isInView;
  const options: Options = {
    rootMargin: '50px',
    unobserveOnEnter: true,
  };

  const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
    (isInView = detail.inView);

  export let record;
  export let title;

  async function fetchFromDC(id) {
    const meta_endpoint = new URL(
      `https://collections.leventhalmap.org/search/${id.replace(
        "--",
        ":"
      )}?format=json`
    );
    const data = await fetch(meta_endpoint).then((response) => response.json());
    const exemplaryImage = data.response.document.exemplary_image_ssi;
    const url = `https://bpldcassets.blob.core.windows.net/derivatives/images/${exemplaryImage}/image_thumbnail_300.jpg`;
    return {"title": data.response.document.title_info_primary_tsi, "date": data.response.document.date_tsim, "imgURL": url}
  }

  async function fetchFromAI(id) {
    const identifier = id.split("ia--")[1];
    const meta_endpoint = new URL(`https://archive.org/metadata/${identifier}`)
    console.log(meta_endpoint);
    const data = await fetch(meta_endpoint).then((response) => response.json());
    return {"title": data.metadata.title, "date": data.metadata.date, "imgURL": `https://archive.org/services/img/${identifier}`}
  }
  let data = record.id.includes("commonwealth--") ? fetchFromDC(record.id) : fetchFromAI(record.id);
</script>

<div use:inview="{options}" on:inview_change="{handleChange}" class="min-h-[15vh]">
    {#await data}
    <div class="italic text-gray-400 p-4">Loading record ...</div>
    {:then d}
    {#if isInView}
    <div>
      <img src={d.imgURL} alt="" class="w-full h-48 object-cover">
    </div>
    {#if title}
    <div class="font-serif p-2 text-lg">
      {title}
    </div>
    {:else}
    <div class="font-serif p-2 text-lg">
      {d.title}
    </div>
    <div class="p-2 text-sm">
      {d.date}
    </div>
    {/if}
    {/if}
    {:catch error}
	  <p style="color: red">Error loading this item</p>
    {/await}
</div>
