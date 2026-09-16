import type { Operator } from "./Operator";

export interface Strat {
  map: string;
  slug: string;
  name: string;
  operators: Operator[];
}
