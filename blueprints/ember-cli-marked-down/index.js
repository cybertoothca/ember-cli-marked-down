/* eslint-env node */
module.exports = {
  description: "The blueprint that installs this addon's required bower dependencies.",
  normalizeEntityName: function () {
  },
  afterInstall: function (/*options*/) {
    var self = this;
    return self.addAddonToProject('ember-getowner-polyfill')
      .then(function () {
        return self.addBowerPackagesToProject([
          {name: 'showdown'},
          {name: 'underscore.string'}
        ]);
      });
  }
};
