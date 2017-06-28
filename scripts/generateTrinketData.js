const fs = require('fs');
const { forEach, map, mapValues, size, reduce } = require('lodash');

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

function getSortedTrinketNames(stacks) {
  return stacks.sort((a, b) => a.totalDPS - b.totalDPS).map(stack => stack.fullName);
}

function getStackData(data, ilevels, baselineDPS = 0) {
  return map(data.trinkets, (trinket, trinketName) => {
    const relativeTrinketValues = {};
    let lastValue = 0;

    ilevels.forEach((ilevel) => {
      if (trinket.results[ilevel] !== undefined) {
        const relValue = trinket.results[ilevel] - baselineDPS;
        relativeTrinketValues[ilevel] = Math.max(relValue - lastValue, 0);
        lastValue = relValue;
      } else {
        relativeTrinketValues[ilevel] = 0;
      }
    });

    return Object.assign(
      {
        fullName: trinketName,
        totalDPS: reduce(relativeTrinketValues, ((acc, v) => acc + v), 0),
      },
      trinket,
      relativeTrinketValues,
    );
  });
}

function getMaxDPS(data, baselineDPS = 0) {
  let maxDPS = 0;

  forEach(data.trinkets, (trinket) => forEach(trinket.results, (result) => {
    const relResult = result - baselineDPS;
    if (relResult > maxDPS) {
      maxDPS = relResult;
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

const data = mapValues(input, (groupData) => {
  const baselineDPS = groupData.baselineDPS;
  const ilevels = getIlevels(groupData);
  const stacks = getStackData(groupData, ilevels, baselineDPS);
  const trinketNames = getSortedTrinketNames(stacks);
  const maxDPS = getMaxDPS(groupData, baselineDPS);
  const trinketCount = size(groupData.trinkets);

  return { ilevels, trinketNames, stacks, maxDPS, trinketCount, data: groupData, name: groupData.name };
})

fs.writeFileSync('data/generated_data.json', JSON.stringify(data));
console.log('Finished');
