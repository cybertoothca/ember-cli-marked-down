import Ember from 'ember';
import ShowdownConverterInitializer from 'dummy/initializers/showdown-converter';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | showdown converter', {
  beforeEach() {
    Ember.run(function () {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function (assert) {
  ShowdownConverterInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
