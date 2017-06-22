import main from './App';
import header from './Header';
import graph from './Graph';
import dataJSON from '../data/generated_data.json';
import renderD3Graph from './Graph/renderD3Graph';
import {
  subscribe,
  getState,
  setProfile,
  setIlevel,
  setChestFilter,
  setCloakFilter,
  addWhitelistItem,
  removeWhitelistItem,
} from './state';
import { BEAR1T, BEAR3T } from './constants';

const appMountId = 'app';
const app = main(
  header("Guardian Druid DPS Trinket Guide"),
  graph(dataJSON),
);

document.getElementById(appMountId).appendChild(app);


function handleStateUpdates(newState) {
  console.log('state change', newState);
}

subscribe(handleStateUpdates);

setProfile(BEAR3T);
setProfile(BEAR1T);

