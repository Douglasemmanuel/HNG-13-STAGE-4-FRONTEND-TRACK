// utils/stringUtils.ts

/**
 * Truncates a string if it exceeds the specified max length
 * @param str - string to truncate
 * @param maxLength - max allowed length (default 15)
 * @returns truncated string with "..." if needed
 */
export function truncateString(str: string, maxLength: number = 15): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}
