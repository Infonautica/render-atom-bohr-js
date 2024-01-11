# Simple-periodic-table-data

A small package that provides necessary data and utils to construct periodic table of elements. Based on the data from https://github.com/ACollectionOfAtoms/atomic-bohr-model

## Documentation

### Data getters

Package provides following functions to get the data:

```ts
// To get structured data for the whole table, including empty cells and element ranges
export declare const getData: () => Data;

// To get a specific element by it's periodic number
export declare function getChemElement(periodicNumber: number): ChemElement;
```

### Types

When you need the whole structured table, you need to operate with `Data` type.
It's a two dimensional collection that has individual elements, ranges (like lanthanoids) and empty cells:

```ts
export type DataItem = ChemElement | ElementRange | null;
export type Data = DataItem[][];
```

Each data item can be on of the followign types or `null`:

```ts
export type ChemElement = {
  type: "element";
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  wikiSummary: string;
  wikiUrl: string;
  electronConfig: number[];
  series: ElementSeries;
};

export type ElementRange = {
  type: "range";
  numberFrom: number;
  numberTo: number;
  series: ElementSeries;
};

export type ElementSeries =
  | "alkali-metals"
  | "alkaline-earth-metals"
  | "lanthanoids"
  | "actinoids"
  | "transition-metals"
  | "post-transition-metals"
  | "metalloids"
  | "reactive-nonmetals"
  | "noble-gases"
  | "none";
```
