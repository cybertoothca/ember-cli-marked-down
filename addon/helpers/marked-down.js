import showdown from "showdown";

import { helper as buildHelper } from "@ember/component/helper";
import EmberObject from "@ember/object";
import { htmlSafe } from "@ember/template";
import { isBlank, isEmpty } from "@ember/utils";

export function markedDown(src, hash) {
  if (isEmpty(src) || isBlank(src[0])) {
    return "";
  }
  const converter = new showdown.Converter(EmberObject.create(hash || {}));
  return htmlSafe(converter.makeHtml(src[0].toString()));
}

export default buildHelper(markedDown);
