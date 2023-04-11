const localStorageHelper = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    updateItem: (key, value) => {
        const existingValue = localStorageHelper.getItem(key);
        if (existingValue) {
            const updatedValue = { ...existingValue, ...value };
            localStorage.setItem(key, JSON.stringify(updatedValue));
            return updatedValue;
        }
        return null;
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
    clearAll: () => {
        localStorage.clear();
    },
};

export {
    localStorageHelper
}
