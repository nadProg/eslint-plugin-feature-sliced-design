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

const UnderLayers = {
  [Layer.Shared]: [Layer.Shared],
  [Layer.Entities]: [Layer.Entities, Layer.Shared],
  [Layer.Features]: [Layer.Entities, Layer.Shared],
  [Layer.Widgets]: [Layer.Features, Layer.Entities, Layer.Shared],
  [Layer.Pages]: [Layer.Widgets, Layer.Features, Layer.Entities, Layer.Shared],
  [Layer.Processes]: [Layer.Pages, Layer.Widgets, Layer.Features, Layer.Entities, Layer.Shared],
  [Layer.App]: [Layer.Processes, Layer.Pages, Layer.Widgets, Layer.Features, Layer.Entities, Layer.Shared],
};

module.exports = {
  Layer,
  LAYERS,
  UnderLayers,
};
