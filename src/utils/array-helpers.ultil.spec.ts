import { addIdToArray, normalizeNulls } from './array-helpers.util';

describe('addIdToArray', () => {
  it('should add ids with default prefix "item_" when no name is provided', () => {
    const input = [{ name: 'A' }, { name: 'B' }];
    const result = addIdToArray(input);

    expect(result).toEqual([
      { name: 'A', id: 'item_1' },
      { name: 'B', id: 'item_2' },
    ]);
  });

  it('should add ids with provided prefix when name is given', () => {
    const input = [{ name: 'A' }, { name: 'B' }];
    const result = addIdToArray(input, 'custom');

    expect(result).toEqual([
      { name: 'A', id: 'custom_1' },
      { name: 'B', id: 'custom_2' },
    ]);
  });

  it('should return empty array when input is null', () => {
    const result = addIdToArray(null as any);
    expect(result).toEqual([]);
  });

  it('should return empty array when input is undefined', () => {
    const result = addIdToArray(undefined as any);
    expect(result).toEqual([]);
  });

  it('should return empty array when input is not an array', () => {
    const result = addIdToArray({} as any);
    expect(result).toEqual([]);
  });
});

describe('normalizeNulls', () => {
  it('should replace null and undefined with empty string in an array of objects', () => {
    const input = [
      { a: null, b: 1 },
      { a: undefined, b: 2 },
    ];
    const result = normalizeNulls(input);

    expect(result).toEqual([
      { a: '', b: 1 },
      { a: '', b: 2 },
    ]);
  });

  it('should replace null and undefined with empty string in a single object', () => {
    const input = { a: null, b: undefined, c: 'ok' };
    const result = normalizeNulls(input);

    expect(result).toEqual({ a: '', b: '', c: 'ok' });
  });

  it('should return the same value if input is a primitive', () => {
    expect(normalizeNulls(123)).toBe(123);
    expect(normalizeNulls('abc')).toBe('abc');
    expect(normalizeNulls(true)).toBe(true);
  });

  it('should keep non-null values unchanged', () => {
    const input = { a: 0, b: false, c: 'text' };
    const result = normalizeNulls(input);

    expect(result).toEqual({ a: 0, b: false, c: 'text' });
  });
});
