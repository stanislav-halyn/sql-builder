// Utils
import { addArrayItem, updateArrayItem, removeArrayItem } from '../array.utils';
import { NonExistError } from '../error.utils';

describe('array.utils.ts', () => {
  it('`addArrayItem` should work correctly', () => {
    const arr = [{ name: 'foo' }];
    const item = { name: 'bar' };

    const result = addArrayItem(arr, item);
    const expectedResult = [{ name: 'foo' }, { name: 'bar' }];

    expect(result).toEqual(expectedResult);
  });

  describe('`updateArrayItem` should work correctly', () => {
    it('when updating an item', () => {
      const arr = [
        { item: 'bar', id: 0 },
        { item: 'foo', id: 1 },
      ];
      const index = 1;
      const item = { item: 'foo-bar' };

      const result = updateArrayItem(arr, index, oldItem => ({ ...oldItem, ...item }));
      const expectedResult = [
        { item: 'bar', id: 0 },
        { item: 'foo-bar', id: 1 },
      ];

      expect(result).toEqual(expectedResult);
    });

    it('when updating non existing index', () => {
      const arr = [{ foo: 'bar' }];

      const updateNonExistingIndex = () => {
        updateArrayItem(arr, 1, oldItem => ({ ...oldItem, foo: 'foo' }));
      };

      expect(updateNonExistingIndex).toThrowError(NonExistError);
    });
  });

  describe('`removeArrayItem` should work correctly', () => {
    it('when removing an item', () => {
      const arr = [
        { item: 'bar', id: 0 },
        { item: 'foo', id: 1 },
      ];
      const index = 1;

      const result = removeArrayItem(arr, index);
      const expectedResult = [{ item: 'bar', id: 0 }];

      expect(result).toEqual(expectedResult);
    });

    it('when removing nonexistent index', () => {
      const arr = [{ foo: 'bar' }];

      const removeNonExistingIndex = () => {
        removeArrayItem(arr, 1);
      };

      expect(removeNonExistingIndex).toThrowError(NonExistError);
    });
  });
});
