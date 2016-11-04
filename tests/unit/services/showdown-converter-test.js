/* global showdown */
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:showdown-converter', 'Unit | Service | showdown converter', {
  // Specify the other units that are required for this test.
  needs: ['config:environment']
});

test('when loaded all the showdown defaults are set accordingly', function (assert) {
  let service = this.subject();
  assert.ok(service);
  assert.equal(Object.keys(showdown.getOptions()).length, 14);
  assert.notOk(showdown.getOption('omitExtraWLInCodeBlocks'));
  assert.notOk(showdown.getOption('noHeaderId'));
  assert.notOk(showdown.getOption('prefixHeaderId'));
  assert.notOk(showdown.getOption('parseImgDimensions'));
  assert.equal(showdown.getOption('headerLevelStart'), 1);
  assert.ok(showdown.getOption('simplifiedAutoLink'));
  assert.ok(showdown.getOption('literalMidWordUnderscores'));
  assert.ok(showdown.getOption('strikethrough'));
  assert.ok(showdown.getOption('tables'));
  assert.notOk(showdown.getOption('tablesHeaderId'));
  assert.ok(showdown.getOption('ghCodeBlocks'));
  assert.notOk(showdown.getOption('tasklists'));
  assert.notOk(showdown.getOption('smoothLivePreview'));
  assert.notOk(showdown.getOption('smartIndentationFix'));
});

test('when loaded the converter defaults are set accordingly', function (assert) {
  let service = this.subject();
  assert.ok(service);
  assert.equal(Object.keys(showdown.getOptions()).length, 14);
  const converter = new showdown.Converter();
  assert.notOk(converter.getOption('omitExtraWLInCodeBlocks'));
  assert.notOk(converter.getOption('noHeaderId'));
  assert.notOk(converter.getOption('prefixHeaderId'));
  assert.notOk(converter.getOption('parseImgDimensions'));
  assert.equal(converter.getOption('headerLevelStart'), 1);
  assert.ok(converter.getOption('simplifiedAutoLink'));
  assert.ok(converter.getOption('literalMidWordUnderscores'));
  assert.ok(converter.getOption('strikethrough'));
  assert.ok(converter.getOption('tables'));
  assert.notOk(converter.getOption('tablesHeaderId'));
  assert.ok(converter.getOption('ghCodeBlocks'));
  assert.notOk(converter.getOption('tasklists'));
  assert.notOk(converter.getOption('smoothLivePreview'));
  assert.notOk(converter.getOption('smartIndentationFix'));
});
