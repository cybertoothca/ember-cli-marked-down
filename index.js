/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-marked-down',
  /**
   * TODO: need to move to node inclusion of assets
   * @param app
   */
  included: function (app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/showdown/dist/showdown.js');
    app.import(app.bowerDirectory + '/underscore.string/dist/underscore.string.js');
  }

};
