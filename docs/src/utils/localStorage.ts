const localStorageHelper = {
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  updateItem: (key: string, value: any) => {
    const existingValue = localStorageHelper.getItem(key);
    if (existingValue) {
      const updatedValue = { ...existingValue, ...value };
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  clearAll: () => {
    localStorage.clear();
  },
};

export { localStorageHelper };
