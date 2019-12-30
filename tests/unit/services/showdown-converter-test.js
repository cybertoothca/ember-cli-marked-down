import { moduleFor, test } from 'ember-qunit';
import showdown from 'showdown';

moduleFor('service:showdown-converter', 'Unit | Service | showdown converter', {
  // Specify the other units that are required for this test.
  needs: ['config:environment']
});

test('when loaded all the showdown defaults are set accordingly', function (assert) {
  let service = this.subject();
  assert.ok(service);
  assert.notOk(showdown.getOption('omitExtraWLInCodeBlocks'));
  assert.notOk(showdown.getOption('noHeaderId'));
  assert.notOk(showdown.getOption('prefixHeaderId'));
  assert.notOk(showdown.getOption('ghCompatibleHeaderId'));
  assert.notOk(showdown.getOption('parseImgDimensions'));
  assert.equal(showdown.getOption('headerLevelStart'), 1);
  assert.notOk(showdown.getOption('simplifiedAutoLink'));
  assert.notOk(showdown.getOption('excludeTrailingPunctuationFromURLs'));
  assert.notOk(showdown.getOption('literalMidWordUnderscores'));
  assert.notOk(showdown.getOption('strikethrough'));
  assert.notOk(showdown.getOption('tables'));
  assert.notOk(showdown.getOption('tablesHeaderId'));
  assert.ok(showdown.getOption('ghCodeBlocks'));
  assert.notOk(showdown.getOption('tasklists'));
  assert.notOk(showdown.getOption('smoothLivePreview'));
  assert.notOk(showdown.getOption('smartIndentationFix'));
  assert.notOk(showdown.getOption('disableForced4SpacesIndentedSublists'));
  assert.notOk(showdown.getOption('simpleLineBreaks'));
  assert.notOk(showdown.getOption('requireSpaceBeforeHeadingText'));
  assert.notOk(showdown.getOption('ghMentions'));
});

test('when loaded the converter defaults are set accordingly', function (assert) {
  let service = this.subject();
  assert.ok(service);
  // just randomly overriding some settings
  const converter = new showdown.Converter({
    noHeaderId: true,
    excludeTrailingPunctuationFromURLs: true,
    tables: true
  });
  assert.notOk(converter.getOption('omitExtraWLInCodeBlocks'));
  assert.ok(converter.getOption('noHeaderId'));
  assert.notOk(converter.getOption('prefixHeaderId'));
  assert.notOk(converter.getOption('ghCompatibleHeaderId'));
  assert.notOk(converter.getOption('parseImgDimensions'));
  assert.equal(converter.getOption('headerLevelStart'), 1);
  assert.notOk(converter.getOption('simplifiedAutoLink'));
  assert.ok(converter.getOption('excludeTrailingPunctuationFromURLs'));
  assert.notOk(converter.getOption('literalMidWordUnderscores'));
  assert.notOk(converter.getOption('strikethrough'));
  assert.ok(converter.getOption('tables'));
  assert.notOk(converter.getOption('tablesHeaderId'));
  assert.ok(converter.getOption('ghCodeBlocks'));
  assert.notOk(converter.getOption('tasklists'));
  assert.notOk(converter.getOption('smoothLivePreview'));
  assert.notOk(converter.getOption('smartIndentationFix'));
  assert.notOk(converter.getOption('disableForced4SpacesIndentedSublists'));
  assert.notOk(converter.getOption('simpleLineBreaks'));
  assert.notOk(converter.getOption('requireSpaceBeforeHeadingText'));
  assert.notOk(converter.getOption('ghMentions'));
});
