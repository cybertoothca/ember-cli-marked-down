/* global showdown */
import Ember from 'ember';

export function markedDown(src, hash) {
  if (Ember.isEmpty(src)) {
    return '';
  }
  const converter = new showdown.Converter(hash);
  return Ember.String.htmlSafe(converter.makeHtml(src[0].toString()));
}

export default Ember.Helper.helper(markedDown);
