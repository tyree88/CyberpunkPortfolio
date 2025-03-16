import { writable } from 'svelte/store';

// Store for current section
export const currentSection = writable<string>('about');
