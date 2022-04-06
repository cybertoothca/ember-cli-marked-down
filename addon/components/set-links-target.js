import $ from "jquery";
import startsWith from "lodash.startswith";

import Component from "@ember/component";
import { isEmpty, isPresent } from "@ember/utils";

import layout from "../templates/components/set-links-target";

export default Component.extend({
  classNames: ["set-links-target"],
  /**
   * When true (DEFAULT), any links found in the yield with the same host as `document.location.origin` will not have their
   * `target` attribute modified.
   * When false, every link that is found without a target will be modified.
   */
  "excludeSelfLinks?": true,
  layout,
  /**
   * Can be one of `_blank`, `_self`, `_parent`, `_top`, or a frame name.
   * @see http://www.w3schools.com/jsref/prop_anchor_target.asp
   */
  targetValue: "_blank",
  /**
   * Sets any `<a>` (link) `target` attributes to whatever we've specified in the `targetValue` property.
   */
  didInsertElement() {
    const excludeSelfLinks = this.get("excludeSelfLinks?");
    const origin = window.document.location.origin;
    const targetValue = this.get("targetValue");
    // for each anchor check if we should set the target
    this.$("a").each((index, element) => {
      const link = $(element);
      // are we excluding links to self?
      if (
        isPresent(link.attr("href")) &&
        startsWith(link.attr("href"), origin) &&
        excludeSelfLinks
      ) {
        return;
      }
      // got this far, then apply a target if it hasn't already got one
      if (isEmpty(link.attr("target"))) {
        link.attr("target", targetValue);
      }
    });
  },
});
