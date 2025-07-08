export const addIdsToArray = <T extends object>(arr: T[], name?: string): (T & { id: string })[] => {
  return arr.map((item) => ({
    ...item,
    id: `${name}_${Math.floor(Math.random() * 1000000000)}`,
  }));
};
