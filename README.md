# Render-atom-bohr-js

A tool to render animated SVG Atom [Bohr Model](https://en.wikipedia.org/wiki/Bohr_model):

https://github.com/Infonautica/render-atom-bohr-js/assets/5521648/bec02a35-dbea-480e-872c-155fd697be18

## Installation

Install it as a dependency using your package manager (npm, yarn, etc.):

```sh
yarn add render-atom-bohr-js
```

## How to use

Import package in your code:

```ts
import { renderAtom } from "render-atom-bohr-js";
```

Create a container in your markup with a unique selector. Beware that the content of the container will be erased before rendering:

```html
<div id="atom"></div>
```

Run the function with desired configuration:

```ts
animateAtom({
  elementPeriodicNumber: newState.selectedElementId,
  containerSelector: ".atom",
});
```

## Configuration

Rendering supports some basic configuration, see `RenderAtomOptions` type for a reference:

```ts
export type RenderAtomOptions = {
  containerSelector: string; // An id, class or any selector of the container that will contain svg
  elementPeriodicNumber: number; // 1-118. Number of the element from periodic table
  animationDuration?: {
    minimum: number; // Default 6
    maximum: number; // Default 15
  };
  animated?: boolean; // Default "true"

  // Different atoms have different visual size, so we can toggle behavior.
  //
  // When the property is TRUE:
  // - SVG has fixed viewBox
  // - Small atoms occupy little space
  // - Big atoms occupy lots of space
  //
  // When the property is FALSE:
  // - SVG has dynamic viewBox, based on the size of the atom
  // - Small and big atoms occupy all available space
  //
  // By default it's set to false
  fixedViewBox?: boolean;
};
```
