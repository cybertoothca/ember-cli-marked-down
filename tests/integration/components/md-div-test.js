import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-div', 'Integration | Component | md div', {
  integration: true
});

test('when rendering without src an empty div is returned', function (assert) {
  this.render(hbs`{{md-div}}`);
  assert.equal(this.$('div').css('display'), 'none');
});

test('when rendering with some source', function (assert) {
  this.render(hbs`{{md-div src="### Heading 3"}}`);
  assert.equal(this.$('div').css('display'), 'block');
  assert.equal(this.$('div > h3').length, 1);
  assert.equal(this.$('div > h3').attr('id'), 'heading3');
  assert.equal(this.$('div > h3').text().trim(), 'Heading 3');
});
