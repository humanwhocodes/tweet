/**
 * @fileoverview Main functionality for tweeting.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { Env } from "@humanwhocodes/env";
import { TwitterApi } from "twitter-api-v2";

//-----------------------------------------------------------------------------
// Data
//-----------------------------------------------------------------------------

const validAPIVersions = new Set(["v1", "v2"]);

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function tweet(message, options = {}) {

    if (!message) {
        throw new Error("Missing message to tweet.");
    }

    const env = new Env(options);
    const version = env.get("TWITTER_API_VERSION", "v2");

    if (!validAPIVersions.has(version)) {
        throw new TypeError(`Invalid API version: ${ version }. Must be one of ${[...validAPIVersions]}.`);
    }

    const {
        TWITTER_ACCESS_TOKEN_KEY,
        TWITTER_ACCESS_TOKEN_SECRET,
        TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET
    } = env.required;

    const client = new TwitterApi({
        appKey: TWITTER_CONSUMER_KEY,
        appSecret: TWITTER_CONSUMER_SECRET,
        accessToken: TWITTER_ACCESS_TOKEN_KEY,
        accessSecret: TWITTER_ACCESS_TOKEN_SECRET
    });

    return client[version].tweet(message);
}
