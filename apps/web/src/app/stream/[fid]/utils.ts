import { baseURL } from "@lib/variables";

export const fetchPlaybackPlaholder = (fid: string) =>
  fetch(baseURL + "/api/stream/playback/" + fid).then(async (res) => {
    const { meta } = await res.json();

    return {
      image: meta.source[2].url,
      video: meta.source[0].url,
    };
  });
