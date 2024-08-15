<script>
  import OpenSeaDragon from "openseadragon";
  import { onMount } from "svelte";

  export let imageEndpointArray;

  onMount(()=> {
    const osd = new OpenSeaDragon({
    id: "osd",
    sequenceMode: true,
    prefixUrl: "/images/openseadragon/",
    tileSources: imageEndpointArray
  });

  })


</script>

<div id="outer">
  <div id="osd" />
</div>

<style>
  #outer {
    width: 100%;
    height: 800px;
    margin: 0;
    padding: 0;
    background-color: #333;
  }
  #osd {
    width: 100%;
    height: 100%;
  }
</style>
