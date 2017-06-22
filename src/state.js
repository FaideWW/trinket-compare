import {
  BEAR1T,
  BEAR3T,
  INCARNUP5T,
  INCARNDOWN5T,

  ILEVEL900,
  ILEVEL920,
  ILEVEL940,

  FILTER_SHOW,
  FILTER_HIDE,
  FILTER_EXCLUSIVE,
} from './constants';

const initialState = {
  profile: BEAR1T,
  ilevel: ILEVEL900,
  filters: {
    chest: FILTER_SHOW,
    cloak: FILTER_SHOW,
    whitelist: [],
  },
};

const subscriptions = [];

export function subscribe(cb) {
  subscriptions.push(cb);
}

function dispatchUpdate(newState) {
  subscriptions.forEach(fn => fn(newState));
}

let state = initialState;

export function getState() {
  return state;
}

export function setProfile(nextProfile) {
  if (nextProfile === state.profile) return;
  state = Object.assign({}, state, {
    profile: nextProfile,
  });

  dispatchUpdate(state);
}

export function setIlevel(nextIlevel) {
  if (nextIlevel === state.ilevel) return;
  state = Object.assign({}, state, {
    ilevel: nextIlevel,
  });

  dispatchUpdate(state);
}

export function setChestFilter(chestFilter) {
  if (chestFilter === state.filters.chest) return;
  state = Object.assign({}, state, {
    filters: Object.assign({}, state.filters, {
      chest: chestFilter,
    }),
  });
  dispatchUpdate(state);
}

export function setCloakFilter(cloakFilter) {
  if (cloakFilter === state.filters.cloak) return;
  state = Object.assign({}, state, {
    filters: Object.assign({}, state.filters, {
      cloak: cloakFilter,
    }),
  });

  dispatchUpdate(state);
}

export function addWhitelistItem(whitelistItem) {
  if (state.filters.whitelist.includes(whitelistItem)) return;
  state = Object.assign({}, state, {
    filters: Object.assign({}, state.filters, {
      whitelist: state.filters.whitelist.concat(whitelistItem),
    }),
  });

  dispatchUpdate(state);
}

export function removeWhitelistItem(whitelistItem) {
  if (!state.filters.whitelist.includes(whitelistItem)) return;
  state = Object.assign({}, state, {
    filters: Object.assign({}, state.filters, {
      whitelist: state.filters.whitelist.splice(state.filters.whitelist.indexOf(whiteListItem), 1),
    }),
  });

  dispatchUpdate(state);
}
