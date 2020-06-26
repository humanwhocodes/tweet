/**
 * @fileoverview A CLI for tweeting out updates.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tweet } from "./tweet.js";
import dotenv from "dotenv";

//-----------------------------------------------------------------------------
// Setup
//-----------------------------------------------------------------------------

if (process.argv.length < 3) {
    console.error("Usage: tweet \"Message to tweet.\"");
    console.error("Missing message to tweet.");
    process.exit(1);
}

if (process.env.TWEET_DOTENV === "1") {
    dotenv.config();
}

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

tweet(process.argv[2], process.env)
    .then(response => console.log(JSON.stringify(response, null, 2)))
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });
