import { join } from 'lodash';
import classNames from 'classnames';
import renderD3Graph from './renderD3Graph';

export default function graph(dataCSV) {
  const component = document.createElement('div');
  component.setAttribute('class', classNames('graph'));

  const graphSVG = document.createElement('svg');
  component.appendChild(graphSVG);

  renderD3Graph(graphSVG, dataCSV);

  // console.log(dataCSV);

  return component;
}

