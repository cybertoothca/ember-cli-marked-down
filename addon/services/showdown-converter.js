import showdown from 'showdown';

import { getOwner } from '@ember/application';
import EmberObject from '@ember/object';
import { on } from '@ember/object/evented';
import Service from '@ember/service';
import { isEmpty } from '@ember/utils';

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
      // eslint-disable-next-line no-console
      console.info('The `ember-cli-marked-down` addon will use ShowdownJS defaults to create the Converters.');
      // eslint-disable-next-line no-console
      console.info(
        'If you want to customize ShowdownJS behaviour, please see the ember-cli-marked-down README: https://github.com/cybertoothca/ember-cli-marked-down#showdownjs-configuration-optional'
      );
      return;
    }
    const showdownConfig = EmberObject.create(config.APP.showdown);
    // setting details can be found here: https://github.com/showdownjs/showdown#valid-options
    Object.keys(showdownConfig).forEach(key => {
      showdown.setOption(key, showdownConfig.get(key));
    });
  },
});
