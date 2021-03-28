// Modules
import React, { SelectHTMLAttributes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './select.scss';

/**
 * Local typings
 */
interface SelectPropsI<T extends object> extends SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
}

/**
 * Common select component with predefined styles
 */
const Select = <T extends object>({ options, getLabel, getValue, ...props }: SelectPropsI<T>) => (
  <select styleName="common" {...props}>
    {options.map(option => (
      <option key={`options-${getValue(option)}`} value={getValue(option)}>
        {getLabel(option)}
      </option>
    ))}
  </select>
);

export default CSSModules(Select, styles);
