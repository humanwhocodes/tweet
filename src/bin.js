/**
 * @fileoverview A CLI for tweeting out updates.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tweet } from "./tweet.js";

//-----------------------------------------------------------------------------
// Setup
//-----------------------------------------------------------------------------
console.error(process.argv);
if (process.argv.length < 3) {
    console.error("Usage: tweet \"Message to tweet.\"");
    console.error("Missing message to tweet.");
    process.exit(1);
}

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

(async () => {
    const response = await tweet(process.argv[2], process.env);
    console.dir(response);
})();
