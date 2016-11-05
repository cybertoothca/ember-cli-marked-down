export function initialize(application) {
  application.inject('route', 'showdown-converter', 'service:showdown-converter');
}

export default {
  name: 'showdown-converter',
  initialize
};
