import main from './App';
import header from './Header';
import graph from './Graph';
import dataJSON from '../data/generated_data.json';
import renderD3Graph from './Graph/renderD3Graph';

const appMountId = 'app';

const app = main(
  header("Guardian Druid DPS Trinket Guide"),
  graph(dataJSON),
);

document.getElementById(appMountId).appendChild(app);


