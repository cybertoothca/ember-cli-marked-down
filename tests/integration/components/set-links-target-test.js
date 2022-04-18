import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

import { find, findAll, render } from '@ember/test-helpers';

module('Integration | Component | set links target', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.includes = ['helper:marked-down'];
  });

  test('when the yield does not include any links', async function (assert) {
    await render(hbs`
      <SetLinksTarget>
        {{marked-down "### Heading 3"}}
      </SetLinksTarget>
    `);
    assert.equal(find('.set-links-target').innerHTML.trim(), '<h3 id="heading3">Heading 3</h3>');
  });

  test('when the yield link(s) have target set to _top', async function (assert) {
    await render(hbs`
      <SetLinksTarget @targetValue="_top">
        {{marked-down "[Some Link](http://github.com)"}}
      </SetLinksTarget>
    `);
    assert.dom('a').hasAttribute('target', '_top');
    assert.dom('a').hasNoAttribute('rel');
  });

  test('when the yields link(s) do not have a target value, _blank is added', async function (assert) {
    await render(hbs`
      <SetLinksTarget>
        {{marked-down "[Some Link](http://github.com)"}}
      </SetLinksTarget>
    `);
    assert.dom('a').hasAttribute('target', '_blank');
    assert.dom('a').hasAttribute('rel', 'noopener noreferrer');
  });

  test('when excludeSelfLinks is false, the target is applied to local links', async function (assert) {
    await render(hbs`
      <SetLinksTarget @excludeSelfLinks?={{false}}>
        {{marked-down "[Some Link](http://localhost:7357/some/path)"}}
      </SetLinksTarget>
    `);
    assert.dom('a').hasAttribute('target', '_blank');
    assert.dom('a').hasAttribute('rel', 'noopener noreferrer');
  });

  test('when excludeSelfLinks defaults to true, the target is not applied to such links', async function (assert) {
    this.set('origin', window.document.location.origin);
    await render(hbs`
      <SetLinksTarget>
        {{marked-down (concat "[Some Link](" origin "/some/path)")}}
      </SetLinksTarget>
    `);
    assert.dom('a').hasNoAttribute('target');
    assert.dom('a').hasNoAttribute('rel');
  });

  test('when excludeSelfLinks is explicitly set to true, the target is not applied to such links', async function (assert) {
    this.set('origin', window.document.location.origin);
    await render(hbs`
      <SetLinksTarget @excludeSelfLinks?={{true}}>
        {{marked-down (concat "[Some Link](" origin "/some/path)")}}
      </SetLinksTarget>
    `);
    assert.dom('a').hasNoAttribute('target');
    assert.dom('a').hasNoAttribute('rel');
  });

  test('when the target is set for one of several links', async function (assert) {
    this.set('origin', window.document.location.origin);
    await render(hbs`
      <SetLinksTarget>
        {{marked-down (concat "[Some Link That Opens In Same Tab](" origin "/some/path) [Another Link That Will Open In A New Tab](https://github.com/cybertoothca/ember-cli-marked-down)")}}
      </SetLinksTarget>
    `);
    assert.dom('a').hasNoAttribute('target');
    assert.dom('a').hasNoAttribute('rel');
    assert.dom(findAll('a')[1]).hasAttribute('target', '_blank');
    assert.dom(findAll('a')[1]).hasAttribute('rel', 'noopener noreferrer');
  });
});
