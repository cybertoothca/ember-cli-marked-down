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
  assert.notOk(service.get('converter').getOption('omitExtraWLInCodeBlocks'));
  assert.notOk(service.get('converter').getOption('noHeaderId'));
  assert.notOk(service.get('converter').getOption('prefixHeaderId'));
  assert.notOk(service.get('converter').getOption('parseImgDimensions'));
  assert.equal(service.get('converter').getOption('headerLevelStart'), 1);
  assert.ok(service.get('converter').getOption('simplifiedAutoLink'));
  assert.ok(service.get('converter').getOption('literalMidWordUnderscores'));
  assert.ok(service.get('converter').getOption('strikethrough'));
  assert.ok(service.get('converter').getOption('tables'));
  assert.notOk(service.get('converter').getOption('tablesHeaderId'));
  assert.ok(service.get('converter').getOption('ghCodeBlocks'));
  assert.notOk(service.get('converter').getOption('tasklists'));
  assert.notOk(service.get('converter').getOption('smoothLivePreview'));
  assert.notOk(service.get('converter').getOption('smartIndentationFix'));
});

test('when asking the converter to make some html', function (assert) {
  let service = this.subject();
  assert.equal(service.get('converter').makeHtml('# Some Heading 1'), '<h1 id=\"someheading1\">Some Heading 1</h1>');
});
