// Modules
import { useState, useCallback } from 'react';

// Utils
import { addArrayItem, updateArrayItem, removeArrayItem } from '@utils/array.utils';

/**
 * This hook provides logic for CRUD managing of array field
 */
export const useArrayFields = <Entity extends object>({
  initialState,
  getInitialEntity,
}: {
  initialState: Entity[];
  getInitialEntity: () => Entity;
}) => {
  const [items, setItems] = useState(initialState);

  const addItem = useCallback(() => {
    setItems(oldConditions => addArrayItem(oldConditions, getInitialEntity()));
  }, [setItems, getInitialEntity]);

  const updateItem = useCallback(
    (index: number, newValue: Partial<Entity>) => {
      setItems(oldConditions => updateArrayItem(oldConditions, index, newValue));
    },
    [setItems]
  );

  const removeItem = useCallback(
    (index: number) => {
      setItems(oldConditions => removeArrayItem(oldConditions, index));
    },
    [setItems]
  );

  const resetItems = useCallback(() => {
    setItems(initialState);
  }, [setItems, initialState]);

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    resetItems,
  };
};
