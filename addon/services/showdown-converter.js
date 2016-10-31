/* global showdown */
import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Set on `init` and will be the Singleton converter used to `makeHtml(...)`
   */
  converter: undefined,
  /**
   *
   */
  _instantiateConverter: Ember.on('init', function () {
    this._setShowdownGlobals();
    this._setConverter();
  }),
  _setConverter() {
    // create the singleton converter
    this.set('converter', new showdown.Converter());
  },
  _setShowdownGlobals() {
    // grab the application configuration
    const config = Ember.getOwner(this).resolveRegistration('config:environment');
    // set showdown global settings from the environment
    if (Ember.isEmpty(config.APP.showdown)) {
      Ember.Logger.info('The `ember-cli-marked-down` addon will use ShowdownJS defaults to create the Converters.');
      Ember.Logger.info('If you want to customize ShowdownJS behaviour, please see the ember-cli-marked-down README: https://github.com/cybertoothca/ember-cli-marked-down#showdownjs-configuration');
      return;
    }
    const showdownConfig = Ember.Object.create(config.APP.showdown);
    // setting details can be found here: https://github.com/showdownjs/showdown#valid-options
    showdown.setOption('omitExtraWLInCodeBlocks', showdownConfig.getWithDefault('omitExtraWLInCodeBlocks', false));
    showdown.setOption('noHeaderId', showdownConfig.getWithDefault('noHeaderId', false));
    showdown.setOption('prefixHeaderId', showdownConfig.getWithDefault('prefixHeaderId', false));
    showdown.setOption('parseImgDimensions', showdownConfig.getWithDefault('parseImgDimensions', false));
    showdown.setOption('headerLevelStart', showdownConfig.getWithDefault('headerLevelStart', 1));
    showdown.setOption('simplifiedAutoLink', showdownConfig.getWithDefault('simplifiedAutoLink', false));
    showdown.setOption('literalMidWordUnderscores', showdownConfig.getWithDefault('literalMidWordUnderscores', false));
    showdown.setOption('strikethrough', showdownConfig.getWithDefault('strikethrough', false));
    showdown.setOption('tables', showdownConfig.getWithDefault('tables', false));
    showdown.setOption('tablesHeaderId', showdownConfig.getWithDefault('tablesHeaderId', false));
    showdown.setOption('ghCodeBlocks', showdownConfig.getWithDefault('ghCodeBlocks', true));
    showdown.setOption('tasklists', showdownConfig.getWithDefault('tasklists', false));
    showdown.setOption('smoothLivePreview', showdownConfig.getWithDefault('smoothLivePreview', false));
    showdown.setOption('smartIndentationFix', showdownConfig.getWithDefault('smartIndentationFix', false));
  }
});
