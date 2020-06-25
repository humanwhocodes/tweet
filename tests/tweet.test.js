/**
 * @fileoverview Tests for the tweet() function.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { tweet } from "../src/tweet.js";
import { expect } from "chai";
import nock from "nock";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const envKeys = [
    "TWITTER_ACCESS_TOKEN_KEY",
    "TWITTER_ACCESS_TOKEN_SECRET",
    "TWITTER_CONSUMER_KEY",
    "TWITTER_CONSUMER_SECRET"
];

const message = "Tweet!";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Tweet", () => {
    describe("Errors", () => {
        
        it("should error when environment variables are missing", (done) => {

            tweet(message, {}).catch(ex => {
                expect(ex.message).to.match(new RegExp(envKeys[0]));
            }).then(done);
            
        });
        
        it("should error when only one environment variable is present", (done) => {
            
            tweet(message, {
                [envKeys[0]]: "foo",
            }).catch(ex => {
                expect(ex.message).to.match(new RegExp(envKeys[1]));
            }).then(done);
            
        });
        
        it("should error when only two environment variables are present", (done) => {
            
            tweet(message, {
                [envKeys[0]]: "foo",
                [envKeys[1]]: "bar"
            }).catch(ex => {
                expect(ex.message).to.match(new RegExp(envKeys[2]));
            }).then(done);

        });
        
        it("should error when only three environment variables are present", (done) => {
            
            tweet(message, {
                [envKeys[0]]: "foo",
                [envKeys[1]]: "bar",
                [envKeys[2]]: "baz"
            }).catch(ex => {
                expect(ex.message).to.match(new RegExp(envKeys[3]));
            }).then(done);
            
        });
        
        it("should error when there is no message to tweet", (done) => {
            
            tweet(undefined).catch(ex => {
                expect(ex.message).to.match(/Missing message to tweet/);
            }).then(done);
            
        });
        
    });

    it("should send a tweet when there's a message and environment variables", done => {

        nock("https://api.twitter.com", {
            reqheaders: {
                authorization: /OAuth oauth_consumer_key="baz"/
            }
        }).post(
            "/1.1/statuses/update.json",
            `status=Tweet%21&trim_user=true`
        )
        .reply(200, { result: "Success!" });

        tweet("Tweet!", {
            [envKeys[0]]: "foo",
            [envKeys[1]]: "bar",
            [envKeys[2]]: "baz",
            [envKeys[3]]: "bar"
        }).then(response => {
            expect(response.result).to.equal("Success!");
        }).then(done);

    });

});
