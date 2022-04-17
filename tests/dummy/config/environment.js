'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
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

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
