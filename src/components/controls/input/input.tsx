// Modules
import React, { InputHTMLAttributes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './input.scss';

/**
 * Local typings
 */
interface InputPropsI extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Common input component with predefined styles
 */
const Input = (props: InputPropsI) => <input styleName="common" {...props} />;

export default CSSModules(Input, styles);
