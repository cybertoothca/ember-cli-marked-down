/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-marked-down',
  included: function (app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/showdown/dist/showdown.js');
    app.import(app.bowerDirectory + '/underscore.string/dist/underscore.string.js');
  }

};
