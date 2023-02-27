// const data = readLocalStorage<MyData>('myData');
export const readLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`Error parsing item from localstorage: ${error}`);

        return null;
      }
    }

    return null;
  } else {
    return null
  }
};

// writeLocalStorage<MyData>('myData', data);
export const writeLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing item to localStorage: ${error}`);
  }
};

// deleteLocalStorage('myData');
export const deleteLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting item from localStorage: ${error}`);
  }
};
