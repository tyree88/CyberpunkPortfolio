import { writable } from 'svelte/store';

// Store for current section
export const currentSection = writable<string>('about');

// Store for navigation history
export const navigationHistory = writable<string[]>([]);

// Function to navigate to a section and update history
export function navigateTo(section: string): void {
  // Get current section to add to history
  let current: string = 'about'; // Initialize with default value
  
  // Get the actual current section
  const unsubscribe = currentSection.subscribe(value => {
    current = value;
  });
  unsubscribe();
  
  // Only add to history if we're navigating to a different section
  if (current !== section) {
    navigationHistory.update(history => {
      // Add current section to history
      return [...history, current];
    });
  }
  
  // Update current section
  currentSection.set(section);
}

// Function to go back to previous section
export function goBack(): boolean {
  let history: string[] = [];
  
  // Get current navigation history
  const unsubscribe = navigationHistory.subscribe(value => {
    history = value;
  });
  unsubscribe();
  
  // If history is empty, return false
  if (history.length === 0) {
    return false;
  }
  
  // Get last section from history
  const previousSection = history[history.length - 1];
  
  // Update current section
  currentSection.set(previousSection);
  
  // Remove last item from history
  navigationHistory.update(history => history.slice(0, -1));
  
  return true;
}
