/* global showdown */
import Ember from 'ember';

export function markedDown(src, hash) {
  if (Ember.isEmpty(src) || Ember.isBlank(src[0])) {
    return '';
  }
  const converter = new showdown.Converter(Ember.Object.create(hash));
  return Ember.String.htmlSafe(converter.makeHtml(src[0].toString()));
}

export default Ember.Helper.helper(markedDown);
