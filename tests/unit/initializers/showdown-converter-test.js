import Application from '@ember/application';
import { run } from '@ember/runloop';
import ShowdownConverterInitializer from 'dummy/initializers/showdown-converter';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | showdown converter', function(hooks) {
  hooks.beforeEach(function() {
    run(function () {
      application = Application.create();
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  test('it works', function (assert) {
    ShowdownConverterInitializer.initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
