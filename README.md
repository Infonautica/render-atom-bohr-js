# Render-atom-bohr-js

A tool to render animated SVG Atom [Bohr Model](https://en.wikipedia.org/wiki/Bohr_model)

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
    minimum: number; // In seconds, default is 6
    maximum: number; // In seconds, default is 15
  };
  animated?: boolean; // Default "true"
};
```
