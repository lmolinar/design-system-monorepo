# Flex

## Intro

Flexbox layout aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word "flex").

The main idea behind the flex layout is to give the container the ability to alter its items’ width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space or shrinks them to prevent overflow.

Most importantly, the flexbox layout is direction-agnostic as opposed to the regular layouts (block which is vertically-based and inline which is horizontally-based). While those work well for pages, they lack flexibility (no pun intended) to support large or complex applications (especially when it comes to orientation changing, resizing, stretching, shrinking, etc.).

&mdash; Chris Coyier

## Usage

Our `<Flex>` component extends the `<Base>` component, adding classes that handle basic flex-container properties.

### justify-content

```
"flex-start", "flex-end", "center", "space-between", "space-around", "initial", "inherit"
```

### align-items

```
"stretch", "center", "flex-start", "flex-end", "baseline", "initial", "inherit"
```

### flex-direction

```
"row", "column", "row-reverse", "column-reverse"
```

### flex-wrap

```
 "wrap", "nowrap", "wrap-reverse"
```

### gap

```
"gap", "row-gap", "column-gap"
```
