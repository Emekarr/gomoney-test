import cors, { CorsOptions, CorsOptionsDelegate } from "cors";

import CORSInterface from "./CORSInterface";

class CORS implements CORSInterface {
  init(
    origin: string[],
    methods: string,
    preflightContinue: boolean,
    opts: Partial<CorsOptions> | Partial<CorsOptionsDelegate>
  ) {
    return cors({
      origin: origin,
      preflightContinue,
      methods,
      ...opts,
    });
  }
}

export default Object.freeze(new CORS());
