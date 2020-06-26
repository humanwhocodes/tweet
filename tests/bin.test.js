/**
 * @fileoverview Tests for the Env class.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { execSync } from "child_process";
import { expect } from "chai";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const command = `node --require esm src/bin.js`;

const envKeys = [
    "TWITTER_ACCESS_TOKEN_KEY",
    "TWITTER_ACCESS_TOKEN_SECRET",
    "TWITTER_CONSUMER_KEY",
    "TWITTER_CONSUMER_SECRET"
];

function exec(command, env) {
    return execSync(command, {
        env: {
            ...process.env,
            ...env
        },
        stdio: ["ignore", "pipe", "pipe"]
    });
}


//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Tweet", () => {
    describe("Errors", () => {
        
        it("should error when environment variables are missing", () => {

            expect(() => {
                exec(`${command} "hi"`);
            }).to.throw(new RegExp(envKeys[0]));
            
        });
        
        it("should error when only one environment variable is present", () => {
            
            expect(() => {
                exec(`${command} "hi"`, { [envKeys[0]]: "foo" });
            }).to.throw(new RegExp(envKeys[1]));
            
        });
        
        it("should error when only two environment variables are present", () => {
            
            expect(() => {
                exec(`${command} "hi"`, {
                    [envKeys[0]]: "foo",
                    [envKeys[1]]: "bar"
                });
            }).to.throw(new RegExp(envKeys[2]));
            
        });
        
        it("should error when only three environment variables are present", () => {
            
            expect(() => {
                exec(`${ command } "hi"`, {
                    [envKeys[0]]: "foo",
                    [envKeys[1]]: "bar",
                    [envKeys[2]]: "baz"
                });
            }).to.throw(new RegExp(envKeys[3]));
            
        });
        
        it("should error when there is no message to tweet", () => {
            
            expect(() => {
                exec(command, {
                    [envKeys[0]]: "foo",
                    [envKeys[1]]: "bar",
                    [envKeys[2]]: "baz",
                    [envKeys[3]]: "bar"
                });
            }).to.throw(/Missing message to tweet/);
            
        });
        
    });

});
