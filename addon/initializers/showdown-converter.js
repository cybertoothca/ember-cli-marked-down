export function initialize(application) {
  application.inject('component', 'showdown-converter', 'service:showdown-converter');
  application.inject('controller', 'showdown-converter', 'service:showdown-converter');
  application.inject('helper', 'showdown-converter', 'service:showdown-converter');
  application.inject('model', 'showdown-converter', 'service:showdown-converter');
  application.inject('route', 'showdown-converter', 'service:showdown-converter');
}

export default {
  name: 'showdown-converter',
  initialize,
};
