import { baseURL } from "@lib/variables";

export const fetchPlaybackPlaholder = (fid: string) =>
  fetch(baseURL + "/api/stream/playback/" + fid).then(
    async (res) => (await res.json()).meta.source[2].url
  );
