var b = require('./index');

describe('bem-react-helper', function() {
  it('should return an empty string when no arguments given', function() {
    expect(b()).toEqual('');
  });

  it('should return block name when only one argument given', function() {
    expect(b('block')).toEqual('block');
  });

  it('should return block name with mix when mix is given', function() {
    expect(b('block', {
      mix: 'block2__elem'
    })).toEqual('block block2__elem');
  });

  it('should return block name without mix when mix is given as empty string', function() {
    expect(b('block', {
      mix: ''
    })).toEqual('block');
  });

  it('should return block name without mix when mix is given as empty array', function() {
    expect(b('block', {
      mix: []
    })).toEqual('block');
  });

  it('should return block name with mix when mix is given as array', function() {
    expect(b('block', {
      mix: ['block2__elem', 'block3']
    })).toEqual('block block2__elem block3');
  });

  it('should return block name with mods when mods is given', function() {
    expect(b('block', {
      mods: {
        mod1: true,
        mod2: 'val',
        mod3: false
      }
    })).toEqual('block block_mod1 block_mod2_val');
  });

  it('should return block name without mods when mods is given as empty object', function() {
    expect(b('block', {
      mods: {}
    })).toEqual('block');
  });

  it('should return block name with mods & mix when mods & mix are given', function() {
    expect(b('block', {
      mods: {
        mod1: true,
        mod2: 'val',
        mod3: false
      },
      mix: ['block2', 'block3']
    })).toEqual('block block_mod1 block_mod2_val block2 block3');
  });

  it('should return block name with mods & mix & default mods when all of them are given', function() {
    expect(b('block', {
      mods: {
        mod1: true
      },
      mix: ['block2', 'block3']
    }, {
      mod2: 'def-val',
      mod3: true
    })).toEqual('block block_mod1 block_mod2_def-val block_mod3 block2 block3');
  });

  it('should return block name with mods & mix & default mods when all of them are given and mods have keys from default mods', function() {
    expect(b('block', {
      mods: {
        mod1: true,
        mod2: 'custom-val'
      },
      mix: ['block2', 'block3']
    }, {
      mod2: 'def-val',
      mod3: true
    })).toEqual('block block_mod1 block_mod2_custom-val block_mod3 block2 block3');
  });

  it('should return elem name with mods & mix & default mods when all of them are given', function() {
    expect(b('block__elem', {
      mods: {
        mod1: true,
        mod2: 'custom-val'
      },
      mix: ['block2', 'block3']
    }, {
      mod2: 'def-val',
      mod3: true
    })).toEqual('block__elem block__elem_mod1 block__elem_mod2_custom-val block__elem_mod3 block2 block3');
  });
});
