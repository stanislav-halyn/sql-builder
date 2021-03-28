// Modules
import React, { ReactNode } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './search-condition-text.scss';

/**
 * Local typings
 */
interface SearchConditionTextPropsI {
  children: ReactNode;
  styleName?: string;
  className?: string;
}

/**
 * Search condition text component with default styles
 */
const SearchConditionText = ({ children, className }: SearchConditionTextPropsI) => (
  <span styleName="common" className={className}>
    {children}
  </span>
);

export default CSSModules(SearchConditionText, styles);
