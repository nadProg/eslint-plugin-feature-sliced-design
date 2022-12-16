'use strict';

const Layer = {
  Shared: 'shared',
  Entities: 'entities',
  Features: 'features',
  Widgets: 'widgets',
  Pages: 'pages',
  Processes: 'processes',
  App: 'app',
};

const LAYERS = Object.values(Layer);

module.exports = {
  Layer,
  LAYERS,
};
