# Tweet CLI

by [Nicholas C. Zakas](https://humanwhocodes.com)

![Node CI](https://github.com/nitpik/toolkit/workflows/Node%20CI/badge.svg)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A simple CLI for sending tweets. This is intended for use in CI systems such as GitHub actions in order to enable to Twitter notifications of important events.

## Usage

You must have Node.js to use this package.

To start, you must have a registered [Twitter application](https://developer.twitter.com/apps). 

Next, define four environment variables:

* `TWITTER_ACCESS_TOKEN_KEY` - your access token
* `TWITTER_ACCESS_TOKEN_SECRET` - your access token secret
* `TWITTER_CONSUMER_KEY` - your consumer API key
* `TWITTER_CONSUMER_SECRET` - your consumer API secret

The CLI will not work without these environment variables. All of these values come from your Twitter application.

Then, you can run the CLI and pass a message on the command line using `npx`:

```
$ npx @humanwhocodes/tweet "Hello from the command line!"
```

If successful, the CLI will output the response from Twitter.

### Testing with dotenv

If you'd like to test with [`dotenv`](https://npmjs.com/package/dotenv), define an additional environment variable `TWEET_DOTENV=1` before executing the CLI. This will cause a local `.env` file to be read before executing.

### Using in a GitHub Workflow

Be sure to set up [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for each environment variable. Then, you can configure a job like this:

```yaml
jobs:
  tweet:
    name: Tweet Something
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: 'npx @humanwhocodes/tweet "Your tweet text"'
        env:
          TWITTER_CONSUMER_KEY: ${{ secrets.TWITTER_CONSUMER_KEY }}
          TWITTER_CONSUMER_SECRET: ${{ secrets.TWITTER_CONSUMER_SECRET }}
          TWITTER_ACCESS_TOKEN_KEY: ${{ secrets.TWITTER_ACCESS_TOKEN_KEY }}
          TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}


```

### Developer Setup

1. Ensure you have [Node.js](https://nodejs.org) 12+ installed
2. Fork and clone this repository
3. Run `npm install`
4. Run `npm test` to run tests

## License and Copyright

This code is licensed under the Apache 2.0 License (see LICENSE for details).

Copyright Human Who Codes LLC. All rights reserved.
