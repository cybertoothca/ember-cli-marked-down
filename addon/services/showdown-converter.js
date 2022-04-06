import EmberObject from '@ember/object';
import { isEmpty } from '@ember/utils';
import { getOwner } from '@ember/application';
import { on } from '@ember/object/evented';
import Service from '@ember/service';
import Ember from 'ember';
import showdown from 'showdown';

export default Service.extend({
  /**
   * When initializing the Service set all of the globals according to the values found in the `environment.js`.
   */
  _instantiateConverter: on('init', function () {
    this._setShowdownGlobals();
  }),
  _setShowdownGlobals() {
    // grab the application configuration
    const config = getOwner(this).resolveRegistration('config:environment');
    // set showdown global settings from the environment
    if (isEmpty(config.APP.showdown)) {
      Ember.Logger.info('The `ember-cli-marked-down` addon will use ShowdownJS defaults to create the Converters.');
      Ember.Logger.info('If you want to customize ShowdownJS behaviour, please see the ember-cli-marked-down README: https://github.com/cybertoothca/ember-cli-marked-down#showdownjs-configuration-optional');
      return;
    }
    const showdownConfig = EmberObject.create(config.APP.showdown);
    // setting details can be found here: https://github.com/showdownjs/showdown#valid-options
    Object.keys(showdownConfig).forEach((key) => {
      showdown.setOption(key, showdownConfig.get(key));
    });
  }
});
