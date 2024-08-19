/** */
export const getFormattedDate = (date:Date) =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

export const fetchFromDC = async (id:String) => {
  const meta_endpoint = new URL(
    `https://collections.leventhalmap.org/search/${id.replace(
      "--",
      ":"
    )}?format=json`
  );
  const data = await fetch(meta_endpoint).then((response) => response.json());
  const exemplaryImage = data.response.document.exemplary_image_ssi;
  const url = new URL(`https://bpldcassets.blob.core.windows.net/derivatives/images/${exemplaryImage}/image_access_800.jpg`);
  return {"title": data.response.document.title_info_primary_tsi, "date": data.response.document.date_tsim, "imgURL": url.toString()}
}

export const fetchFromAI = async (id:String) => {
  const identifier = id.split("ia--")[1];
  const meta_endpoint = new URL(`https://archive.org/metadata/${identifier}`)
  const data = await fetch(meta_endpoint).then((response) => response.json());
  const url = new URL(`https://archive.org/services/img/${identifier}`);
  return {"title": data.metadata.title, "date": data.metadata.date, "imgURL": url.toString()}
}

export const fetchImage = (id:String) => {
  return(id.includes("commonwealth--") ? fetchFromDC(id) : fetchFromAI(id))
}

export const fetchBanner = async (id:String) => {
  const bannerImage = await fetchImage(id)
  return({
    "src": bannerImage.imgURL,
    "alt": (bannerImage.title !== null) ? bannerImage.title : ""
  })
}

