# D&D Character Sheet - Style Guide
For this project, we make use of the [BEM](https://en.bem.info/) CSS methodology.

In short, this makes use of the following paradigm: `block_modifier` or `block__element_modifier`, and when expressed looks like this:
```html
<button class="button button_cta"></button>
```
In the example above we make use of `block_modifier` with `button_cta`, where our block-level element is a button. And with our modifier of `_cta` we're indicating that this is specifically a call-to-action button.

And the scss directly related to said markup would look something like this:
```scss
.button {
    background-color: none;
    border: 1px solid #eee;
    transition: all .25s ease;
    color: #eee;

    &:hover {
        background-color: #eee;
        color: white;
    }

    &_cta {
        background-color: black;
        border: 1px solid black;
        color: white;

        &:hover {
            background-color: white;
            color: white;
        }
    }
}
```

This enables us to easily override styles while maintaining a clear notion of a particular part of markup is meant to represent.