const fs = require('fs');
const { forEach, map, mapValues, size } = require('lodash');

function getIlevels(data) {
  const ilevels = {};
  forEach(data.trinkets, (trinket) => {
    Object.keys(trinket.results).forEach((result) => {
      ilevels[result] = true;
    });
  });

  return Object.keys(ilevels).map(Number);
}

function getTrinketNames(data) {
  return Object.keys(data.trinkets);
}

function getStackData(data, ilevels) {
  return map(data.trinkets, (trinket, trinketName) => {
    const relativeTrinketValues = {};
    let lastValue = 0;

    ilevels.forEach((ilevel) => {
      if (trinket.results[ilevel] !== undefined) {
        relativeTrinketValues[ilevel] = trinket.results[ilevel] - lastValue;
        lastValue = trinket.results[ilevel];
      } else {
        relativeTrinketValues[ilevel] = 0;
      }
    });

    return Object.assign(
      { fullName: trinketName },
      trinket,
      relativeTrinketValues
    );
  });
}

function getMaxDPS(data, baselineDPS = 0) {
  let maxDPS = 0;

  forEach(data.trinkets, (trinket) => forEach(trinket.results, (result) => {
    if (result > maxDPS) {
      maxDPS = result;
    }
  }));

  return maxDPS;
}

function makeNumber(v, fallback) {
  const n = Number(v);

  return isNaN(n) ? fallback : n;
}

const inputfile = process.argv[2];

if (inputfile === undefined) {
  console.error('No input file given');
  process.exit(1);
}

const input = JSON.parse(fs.readFileSync(inputfile, 'utf8'));
console.log(input);

const ilevels = getIlevels(input);
const trinketNames = getTrinketNames(input);
const stacks = getStackData(input, ilevels);
const maxDPS = getMaxDPS(input);
const trinketCount = size(input.trinkets);

const data = { ilevels, trinketNames, stacks, maxDPS, trinketCount, data: input };

fs.writeFileSync('data/generated_data.json', JSON.stringify(data));
console.log('Finished');
