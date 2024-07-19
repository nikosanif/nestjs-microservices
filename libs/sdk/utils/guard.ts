export class Guard {
  /**
   * Checks if value is empty. Accepts strings, numbers, booleans, objects and arrays.
   */
  static isEmpty(value: unknown): boolean {
    if (typeof value === 'number' || typeof value === 'boolean') return false;

    if (typeof value === 'undefined' || value === null) return true;

    if (value instanceof Date) return false;

    if (value instanceof Object && !Object.keys(value).length) return true;

    if (Array.isArray(value)) {
      if (value.length === 0) return true;
      if (value.every(item => Guard.isEmpty(item))) return true;
    }

    if (value === '') return true;

    return false;
  }
}
