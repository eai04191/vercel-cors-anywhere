import { NowRequest, NowResponse } from "@vercel/node";
import { promisify } from "util";
import got from "got";
import { CookieJar } from "tough-cookie";

export default async function (req: NowRequest, res: NowResponse) {
    const { url = null } = req.query;
    if (url === null) {
        res.status(400).json({ error: `Missing url parameter.` });
        return;
    }
    if (typeof url !== "string") {
        res.status(400).json({ error: `url parameter must be string.` });
        return;
    }

    try {
        const cookieJar = new CookieJar();
        const response = await got(url, { cookieJar });

        res.send(response.body);
        return;
    } catch (error) {
        res.status(500).json({ error: error.message });
        return;
    }
}
