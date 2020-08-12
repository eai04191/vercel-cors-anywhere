import { NowRequest, NowResponse } from "@vercel/node";
import got from "got";

export default async function (req: NowRequest, res: NowResponse) {
    const { url = null } = req.query;
    if (url === null) {
        res.status(400).send(`Missing url parameter.`);
        return;
    }
    if (typeof url !== "string") {
        res.status(400).send(`url parameter must be string.`);
        return;
    }

    const response = await got(url).text();

    res.send(response);
}
