import * as tv4 from "tv4";
import * as av from "./schemas/av.json";
import * as bangumi from "./schemas/bangumi.json";
import * as seek from "./schemas/seek.json";

const baseURL = "http://json-schemas.dev.mottomo.moe/sebas";
const avRef = baseURL + "/objects/av";
const bangumiRef = baseURL + "/objects/bangumi";
const seekRef = baseURL + "/objects/seek";

abstract class BasSchemas {

    static get av(): tv4.JsonSchema {
        return av;
    }

    static get avRef(): string {
        return avRef;
    }

    static get bangumi(): tv4.JsonSchema {
        return bangumi;
    }

    static get bangumiRef(): string {
        return bangumiRef;
    }

    static get seek(): tv4.JsonSchema {
        return seek;
    }

    static get seekRef(): string {
        return seekRef;
    }

}

export default BasSchemas;
