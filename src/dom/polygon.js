export default function(...args) {
  const pointList = [];
  const node = document.createElementNS('http://www.w3.org/2000/svg','polygon');

  const build = (arg) => {
    var res = [];
    for (let i = 0, l = arg.length; i < l; i++) {
      res.push(arg[i].join(','));
    }
    return res.join(' ');
  }

  const attribute = (key, val) => {
    if (val === undefined) return node.getAttribute(key);
    node.setAttribute(key, val);
  }

  const points = (...args) => {
    for (let i = 0, l = args.length; i < l; i += 2) {
      pointList.push([args[i],args[i + 1]]);
    }
    attribute('points', build(pointList));
  }

  points(...args);
  return node;
}