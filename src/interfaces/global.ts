import { CSSProperties } from "react";

export interface Styles {
  [selector: string]: CSSProperties;
}
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
