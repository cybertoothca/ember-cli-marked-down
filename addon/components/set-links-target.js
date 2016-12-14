/* globals s */
import Ember from 'ember';
import layout from '../templates/components/set-links-target';

export default Ember.Component.extend({
  classNames: ['set-links-target'],
  /**
   * When true (DEFAULT), any links found in the yield with the same host as `document.location.origin` will not have their
   * `target` attribute modified.
   * When false, every link that is found without a target will be modified.
   */
  'excludeSelfLinks?': true,
  layout,
  /**
   * Can be one of `_blank`, `_self`, `_parent`, `_top`, or a frame name.
   * @see http://www.w3schools.com/jsref/prop_anchor_target.asp
   */
  targetValue: '_blank',
  /**
   * Determines the `window.document.location.origin` because PhantomJS does not have a notion of the location object.
   */
  _origin: Ember.computed(function () {
    if (Ember.isPresent(document)) {
      return document.location.origin;
    }
    return 'http://localhost:7357';
  }),
  /**
   * Sets any `<a>` (link) `target` attributes to whatever we've specified in the `targetValue` property.
   */
  _setTarget: Ember.on('didInsertElement', function () {
    const excludeSelfLinks = this.get('excludeSelfLinks?');
    const origin = this.get('_origin');
    const targetValue = this.get('targetValue');
    // for each anchor check if we should set the target
    this.$('a').each((index, element) => {
      const link = Ember.$(element);
      // are we excluding links to self?
      if (Ember.isPresent(link.attr('href')) &&
        // link.attr('href').startsWith(origin) &&
        // because startsWith is ES6 and not supported by some browsers...using underscore.string
        s.startsWith(link.attr('href'), origin) &&
        // link.attr('href').substring(0, origin.length) === origin &&
        excludeSelfLinks) {
        link.attr('data-substring', link.attr('href').substring(0, origin.length));
        return false;
      }
      // got this far, then apply a target if it hasn't already got one
      if (Ember.isEmpty(link.attr('target'))) {
        link.attr('target', targetValue);
      }
    });
  })
});
