import { isArray } from 'lodash';
import classNames from 'classnames';

export default function main(...children) {
  const component = document.createElement('div');
  component.setAttribute('class', classNames('container'));

  if (isArray(children)) {
    if (children.length === 1 && isArray(children[0])) {
      children[0].forEach(c => component.appendChild(c));
    } else {
      children.forEach(c => component.appendChild(c));
    }
  } else {
    component.appendChild(children);
  }

  return component;
}
