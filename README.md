# BEM React Helper

[![Travis](https://img.shields.io/travis/igoradamenko/bem-react-helper.svg)](https://travis-ci.org/igoradamenko/bem-react-helper)
[![npm](https://img.shields.io/npm/v/bem-react-helper.svg)](https://www.npmjs.com/package/bem-react-helper)

A helper making it easier to name React components according to [BEM convention](https://en.bem.info/methodology/naming-convention/).

## Examples

Before:

```jsx
export default class Block extends Component {
  render() {
    return (
      <div className={`block ${this.props.visible ? 'block_visible' : ''} ${this.props.type ? `block_type_${this.props.type}` : ''} ${this.props.size ? `block_size_${this.props.size}` : 'block_size_m'} ${this.props.mix}`} />
    );
  }
}
```

Or:

```jsx
export default class Block extends Component {
  render() {
    const classes = ['block'];
    
    if (this.props.visible) classes.push('block_visible');
    if (this.props.type) classes.push(`block_type_${this.props.type}`);
    if (this.props.size) {
      classes.push(`block_size_${this.props.size}`);
    } else {
      classes.push('block_size_m');
    }
    if (this.props.mix) classes.push(this.props.mix);
    
    return (
      <div className={classes.join(' ')} />
    );
  }
}
```

With usage like this:

```jsx
<Block visible={true} type="primary" size="xxl" mix="block2__elem"/>
```

After:

```jsx
import b from 'bem-react-helper';

export default class Block extends Component {
  render() {
    return (
      <div className={b('block', this.props, { size: s })} />
    );
  }
}
```

With usage like this:

```jsx
<Block mods={{visible: true, type: 'primary', size: 'xxl'}} mix="block2__elem"/>
```

You also can pass mix as an array:

```jsx
<Block mods={{visible: true, type: 'primary', size: 'xxl'}} mix={['block2__elem', 'block3']}/>
```

And if you want to use mods or mix in a body of component, or pass other arguments, the best way to do that is:

```jsx
import b from 'bem-react-helper';

export default class Block extends Component {
  render() {
    const { mix, mods = {}, ...rest } = this.props;
    
    return (
      <div className={b('block', this.props, { size: s })} {...rest}>
        {
          mods.type === 'primary' &&
          (
            <span className="block__star">★</span>
          )
        }
      </div>
    );
  }
}
```

## Why?

Why didn't I use 
[all](https://github.com/azproduction/b_)
[of](https://github.com/albburtsev/bem-cn)
[others](https://github.com/cuzzo/react-bem)
[hel](https://github.com/pocotan001/bem-classnames)[pers](https://github.com/marcohamersma/react-bem-helper)
and created yet another one?
They bloat code but don't do anything useful.
Also I believe that write plain classes is faster than use any wrappers around it.

So this helper solves just one problem (the main, I think) — it removes conditions for modifiers and mixes in block's declaration.
