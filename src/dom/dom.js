const createSvg = (tagName, props) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

  // Add properties to element
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}

const createElement = (tagName, props) => {
  const element = document.createElement(tagName);

  // Add properties to element
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      element[key] = value;
    });
  }

  return element;
}

export const removeNode = (container, node) => {
  if (container.contains(node)) container.removeChild(node);
}

export const element = (tagName, props, children) => {
  const element = tagName === 'svg' || tagName === 'polygon' ? 
    createSvg(tagName, props) :
    createElement(tagName, props);

  // Add children to element
  if (children) {
    const childrenNodes = children.map((child) => {
      if (typeof child === 'string') {
        return document.createTextNode(child);
      }
  
      return child;
    });
    childrenNodes.forEach((child) => element.appendChild(child));
  }
  return element;
}