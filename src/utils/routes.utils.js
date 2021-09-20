function getRoutesOfLayer(bpath, layer) {
  if (layer?.method) {
    return [`${layer.method.toUpperCase()} ${bpath}`];
  }
  if (layer?.route) {
    return getRoutesOfLayer(
      bpath + split(layer.route.path),
      layer.route.stack[0],
    );
  }
  if (layer?.name === 'router' && layer?.handle?.stack) {
    let routes = [];

    layer.handle.stack.forEach((stackItem) => {
      routes = routes.concat(
        getRoutesOfLayer(bpath + split(layer.regexp), stackItem),
      );
    });

    return routes;
  }

  return [];
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing;
  }
  if (thing.fast_slash) {
    return '';
  }
  const match = thing
    .toString()
    .replace('\\/?', '')
    .replace('(?=\\/|$)', '$')
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
  return match
    ? match[1].replace(/\\(.)/g, '$1')
    : `<complex:${thing.toString()}>`;
}

export default function getRoutes(app) {
  let routes = [];

  app._router.stack.forEach((layer) => {
    routes = routes.concat(getRoutesOfLayer('', layer));
  });
  return routes;
}

export function allGetRoutes(app) {
  const isGetRoute = (path) => path.startsWith('GET ');
  const isNotRootPath = (path) => !path.endsWith('/');
  const isNotApiRoute = (path) => !path.includes('/api/');
  return getRoutes(app)
    ?.filter(isNotRootPath)
    .filter((path) => isGetRoute(path) && isNotApiRoute(path))
    .map((str) => str.replace('GET ', ''));
}
