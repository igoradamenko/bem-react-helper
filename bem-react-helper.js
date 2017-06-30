'use strict';

module.exports = b;
export default b;

function b(name, props = {}, defaultMods = {}) {
  const { mix, mods = {} } = props;
  const result = [name];
  const addMod = (key, value) => {
    const mod = [name, camelToKebab(key)];

    if (typeof value !== 'boolean') {
      mod.push(camelToKebab(value));
    }

    result.push(mod.join('_'));
  };

  Object.keys(defaultMods).forEach(key => {
    if (!mods.hasOwnProperty(key) && defaultMods[key]) {
      addMod(key, defaultMods[key]);
    }
  });

  Object.keys(mods).forEach(key => {
    if (mods[key]) {
      addMod(key, mods[key]);
    }
  });

  if (mix) {
    if (Array.isArray(mix)) {
      mix.forEach(item => { result.push(item); });
    } else {
      result.push(mix);
    }
  }

  return result.join(' ');
}

function camelToKebab(str) {
  return str.toString().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
