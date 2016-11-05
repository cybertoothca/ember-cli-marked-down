# ember-cli-marked-down [![GitHub version](https://badge.fury.io/gh/cybertoothca%2Fember-cli-marked-down.svg)](https://badge.fury.io/gh/cybertoothca%2Fember-cli-marked-down) ![](http://embadge.io/v1/badge.svg?range=%5E2.3.0)

[![npm version](https://badge.fury.io/js/ember-cli-marked-down.svg)](https://badge.fury.io/js/ember-cli-marked-down) [![CircleCI](https://circleci.com/gh/cybertoothca/ember-cli-marked-down.svg?style=shield)](https://circleci.com/gh/cybertoothca/ember-cli-marked-down) [![Code Climate](https://codeclimate.com/github/cybertoothca/ember-cli-marked-down/badges/gpa.svg)](https://codeclimate.com/github/cybertoothca/ember-cli-marked-down) ![Dependencies](https://david-dm.org/cybertoothca/ember-cli-marked-down.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-cli-marked-down.svg)](http://emberobserver.com/addons/ember-cli-marked-down) [![License](https://img.shields.io/npm/l/ember-cli-marked-down.svg)](LICENSE.md)

This addon provides a means to generate html formatted markup from 
_markdown_ source.  The [ShowdownJS](https://github.com/showdownjs/showdown) 
library is leveraged to generate the html and this addon has been 
designed to be globally configured at the application's 
`environment.js` level.

It is worth mentioning that [Markdown was created by John Gruber](https://daringfireball.net/projects/markdown/) 
and the ShowdownJS library was authored by John Fraser and is 
a _vanilla_ port of Gruber's original works.

## Cross-Side Scripting (XSS) Vulnerability

Notice: this addon will be converting _Markdown_ source in the 
client/browser within your Ember application.  The produced HTML
is passed through `Ember.String.htmlSafe(...)` to attempt to filter any
XSS attempts.  This is not fool-proof. Know your user audience and 
assume all risks.

[Check out ShowdownJS's wiki post about XSS for additional information](https://github.com/showdownjs/showdown/wiki/Markdown's-XSS-Vulnerability-(and-how-to-mitigate-it)).

## What Does This Addon Do?

This addon supplied the following _helper_:

* `MarkedDown` - the helper that produces html from the supplied 
markdown.  You can override Showdown options by passing them into the
helper.

...the following _service_:

*  `ShowdownConverter` - the service that loads ShowdownJS globals.

...the following _initializer_:

* `ShowdownConverter` - which initializes the `ShowdownConverter` 
service in all scopes.  This makes sure that any override settings
placed inside the `environment.js` are applied to the Showdown globals.

_Further information about these items can be found in the Usage 
section below._

## Requirements

* Ember >= 2.3.0
* Ember CLI

## Installation

The following will install this addon:

    $ ember install ember-cli-marked-down

### ShowdownJS Configuration

Inside the Ember application's `config/environment.js`, set 
ShowdownJS' global options according to your preference.  Use the 
following example as a template:

    // config/environment.js
    
    module.exports = function (environment) {
      var ENV = {
        // ...
        APP: {
          // ...
          /**
           * Showdown global configuration settings.
           * @see https://github.com/showdownjs/showdown#valid-options
           */
          showdown: {
            /**
             * (boolean) [default false] Omit the trailing newline in a code block.
             */
            omitExtraWLInCodeBlocks: false,
            /**
             * (boolean) [default false] Disable the automatic generation of header ids. Setting to true
             * overrides prefixHeaderId
             */
            noHeaderId: false,
            /**
             * (string/boolean) [default false] Add a prefix to the generated header ids. Passing a
             * string will prefix that string to the header id. Setting to true will add a generic 'section' prefix.
             */
            prefixHeaderId: false,
            /**
             * (boolean) [default false] Enable support for setting image dimensions from within markdown syntax.
             */
            parseImgDimensions: false,
            /**
             * (integer) [default 1] Set the header starting level.
             */
            headerLevelStart: 1,
            /**
             * (boolean) [default false] Turning this on will enable GFM autolink style.
             */
            simplifiedAutoLink: false,
            /**
             * (boolean) [default false] Turning this on will stop showdown from interpreting underscores
             * in the middle of words as <em> and <strong> and instead treat them as literal underscores.
             */
            literalMidWordUnderscores: false,
            /**
             * (boolean) [default false] Enable support for strikethrough syntax.
             */
            strikethrough: false,
            /**
             * (boolean) [default false] Enable support for tables syntax.
             */
            tables: false,
            /**
             * (boolean) [default false] If enabled adds an id property to table headers tags.
             */
            tablesHeaderId: false,
            /**
             * (boolean) [default true] Enable support for GFM code block style.
             */
            ghCodeBlocks: true,
            /**
             * (boolean) [default false] Enable support for GFM takslists.
             */
            tasklists: false,
            /**
             * (boolean) [default false] Prevents weird effects in live previews due to incomplete input.
             */
            smoothLivePreview: false,
            /**
             * (boolean) [default false] Tries to smartly fix indentation problems related to es6
             * template strings in the midst of indented code.
             */
            smartIndentationFix: false
          }
        }
      };
      // ...
      return ENV;
    }

### Upgrading

When working through the Ember upgrade process, I recommend
invoking the `ember install ember-cli-marked-down` command once 
you are done to get the latest version of the addon.

## Usage

### Helpers

#### `{{marked-down "Some __markdown__ text"}}`

Will generate the html from the supplied markdown string.

##### Arguments

* The markdown source `String` is the first argument to the helper.
* Use the helper's hash to supply all other markdown options that need
be applied to the cooked html.  See the options [listed above in the
ShowdownJS Configuration](#showdownjs-configuration) section.

##### Examples

    {{marked-down "Some __markdown__ text"}} => <p>Some <strong>markdown</strong> text</p>
    {{marked-down "Some ~~struck~~ markdown text" strikethrough=true}} => <p>Some <del>struck</del> markdown text</p>

### Services

#### `ShowdownConverter`

This service sets the Showdown libraries globals from the 
`environment.js` settings; [see the sample configuration
above](#showdownjs-configuration).

### Initializers

#### `ShowdownConverter`

An initializer that makes sure the `ShowdownConverter` service is
initialized for all scopes.  This forces the `Showdown` globals to
be set to the settings found in the `environment.js`.

### Troubleshooting And Tips

1. 

---

# Ember Addon Building And Testing

## Setup

* `git clone git@github.com:cybertoothca/ember-cli-marked-down.git`
* `npm install`
* `bower install`

## Running The Dummy Application

* `ember server`
* Visit your app at http://localhost:4200.

## Running Addon Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building The Addon

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

# Linking This Addon For Local Testing

## Linking

1. From the command line at the root of __this__ project run the 
`npm link` command to _link_ this addon within your local 
node repository.
1. From the _other_ Ember project that you wish to test this addon 
in, execute the following command:
`npm link ember-cli-marked-down`.
1. Now in that same _other_ Ember project, you should go into the
`package.json` and add the ember addon with the version _*_.  It will
look something like this: `"ember-cli-marked-down": "*"`.  Now
when/if you execute `npm install` on this _other_ project it 
will know to look for the linked addon rather than fetch it from
the central repository.

## Unlinking

1. Remove the addon from your local node repository with the following
command (that can be run anywhere):
`npm uninstall -g ember-cli-marked-down`
1. Remove the reference to the `ember-cli-marked-down` 
in your _other_ project's `package.json`.
1. Run an `npm prune` from the root of your _other_ project's command line.
