// Modules
import React, { ReactNode } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './search-condition-wrapper.scss';

/**
 * Local typings
 */
interface SearchConditionWrapperPropsI {
  children: ReactNode;
  className?: string;
  styleName?: string;
}

/**
 * Search condition wrapper for common stylings
 */
const SearchConditionWrapper = ({ children, className }: SearchConditionWrapperPropsI) => (
  <div styleName="common" className={className}>
    {children}
  </div>
);

export default CSSModules(SearchConditionWrapper, styles);
