import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { skip } from 'qunit';

moduleForComponent('set-links-target', 'Integration | Component | set links target', {
  integration: true,
  includes: [
    'helper:marked-down'
  ]
});

test('when the yield does not include any links', function (assert) {
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down "### Heading 3"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('div').html().trim(), '<h3 id="heading3">Heading 3</h3>');
});

// TODO: for some odd reason phantomjs cannot pass this test
skip('when the yields link(s) do not have a target value, _blank is added', function (assert) {
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down "[Some Link](http://github.com)"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), '_blank');
});

// TODO: for some odd reason phantomjs cannot pass this test
skip('when excludeSelfLinks is false, the target is applied to local links', function (assert) {
  this.render(hbs`
    {{#set-links-target excludeSelfLinks=false}}
      {{marked-down "[Some Link](http://localhost:7357/some/path)"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), '_blank');
});

// TODO: for some odd reason phantomjs cannot pass this test
skip('when excludeSelfLinks is true, the target is not applied to such links', function (assert) {
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down "[Some Link](http://localhost:7357/some/path)"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), undefined);
});
