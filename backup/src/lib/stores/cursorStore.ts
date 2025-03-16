import { writable } from 'svelte/store';

// Store for cursor position
type CursorPosition = {
  x: number;
  y: number;
};

export const cursorPosition = writable<CursorPosition>({ x: 0, y: 0 });
