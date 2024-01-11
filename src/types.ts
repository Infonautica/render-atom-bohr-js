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

export type DataItem = ChemElement | ElementRange | null;
export type Data = DataItem[][];
