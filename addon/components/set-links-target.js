import startsWith from 'lodash.startswith';

import Component from '@ember/component';
import { isEmpty } from '@ember/utils';

import layout from '../templates/components/set-links-target';

export default Component.extend({
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
   * Sets any `<a>` (link) `target` attributes to whatever we've specified in the `targetValue` property.
   */
  didInsertElement() {
    const excludeSelfLinks = this['excludeSelfLinks?'];
    const origin = window.document.location.origin;
    const targetValue = this.targetValue;
    // for each anchor check if we should set the target
    this.element.querySelectorAll('a').forEach(element => {
      if (element.hasAttribute('href') && startsWith(element.getAttribute('href'), origin) && excludeSelfLinks) {
        return;
      }
      // got this far, then apply a target if it hasn't already got one
      if (isEmpty(element.getAttribute('target'))) {
        element.setAttribute('target', targetValue);
      }
    });
  },
});
