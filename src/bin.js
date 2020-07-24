/**
 * @fileoverview A CLI for tweeting out updates.
 * @author Nicholas C. Zakas
 */

/* eslint-disable no-console */

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

/*
 * Command line arguments will escape \n as \\n, which isn't what we want.
 * Remove the extra escapes so newlines can be entered on the command line.
 */
const message = process.argv[2].replace(/\\n/g, "\n");

const environmentVariables = [
    "TWITTER_ACCESS_TOKEN_KEY",
    "TWITTER_ACCESS_TOKEN_SECRET",
    "TWITTER_CONSUMER_KEY",
    "TWITTER_CONSUMER_SECRET"
];

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

tweet(message, process.env)
    .then(response => console.log(JSON.stringify(response, null, 2)))
    .catch(error => {
        if (error.message) {
            console.error(error.message);
        } else {
            
            console.dir(error);

            if (Array.isArray(error)) {
                const firstError = error[0];

                if (firstError.code === 215) {
                    console.error(`
This error is likely caused by invalid authentication information. Please check
that you have configured your environment variables with the correct values.
Here are the lengths of the environment variables provided for reference:\n`);
                    
                    for (const environmentVariable of environmentVariables) {
                        console.error(environmentVariable, environmentVariable.length);
                    }

                }
            }

        }
        process.exit(1);
    });
