# Base

## Intro

The `<Base />` component is the heart of our Design System. It holds the core values of spacing and color that our design- & frontend team agreed upon.
Next to those spacing & color values, it also generates css classes for most properties most display element require to be set frequently, which are applied
via the Base component props.
The goal of this is to construct new display elements fast, easy and with a marginal amount of additional css code required.

## Usage

### Borders and paddings

We can define the spacing our components needs to take outside or inside with `margin` and `padding` props.  
These props can take up values from 0 to 10 based on a 4-points grid.  
Meaning that if `margin: 1` is `4p` then `margin: 3` is `12p`. Outside the 4-points grid `0p5` and `1p5` are accepted values,
creating a `2p` and `6p` spacing option.

For an equal spacing around the element it accepts an integer, however also different spacing values per side can be defined.

### HTML Semantics

By default a `Base` component will render a `<div />` HTML tag. We can specifiy a different HTML tag using the property `htmlTag`.

### Empty renders

By default, a `Base` component will not render anything without children.
If you want to render an empty element instead, you can set `renderEmpty` to `true`.

# Colors

Color is an essential part of human-computer interaction, and similar to other elements like typography, they define the foundations for our visual language.

## Color theory

Since there are infinite color combinations out there, it can be hard to decide what color scheme will work the best for your product.
Fortunately, we have color theory, a discipline that helps us select balanced and effective color combinations.

### Limit the total number of colors

Achieving harmony in color combinations is one of the main color theory principles.
When you create a new scheme, it might be tempting to add dozens of colors to it.
But it's better to avoid that temptation.

**Why?**  
Because it's really hard to achieve a visual balance when you use too many colors.
You can also easily overwhelm your users.

## Palette

The design system supports 11 different shades for each of 6 colors

colors: `yellow` `blue` `green` `orange` `red` `gray`

shades: `light-5` `light-4` `light-3` `light-2` `light-1` `normal` `dark-1` `dark-2` `dark-3` `dark-4` `dark-5`

### Usage

Every component that extends the `<Base>` component accepts a `bg` and a `color` prop, defining a `font-color` and a `background-color` for your component respectively.
Having these properties in place enables us to create new components with the full set of color support without writing a single additional line of css.
[Badge](?path=/docs/design-system-badge--badge#variants) is a great examples for that.

### How it works

One of the upsides of having a design system is a unified color handling. The defined set of colors is agreed on and shared with our product designer, hence by using the coloring tools of the design system
a developer will never be required to use a hardcoded hex color value.

Our color palette is defined inside the Base component. It is generating the classes responsible for font- & background-coloring by iterating over the sass maps containing the hex color values.

```
$yellowPalette: (
    light-5: #fffbdb,
    light-4: #fff8cc,
    light-3: #fff199,
    light-2: #fff4ad,
    light-1: #ffef85,
    normal: #ffeb66,
    dark-1: #d3c358,
    dark-2: #a69b46,
    dark-3: #7a7333,
    dark-4: #68622c,
    dark-5: #5a5526,
);
```

The `color($color, $shade)` function is a helpful tool to access the hex values of the palette.

```
@function color($color, $shade: 'normal') {
    @if $color == 'white' {
        @return $white;
    @if $color == 'black' {
        @return $black;
    } @else {
        @return map-get(map-get($designSystemPalette, $color), $shade);
    }
}
```
