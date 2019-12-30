/* eslint-env node */
module.exports = {
  description: 'Ember `marked-down` helper blueprint.',

  normalizeEntityName() {
  }, // no-op since we're just adding dependencies

  afterInstall(/* options*/) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-auto-import' },
        { name: 'ember-getowner-polyfill' }
      ]
    }).then(() => {
      return this.addPackagesToProject([
        { name: 'lodash.startswith' },
        { name: 'showdown' }
      ]);
    });
  }
};
