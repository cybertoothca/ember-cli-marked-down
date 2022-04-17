import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('set-links-target', 'Integration | Component | set links target', {
  integration: true,
  includes: ['helper:marked-down'],
});

test('when the yield does not include any links', function (assert) {
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down "### Heading 3"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('div').html().trim(), '<h3 id="heading3">Heading 3</h3>');
});

test('when the yields link(s) do not have a target value, _blank is added', function (assert) {
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down "[Some Link](http://github.com)"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), '_blank');
});

test('when excludeSelfLinks is false, the target is applied to local links', function (assert) {
  this.render(hbs`
    {{#set-links-target excludeSelfLinks?=false}}
      {{marked-down "[Some Link](http://localhost:7357/some/path)"}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), '_blank');
});

test('when excludeSelfLinks defaults to true, the target is not applied to such links', function (assert) {
  this.set('origin', window.document.location.origin);
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down (concat "[Some Link](" origin "/some/path)")}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), undefined);
});

test('when excludeSelfLinks is explicitly set to true, the target is not applied to such links', function (assert) {
  this.set('origin', window.document.location.origin);
  this.render(hbs`
    {{#set-links-target excludeSelfLinks?=true}}
      {{marked-down (concat "[Some Link](" origin "/some/path)")}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a').attr('target'), undefined);
});

test('when the target is set for one of several links', function (assert) {
  this.set('origin', window.document.location.origin);
  this.render(hbs`
    {{#set-links-target}}
      {{marked-down (concat "[Some Link That Opens In Same Tab](" origin "/some/path) [Another Link That Will Open In A New Tab](https://github.com/cybertoothca/ember-cli-marked-down)")}}
    {{/set-links-target}}
  `);
  assert.equal(this.$('a:eq(0)').attr('target'), undefined);
  assert.equal(this.$('a:eq(1)').attr('target'), '_blank');
});
