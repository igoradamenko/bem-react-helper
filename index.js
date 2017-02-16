'use strict';

module.exports = function(name, props, defaultMods) {
  if (!name) return '';

  props = props || {};
  defaultMods = defaultMods || {};

  var mods = props.mods || {};
  var mix = props.mix;
  var result = [name];

  for (var key in defaultMods) {
    if (!mods.hasOwnProperty(key)) mods[key] = defaultMods[key];
  }

  for (var key in mods) {
    if (mods[key]) {
      var mod = [name, camelToKebab(key)];

      if (typeof mods[key] !== 'boolean') {
        mod.push(camelToKebab(mods[key]));
      }

      result.push(mod.join('_'));
    }
  }

  if (mix) {
    if (Array.isArray(mix)) {
      mix.forEach(function(item) {
        result.push(item);
      });
    } else {
      result.push(mix);
    }
  }

  return result.join(' ');
};

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
