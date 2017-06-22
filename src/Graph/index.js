import { join } from 'lodash';
import classNames from 'classnames';
import { BEAR1T, ILEVEL940 } from '../constants';
import { makeProfileSlug } from '../util';
import renderD3Graph from './renderD3Graph';

export default function graph(dataJSON) {
  const component = document.createElement('div');
  component.setAttribute('class', classNames('graph'));

  const graphSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  component.appendChild(graphSVG);

  const debugProfile = makeProfileSlug(BEAR1T, ILEVEL940);

  renderD3Graph(graphSVG, dataJSON[debugProfile]);

  return component;
}

