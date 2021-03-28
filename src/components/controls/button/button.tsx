// Modules
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

// Styles
import styles from './button.scss';

/**
 * Local constants
 */
export enum ButtonThemesE {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonSizesE {
  MIDDLE = 'middle',
  SMALL = 'small',
}

/**
 * Local typings
 */
interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: ButtonThemesE;
  size?: ButtonSizesE;
}

/**
 * Common button component
 */
const Button = ({
  children,
  theme = ButtonThemesE.PRIMARY,
  size = ButtonSizesE.MIDDLE,
  ...props
}: ButtonPropsI) => (
  <button styleName={classNames('common', theme, size)} {...props}>
    {children}
  </button>
);

export default CSSModules(Button, styles, { allowMultiple: true });
