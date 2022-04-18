# ember-cli-marked-down

[![npm version](http://badge.fury.io/js/ember-cli-marked-down.svg)](http://badge.fury.io/js/ember-cli-marked-down) ![downloads](https://img.shields.io/npm/dy/ember-cli-marked-down.svg) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-cli-marked-down/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-cli-marked-down)

[![ember-observer-badge](http://emberobserver.com/badges/ember-cli-marked-down.svg)](http://emberobserver.com/addons/ember-cli-marked-down) [![License](http://img.shields.io/npm/l/ember-cli-marked-down.svg)](LICENSE.md)

This addon provides a means to generate html formatted markup from
_markdown_ source. The [ShowdownJS](https://github.com/showdownjs/showdown)
library is leveraged to generate the html and this addon has been
designed to be globally configured at the application's
`environment.js` level.

It is worth mentioning that [Markdown was created by John Gruber](https://daringfireball.net/projects/markdown/)
and the [ShowdownJS](https://github.com/showdownjs/showdown) library
was authored by John Fraser and is
a _vanilla_ port of Gruber's original works.

## Compatibility

- Ember.js v3.4 or above
- Ember CLI v2.13 or above
- Node.js v8 or above

## Installation

```
ember install ember-cli-marked-down
```

## Demo

[Check out the demo application](http://ember-cli-marked-down.cybertooth.io).

## Cross-Side Scripting (XSS) Vulnerability

Notice: this addon will be converting _Markdown_ source in the
client (browser). The produced HTML
is passed to `Ember.String.htmlSafe(...)` to attempt to filter any
XSS attempts. This is not fool-proof. **Know your user audience and
assume all risks.**

## ShowdownJS

[Check out ShowdownJS's wiki post about XSS for additional information](<https://github.com/showdownjs/showdown/wiki/Markdown's-XSS-Vulnerability-(and-how-to-mitigate-it)>).

# Usage

## Helpers

### `{{marked-down "Some __markdown__ text"}}`

The helper that produces html from the supplied markdown. Override [Showdown's options](https://github.com/showdownjs/showdown#valid-options) by passing named arguments to the helper.

#### Arguments

- The markdown source `String` is the only unnamed argument passed
  into the helper.
- Use the helper's hash to supply all other markdown options that need
  be applied to the cooked html. See the options [listed above in the
  ShowdownJS Configuration](#showdownjs-configuration) section.

#### Examples

```handlebars
{{marked-down 'Some __markdown__ text'}}
```

...yields:

```html
<p>Some <strong>markdown</strong> text</p>
```

Passing in a Showdown option:

```handlebars
{{marked-down 'Some ~~struck~~ markdown text' strikethrough=true}}
```

...yields

```html
<p>Some <del>struck</del> markdown text</p>
```

## Components

### `{{set-links-target}}`

This component surrounds some html markup, searches the surrounded
markup for `<a>` elements (links), and then proceeds to
add a specified `target` attribute to the link should it not already
have a target.

The component by default will not assign the `target` attribute to
links that it finds that belong to the host that the application is
running in. That is to say, if an app is running at
http://example.com and the component find a link that starts with
`http://example.com`, then that link will NOT have a target attribute
assigned. This default behaviour can be overridden by setting the
`excludeSelfLinks?` argument to `false`.

#### Arguments

- `excludeSelfLinks?` - when `true` (DEFAULT) any links that are found
  in the component's yield that share the same host url as the Ember
  application will NOT have the target attribute assigned. When `false`
  all found links will have the target attribute assigned.
- `targetValue` - one of the valid target values that can be passed to
  the `target` attribute of an anchor/link element. One of: `_blank`,
  `_self`, `_parent`, `_top`, or the name of a frame in the page. See
  [W3Schools reference](http://www.w3schools.com/jsref/prop_anchor_target.asp).

#### Examples

Default Behaviour:

```handlebars
{{#set-links-target excludeSelfLinks?=true targetValue='_blank'}}
  <a href='http://github.com'>GitHub</a>
{{/set-links-target}}
```

... will result in the following html markup:

```html
<div class="set-links-target">
  <a href="http://github.com" target="_blank">GitHub</a>
</div>
```

## Services

### `ShowdownConverter`

This service sets the Showdown libraries globals from the
`environment.js` settings; [see the sample configuration
above](#showdownjs-configuration).

## Initializers

### `ShowdownConverter`

An initializer that makes sure the `ShowdownConverter` service is
initialized for all scopes. This forces the `Showdown` globals to
be set to the settings found in the `environment.js`.

### ShowdownJS Configuration (Optional)

Inside the Ember application's `config/environment.js`, set
ShowdownJS' global option preferences. Use the
following example as a template:

```javascript
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
         * (boolean) [default false] Generate header ids compatible with github style (spaces are
         * replaced with dashes and a bunch of non alphanumeric chars are removed) (since showdown-1.5.5).
         */
        ghCompatibleHeaderId: false,
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
         * (boolean) [default false] This option excludes trailing punctuation from
         * autolinking urls. Punctuation excluded: . ! ? ( ). Only applies if
         * simplifiedAutoLink option is set to true.
         */
        excludeTrailingPunctuationFromURLs: false,
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
        smartIndentationFix: false,
        /**
         * (boolean) [default false] Disables the requirement of indenting sublists by
         * 4 spaces for them to be nested, effectively reverting to the old behavior where
         * 2 or 3 spaces were enough. (since showdown-1.5.0).
         */
        disableForced4SpacesIndentedSublists: false,
        /**
         * (boolean) [default false] Parses line breaks as like GitHub does, without
         * needing 2 spaces at the end of the line (since showdown-1.5.1).
         */
        simpleLineBreaks: false,
        /**
         * (boolean) [default false] Makes adding a space between # and the header text
         * mandatory (since showdown-1.5.3).
         */
        requireSpaceBeforeHeadingText: false,
        /**
         * (boolean) [default false] Enables github @mentions, which link to the username
         * mentioned (since showdown-1.6.0).
         */
        ghMentions: false,
      },
    },
  };
  // ...
  return ENV;
};
```

## License

This project is licensed under the [MIT License](LICENSE.md).
