<script lang="ts">
  import { inview } from 'svelte-inview';
  import type { ObserverEventDetails, Options } from 'svelte-inview';
  import { fetchImage } from 'utils/all.js';
  
  let isInView;
  const options: Options = {
    rootMargin: '50px',
    unobserveOnEnter: true,
  };

  const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
    (isInView = detail.inView);

  export let record;
  export let title;
  export let fullHeight = true;
  let height = "w-full object-cover";
  if (!fullHeight) {
    height = "w-full h-64 object-cover"
  }
  let data = fetchImage(record.id)
</script>

<div use:inview="{options}" on:inview_change="{handleChange}" class="min-h-[15vh]">
    {#await data}
    <div class="italic text-gray-400 p-4">Loading record ...</div>
    {:then d}
    {#if isInView}
    <div>
      <img src={d.imgURL} alt="{d.title}" class={height}>
    </div>
    {#if title}
    <div class="p-2 font-bold text-xl">
      {title}
    </div>
    {:else}
    <div class="p-2 font-bold text-xl">
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
