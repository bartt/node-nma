# node-nma

A Node.js library and CLI tool to send notifications via Notify My Android

[![npm Version][npm-image]][npm-url] [![npm Downloads][downloads-image]][downloads-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][david-image]][david-url] [![Open Issues][issues-image]][issues-url]

## Installation

If you want to use the CLI tool, Use the `-g` flag to install globally.

    $ npm install [-g] nma

## Code Example

```javascript
var nma = require("nma");

nma({
  "apikey": "02cfc1a5f4e567929c31c13953e1adef247118562f148f7a",
  "application": "Your App",
  "event": "An Event",
  "description": "And a description of that event...",
  "priority": 0, // Priority
  "url": "http://www.somewebsite.com/",
  "content-type": "text/plain"
}, callback);
```

Also, `apikey` can be a list of comma separated keys if you're using multiple keys.

## CLI Usage

Follows the NMA API closely:

    $ nma -k apikey -a application -e event -d description -p priority -u url -c content-type

Complete usage details via `nma --help`

```sh
Usage: nma [options]

Options:

  -h, --help                 output usage information
  -V, --version              output the version number
  -k, --apikey <key>         API key(s), separated by commas
  -a, --application <app>    Name of the application generating the notification
  -e, --event <event>        Subject of the notification
  -d, --description <desc>   Full text of the notification
  -p, --priority [0]         -2 = Very Low; -1 = Moderate; 0 = Normal; 1 = High; 2 = Emergency
  -u, --url <url>            URL/URI to associate with the notification
  -c, --content-type [type]  Set to "text/html" and basic html will be rendered while displaying the notification
```

## License

MIT

[npm-image]: http://img.shields.io/npm/v/nma-promise.svg
[npm-url]: http://npm.im/nma-promise
[downloads-image]: http://img.shields.io/npm/dm/nma-promise.svg
[downloads-url]: http://npm.im/nma-promise
[travis-image]: https://secure.travis-ci.org/bartt/node-nma.png
[travis-url]: http://travis-ci.org/bartt/node-nma
[coveralls-image]: https://img.shields.io/coveralls/bartt/node-nma.svg
[coveralls-url]: https://coveralls.io/r/bartt/node-nma
[david-image]: https://david-dm.org/bartt/node-nma.png
[david-url]: https://david-dm.org/bartt/node-nma
[issues-image]: http://img.shields.io/github/issues/bartt/node-nma.svg
[issues-url]: https://github.com/bartt/node-nma/issues
