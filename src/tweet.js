/**
 * @fileoverview Main functionality for tweeting.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import Twitter from "twitter";
import { Env } from "@humanwhocodes/env";

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function tweet(message, options = {}) {

    if (!message) {
        throw new Error("Missing message to tweet.");
    }

    const env = new Env(options);

    const {
        TWITTER_ACCESS_TOKEN_KEY,
        TWITTER_ACCESS_TOKEN_SECRET,
        TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET
    } = env.required;

    const client = new Twitter({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token_key: TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
    });

    return client.post("statuses/update.json", {
        status: message,
        trim_user: true
    });
}
