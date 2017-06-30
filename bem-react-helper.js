'use strict';

export default b;

function b(name, props, defaultMods = {}) {
  const { mix, mods = {} } = props;
  const result = [name];

  Object.keys(defaultMods).forEach(key => {
    if (!mods.hasOwnProperty(key)) mods[key] = defaultMods[key];
  });

  Object.keys(mods).forEach(key => {
    if (mods[key]) {
      const mod = [name, camelToKebab(key)];

      if (typeof mods[key] !== 'boolean') {
        mod.push(camelToKebab(mods[key]));
      }

      result.push(mod.join('_'));
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
