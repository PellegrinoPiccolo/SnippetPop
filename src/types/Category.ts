import type { Snippet } from "./Snippet";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  snippets?: Snippet[];
}