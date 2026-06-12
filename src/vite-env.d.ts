/// <reference types="vite/client" />

declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.jsx" {
  import type { ComponentType } from "react";

  export const Model: ComponentType<Record<string, unknown>>;
}
