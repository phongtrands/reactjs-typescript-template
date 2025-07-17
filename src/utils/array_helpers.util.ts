export const addIdToArray = <T extends object>(arr: T[], name?: string): (T & { id: string })[] => {
  return arr.map((item) => ({
    ...item,
    id: `${name}_${Math.floor(Math.random() * 1000000000)}`,
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
