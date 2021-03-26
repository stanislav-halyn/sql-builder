// Utils
import { NonExistError } from './error.utils';

/**
 * Checks if the given index exists
 */
const checkIndexExists = <T>(arr: T[], index: number) => {
  if (arr.length <= index) {
    throw new NonExistError(`This index doesn't exist!`);
  }
};

/**
 * Add an item to the end of the array
 */
export const addArrayItem = <T>(arr: T[], item: T) => [...arr, item];

/**
 * Updates array item by the given index
 */
export const updateArrayItem = <T>(arr: T[], index: number, item: Partial<T>): T[] => {
  checkIndexExists(arr, index);

  const newItem = {
    ...arr[index],
    ...item,
  };
  const newArr = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];

  return newArr;
};

/**
 * Removes array item by the given index
 */
export const removeArrayItem = <T>(arr: T[], index: number): T[] => {
  checkIndexExists(arr, index);

  const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];

  return newArr;
};
