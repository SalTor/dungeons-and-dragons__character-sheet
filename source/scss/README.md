# D&D Character Sheet - Style Guide
For this project, we make use of the [BEM](https://en.bem.info/) CSS methodology.

In short, this makes use of a paradigm that when expressed looks like this
```scss
<button class="button button_cta"></button>

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

This enables us to easily override styles while maintaining a clear notion of what's intended. The order follows: `block_modifier` or `block__element_modifier`, where in the example above we make use of `block_modifier` with `button_cta`.