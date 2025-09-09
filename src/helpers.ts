/**
 * Clamps text to a maximum length and appends ellipsis if truncated
 * @param text - The text to clamp
 * @param maxLength - Maximum number of characters allowed
 * @returns The clamped text with ellipsis if needed
 */
export const clampText = (text: string, maxLength: number, ellipsis = '...'): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - ellipsis.length).trim() + ellipsis;
};
