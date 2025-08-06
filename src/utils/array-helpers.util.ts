export const addIdToArray = <T extends object>(arr: T[] | null | undefined, name?: string): (T & { id: string })[] => {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr.map((item, index) => ({
    ...item,
    id: `${name || 'item'}_${index + 1}`,
  }));
};

export const normalizeNulls = <T>(arr: T): T => {
  if (Array.isArray(arr)) {
    return arr.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value === null || value === undefined ? '' : value]),
      ),
    ) as T;
  }
  if (typeof arr === 'object' && arr !== null) {
    return Object.fromEntries(
      Object.entries(arr).map(([key, value]) => [key, value === null || value === undefined ? '' : value]),
    ) as T;
  }
  return arr;
};

export const arrayToMultilineString = (arr: string[]): string => {
  return arr.join('\n');
};
