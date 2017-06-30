const b = require('./index.js');

describe('bem-react-helper', () => {
  it('should return an empty string when no arguments given', () => {
    expect(b()).toEqual('');
  });

  it('should return block name when only one argument given', () => {
    expect(b('block')).toEqual('block');
  });

  it('should return block name with mix when mix is given', () => {
    const props = {
      mix: 'block2__elem'
    };

    expect(b('block', props)).toEqual('block block2__elem');
  });

  it('should return block name without mix when mix is given as empty string', () => {
    const props = {
      mix: ''
    };

    expect(b('block', props)).toEqual('block');
  });

  it('should return block name without mix when mix is given as empty array', () => {
    const props = {
      mix: []
    };

    expect(b('block', props)).toEqual('block');
  });

  it('should return block name with mix when mix is given as array', () => {
    const props = {
      mix: ['block2__elem', 'block3']
    };

    expect(b('block', props)).toEqual('block block2__elem block3');
  });

  it('should return block name with mods when mods is given', () => {
    const props = {
      mods: {
        mod1: true,
        mod2: 'val',
        mod3: false
      }
    };

    expect(b('block', props)).toEqual('block block_mod1 block_mod2_val');
  });

  it('should return block name without mods when mods is given as empty object', () => {
    const props = {
      mods: {}
    };

    expect(b('block', props)).toEqual('block');
  });

  it('should return block name with mods & mix when mods & mix are given', () => {
    const props = {
      mods: {
        mod1: true,
        mod2: 'val',
        mod3: false
      },
      mix: ['block2', 'block3']
    };

    expect(b('block', props)).toEqual('block block_mod1 block_mod2_val block2 block3');
  });

  it('should return block name with mods & mix & default mods when all of them are given', () => {
    const props = {
      mods: {
        mod1: true
      },
      mix: ['block2', 'block3']
    };
    const defaultMods = {
      mod2: 'def-val',
      mod3: true
    };

    expect(b('block', props, defaultMods)).toEqual('block block_mod2_def-val block_mod3 block_mod1 block2 block3');
  });

  it('should return block name with mods & mix & default mods when all of them are given and mods have keys from default mods', () => {
    const props = {
      mods: {
        mod1: true,
        mod2: 'custom-val'
      },
      mix: ['block2', 'block3']
    };
    const defaultMods = {
      mod2: 'def-val',
      mod3: true
    };

    expect(b('block', props, defaultMods)).toEqual('block block_mod3 block_mod1 block_mod2_custom-val block2 block3');
  });

  it('should return elem name with mods & mix & default mods when all of them are given', () => {
    const props = {
      mods: {
        mod1: true,
        mod2: 'custom-val'
      },
      mix: ['block2', 'block3']
    };
    const defaultMods = {
      mod2: 'def-val',
      mod3: true
    };

    expect(b('block__elem', props, defaultMods)).toEqual('block__elem block__elem_mod3 block__elem_mod1 block__elem_mod2_custom-val block2 block3');
  });

  it('should return block name with mods when some of them has number values or keys', () => {
    const props = {
      mods: {
        1: true,
        mod: 2
      }
    };
    const defaultMods = {
      3: 4
    };

    expect(b('block', props, defaultMods)).toEqual('block block_3_4 block_1 block_mod_2');
  });

  it('should set modifier if defaultMods set & mods object is same (should not change original mods object)', () => {
    const props = {
      mods: {}
    };
    const defaultModsFirst = {
      open: false
    };
    const defaultModsSecond = {
      open: true
    };

    expect(b('block', props, defaultModsFirst)).toEqual('block');
    expect(b('block', props, defaultModsSecond)).toEqual('block block_open');
  });
});
