# BEM React Helper

[![Travis](https://img.shields.io/travis/igoradamenko/bem-react-helper.svg)](https://travis-ci.org/igoradamenko/bem-react-helper)
[![npm](https://img.shields.io/npm/v/bem-react-helper.svg)](https://www.npmjs.com/package/bem-react-helper)

A helper making it easier to name React components according to [BEM convention](https://en.bem.info/methodology/naming-convention/).

## Explanation

There are two main entities in BEM: “blocks” and “elements”. Also there are “modifiers” that can change that ones in some ways. And there are relations between the entities — “mixes”. All of them are ruled by CSS classes, and this is where the pain come from.

There're no any native tools in React (or JSX, or even HTML and CSS) to write BEM-related code. So, developers usually write CSS classes using conditions:

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

Or in a more compact way:

```jsx
export default class Block extends Component {
  render() {
    return (
      <div className={`block ${this.props.visible ? 'block_visible' : ''} ${this.props.type ? `block_type_${this.props.type}` : ''} ${this.props.size ? `block_size_${this.props.size}` : 'block_size_m'} ${this.props.mix}`} />
    );
  }
}
```

With usage like this:

```jsx
<Block visible={true} type="primary" size="xxl" mix="block2__elem"/>
```

And it's totally fine, but it's exhausting and takes a lot of time.

This helper was built to solve the problem described above. It's created around the convention that developer should pass BEM modifiers through `mods` property, and mixes throught `mix`. So, component invoking described above can be rewritten like this:

```jsx
<Block mods={{ visible: true, type: 'primary', size: 'xxl' }} mix="block2__elem"/>
```

As you may understand, now it's quite easy to preprocess modifiers, change them, replace with default values, etc. And that's exactly what the helper does. When developer use the helper, component code usually looks like this:

```jsx
import b from 'bem-react-helper';

export default class Block extends Component {
  render() {
    return (
      <div className={b('block', this.props, { size: 'm' })} />
    );
  }
}
```

As you see, there is no any conditions at all. What we have here is the function `b` with three arguments:

- `name` — entitity name (block or element according to BEM naming); _required_;
- `props` — props object (in most cases it's exactly `props` of React component, but it also can be built from stratch as
  an object with `mods` and `mix` keys, both are optional); _default: `{}`_;
- `defaultMods` — object with default values for modifiers; _default: `{}`_.

That's all. 

Helper is a pretty smart guy. For example, you can pass mix as an array if you need to:

```jsx
<Block mods={{ visible: true, type: 'primary', size: 'xxl' }} mix={['block2__elem', 'block3']}/>
```

Or you can use camelCased modifiers that will be converted to usual for CSS kebab-case. 
For example, let's assume that we use `Block` component described above, but with these modifiers:

```jsx
<Block mods={{ visible: true, type: 'primary', size: 'xxl', buttonSize: 'x' }} mix={['block2__elem', 'block3']}/>
```

The helper will generate `className` value like this:

```
block block_visible block_type_primary block_size_xxl block_button-size_x block2__elem block3
```

Quite easy, huh?

Also, if you want to use `mods` or `mix` inside the component inself, or pass other arguments, 
the best way to do that is:

```jsx
import b from 'bem-react-helper';

export default class Block extends Component {
  render() {
    const { mix, mods = {}, ...rest } = this.props;
    
    return (
      <div className={b('block', this.props, { size: 's' })} {...rest}>
        {
          mods.type === 'primary' && (
            <span className="block__star">★</span>
          )
        }
      </div>
    );
  }
}
```

And if you use build tools like webpack, you can use plugins like [`ProvidePlugin`](https://webpack.js.org/plugins/provide-plugin/) 
to get rid of import state in every component:

```js
// somewhere in a webpack config
new webpack.ProvidePlugin({
  b: 'bem-react-helper',
})
```

## Why?

Why didn't I use 
[all](https://github.com/azproduction/b_)
[of](https://github.com/albburtsev/bem-cn)
[the](https://github.com/pocotan001/bem-classnames)
[others](https://github.com/cuzzo/react-bem)
[helpers](https://github.com/marcohamersma/react-bem-helper)
and created yet another one?
I don't like the fact that they bloat my code and make all components strongly vendored to them.
Also I believe that to write plain classes is faster than to use any wrappers around it.

So this helper solves just one problem (the main) — it removes conditions for modifiers and mixes in block's declaration.
