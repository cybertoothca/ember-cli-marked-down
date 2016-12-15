# ember-cli-marked-down [![GitHub version](http://badge.fury.io/gh/cybertoothca%2Fember-cli-marked-down.svg)](http://badge.fury.io/gh/cybertoothca%2Fember-cli-marked-down) ![](http://embadge.io/v1/badge.svg?start=1.13.0)

[![npm version](http://badge.fury.io/js/ember-cli-marked-down.svg)](http://badge.fury.io/js/ember-cli-marked-down) [![CircleCI](http://circleci.com/gh/cybertoothca/ember-cli-marked-down.svg?style=shield)](http://circleci.com/gh/cybertoothca/ember-cli-marked-down) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-cli-marked-down/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-cli-marked-down) ![Dependencies](http://david-dm.org/cybertoothca/ember-cli-marked-down.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-cli-marked-down.svg)](http://emberobserver.com/addons/ember-cli-marked-down) [![License](http://img.shields.io/npm/l/ember-cli-marked-down.svg)](LICENSE.md)

This addon provides a means to generate html formatted markup from 
_markdown_ source.  The [ShowdownJS](https://github.com/showdownjs/showdown) 
library is leveraged to generate the html and this addon has been 
designed to be globally configured at the application's 
`environment.js` level.

It is worth mentioning that [Markdown was created by John Gruber](https://daringfireball.net/projects/markdown/) 
and the [ShowdownJS](https://github.com/showdownjs/showdown) library 
was authored by John Fraser and is 
a _vanilla_ port of Gruber's original works.

## Demo

[Check out the demo application](http://ember-cli-marked-down.cybertooth.io).

## Cross-Side Scripting (XSS) Vulnerability

Notice: this addon will be converting _Markdown_ source in the 
client (browser).  The produced HTML
is passed to `Ember.String.htmlSafe(...)` to attempt to filter any
XSS attempts.  This is not fool-proof.  __Know your user audience and 
assume all risks.__

[Check out ShowdownJS's wiki post about XSS for additional information](https://github.com/showdownjs/showdown/wiki/Markdown's-XSS-Vulnerability-(and-how-to-mitigate-it)).

## What Does This Addon Do?

This addon supplies the following:

### Helpers

* `{{marked-down}}` - the helper that produces html from the supplied 
markdown.  Override [Showdown's options](https://github.com/showdownjs/showdown#valid-options) by passing named
arguments to the helper.

### Components

* `{{set-links-target}}` - a component that wraps some html, looks for
any `<a>`nchor elements and sets their `target` attribute to the 
specified target value.

This component complements the `{{marked-down}}` helper such that
any html generated from some markdown source can be wrapped with this
component and have all of the links targets set.  Here's an example:

    {{#set-links-target}}
      {{marked-down "Some link: <a href="http://github.com">GitHub</a>"}}
    {{/set-links-target}}

... will make sure that when the GitHub link is rendered from the 
markdown, its target attribute will be set to _blank.  Read more about
this component below.

### Services

*  `ShowdownConverter` - the service that loads ShowdownJS globals.

### Initializers

* `ShowdownConverter` - which initializes the `ShowdownConverter` 
service in all scopes.  This makes sure that any override settings
placed inside the `environment.js` are applied to the Showdown globals.

_Further information about these items can be found in the Usage 
section below._

## Requirements

* Ember >= 1.13.0
  * In order to support 1.13.0 this addon automatically installs the `ember-getowner-polyfill`.  **Ember applications
  that are already running 2.3 or later should simply remove the `ember-getowner-polyfill` dependency from their
  `package.json`.**  [Check out the `ember-getowner-polyfill` addon for more information](https://github.com/rwjblue/ember-getowner-polyfill#applications).
* Ember CLI

## Installation

The following will install this addon:

    $ ember install ember-cli-marked-down

The Showdown library will be installed in the Ember application and
should appear in the bower.json. This library is added to the
application and is available at test and runtime.

In order to support `Ember.getOwner(...)` calls the 
`ember-getowner-polyfill` addon is also installed to make sure that
this addon can work for Ember applications going back to versions
1.13.0+.

### ShowdownJS Configuration (Optional)

Inside the Ember application's `config/environment.js`, set 
ShowdownJS' global option preferences.  Use the 
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

When completing the Ember CLI upgrade process, I recommend
invoking the `ember install ember-cli-marked-down` to reinstall the
latest version of this addon.

## Usage

### Helpers

#### `{{marked-down "Some __markdown__ text"}}`

Will generate the html from the supplied markdown string.

##### Arguments

* The markdown source `String` is the only unnamed argument passed 
into the helper.
* Use the helper's hash to supply all other markdown options that need
be applied to the cooked html.  See the options [listed above in the
ShowdownJS Configuration](#showdownjs-configuration) section.

##### Examples

    {{marked-down "Some __markdown__ text"}}

...yields:

    <p>Some <strong>markdown</strong> text</p>

Passing in a Showdown option:

    {{marked-down "Some ~~struck~~ markdown text" strikethrough=true}}
    
...yields
    
    <p>Some <del>struck</del> markdown text</p>

### Components

#### `{{set-links-target}}`

This component surrounds some html markup, searches the surrounded 
markup for `<a>` elements (links), and then proceeds to
add a specified `target` attribute to the link should it not already
have a target.

The component by default will not assign the `target` attribute to 
links that it finds that belong to the host that the application is
running in.  That is to say, if an app is running at 
http://example.com and the component find a link that starts with
`http://example.com`, then that link will NOT have a target attribute
assigned.  This default behaviour can be overridden by setting the
`excludeSelfLinks?` argument to `false`.

##### Arguments

* `excludeSelfLinks?` - when `true` (DEFAULT) any links that are found
in the component's yield that share the same host url as the Ember
application will NOT have the target attribute assigned.  When `false`
all found links will have the target attribute assigned.
* `targetValue` - one of the valid target values that can be passed to
the `target` attribute of an anchor/link element.  One of: `_blank`, 
`_self`, `_parent`, `_top`, or the name of a frame in the page.  See
[W3Schools reference](http://www.w3schools.com/jsref/prop_anchor_target.asp).

##### Examples

Default Behaviour:

    {{#set-links-target excludeSelfLinks?=true targetValue="_blank"}}
      <a href="http://github.com">GitHub</a>
    {{/set-links-target}}

... will result in the following html markup:

    <div class="set-links-target">
      <a href="http://github.com" target="_blank">GitHub</a>
    </div>

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
1. Lastly, in the _other_ Ember project run the blueprint for the
 `ember-cli-marked-down` addon by executing: `ember g ember-cli-marked-down`.  This
will install the appropriate Ember Addons and Bower dependencies.

## Unlinking

1. Remove the addon from your local node repository with the following
command (that can be run anywhere):
`npm uninstall -g ember-cli-marked-down`
1. Remove the reference to the `ember-cli-marked-down` 
in your _other_ project's `package.json`.
1. Run an `npm prune` and `bower prune` from the root of your _other_ project's command line.

# Deploying The Dummy Application

Make sure your `~/.aws/credentials` file has a profile named _cybertooth_ 
with a valid key and secret,

    [cybertooth]
    aws_access_key_id = <KEY>
    aws_secret_access_key = <SECRET>

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-cli-marked-down.cybertooth.io/
