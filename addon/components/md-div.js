import Ember from 'ember';
import layout from '../templates/components/md-div';

export default Ember.Component.extend({
  converter: Ember.computed.alias('showdownConverter.converter'),
  html: Ember.computed('src', function () {
    if (Ember.isPresent(this.get('src'))) {
      return Ember.String.htmlSafe(this.get('converter').makeHtml(this.get('src')));
    }
    return '';
  }),
  isVisible: Ember.computed.notEmpty('src'),
  layout,
  showdownConverter: Ember.inject.service()
});
