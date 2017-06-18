import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { max } from 'd3-array';
import { stack } from 'd3-shape';
import { axisTop, axisLeft } from 'd3-axis';

const CONTAINER_WIDTH = 960;
const BAR_HEIGHT = 10;

const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 20;
const MARGIN_LEFT = 40;
const MARGIN_RIGHT = 20;

const COLOR_ARRAY = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'];

export default function renderD3Graph(svgSelector, dataCSV) {
  const svg = select(svgSelector);
  const [header, ...data] = dataCSV;


  const width = CONTAINER_WIDTH - MARGIN_TOP - MARGIN_BOTTOM;
  const height = data.length * (BAR_HEIGHT);
  const containerHeight = height + MARGIN_LEFT + MARGIN_RIGHT;

  svg
    .attr('width', CONTAINER_WIDTH)
    .attr('height', containerHeight);

  const g = svg.append('g').attr('transform', `translate(${MARGIN_LEFT},${MARGIN_TOP})`);

  const y = scaleBand()
    .rangeRound([height, 0])
    .paddingInner(0.05)
    .align(0.1);

  const x = scaleLinear()
    .rangeRound([0, width]);

  const z = scaleOrdinal()
    .range(COLOR_ARRAY);

  const ilevels = header.slice(1);

  x.domain([0, max(data, d => max(d.slice(1)))]).nice();
  y.domain(data.map(d => d[0]));
  z.domain(ilevels);

  g.append('g')
    .selectAll('g')
    .data(stack().keys(ilevels)(data))
    .enter().append('g')
      .attr('fill', d => z(d[0]))
    .selectAll('rect')
    .data((d) => { console.log(d); return d; })
    .enter().append('rect')
      .attr('x', d => x(d[1]))
      .attr('y', d => y(d[0]))
      .attr('width', d => x(d[1]) - x(d[0]))
      .attr('height', d => y.bandwidth());

  g.append('g')
      .attr('class', 'axis')
      .call(axisTop(x).ticks(null, 's'));

  g.append('g')
      .attr('class', 'axis')
      .call(axisLeft(y))
    .append('text')
      .attr('x', x(x.ticks().pop()) + 0.5)
      .attr('y', 2)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('DPS');

  const legend = g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
    .selectAll('g')
    .data(ilevels.slice().reverse())
    .enter().append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  legend.append('rect')
    .attr('x', width - 19)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', z);

  legend.append('text')
    .attr('x', width - 24)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d);

}
