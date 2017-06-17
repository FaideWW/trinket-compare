import classNames from 'classnames';

export default function header(title) {
  const component = document.createElement('h1');
  component.setAttribute('class', classNames('title'));

  component.innerHTML = title;
  return component;
}
