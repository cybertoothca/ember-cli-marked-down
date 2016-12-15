/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
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
        simplifiedAutoLink: true,
        /**
         * (boolean) [default false] Turning this on will stop showdown from interpreting underscores
         * in the middle of words as <em> and <strong> and instead treat them as literal underscores.
         */
        literalMidWordUnderscores: true,
        /**
         * (boolean) [default false] Enable support for strikethrough syntax.
         */
        strikethrough: true,
        /**
         * (boolean) [default false] Enable support for tables syntax.
         */
        tables: true,
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

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
