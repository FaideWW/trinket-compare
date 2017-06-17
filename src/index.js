import main from './App';
import header from './Header';
import graph from './Graph';
import dataCSV from '../data/test_data.csv';
const app = main(
  header("Guardian Druid DPS Trinket Guide"),
  graph(dataCSV),
);

document.body.appendChild(app);
