import { join } from 'lodash';
import classNames from 'classnames';
import renderD3Graph from './renderD3Graph';

export default function graph(dataJSON) {
  const component = document.createElement('div');
  component.setAttribute('class', classNames('graph'));

  const graphSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  component.appendChild(graphSVG);

  renderD3Graph(graphSVG, dataJSON);

  return component;
}

