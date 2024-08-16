/** */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

export const fetchFromDC = async (id) => {
  const meta_endpoint = new URL(
    `https://collections.leventhalmap.org/search/${id.replace(
      "--",
      ":"
    )}?format=json`
  );
  const data = await fetch(meta_endpoint).then((response) => response.json());
  const exemplaryImage = data.response.document.exemplary_image_ssi;
  const url = `https://bpldcassets.blob.core.windows.net/derivatives/images/${exemplaryImage}/image_access_800.jpg`;
  return {"title": data.response.document.title_info_primary_tsi, "date": data.response.document.date_tsim, "imgURL": url}
}

export const fetchFromAI = async (id) => {
  const identifier = id.split("ia--")[1];
  const meta_endpoint = new URL(`https://archive.org/metadata/${identifier}`)
  const data = await fetch(meta_endpoint).then((response) => response.json());
  return {"title": data.metadata.title, "date": data.metadata.date, "imgURL": `https://archive.org/services/img/${identifier}`}
}

export const fetchImage = (id) => {
  return(id.includes("commonwealth--") ? fetchFromDC(id) : fetchFromAI(id))
}

export const fetchBanner = async (id) => {
  const bannerImage = await fetchImage(id)
  return({
    "src": bannerImage.imgURL,
    "altText": bannerImage.title
  })
}

