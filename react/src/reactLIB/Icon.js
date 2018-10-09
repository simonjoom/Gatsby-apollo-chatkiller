import React from 'react';
import PropTypes from 'prop-types';
import constants from './constants';
import cx from 'classnames';

class Icon extends React.Component {
  static defaultProps = {
    type: 'awesome'
  };
  render() {
    const awesome = this.props.type == 'awesome';
    const classes = {
      fa: awesome,
      'material-icons': !awesome
    };
    constants.PLACEMENTS.forEach(p => {
      classes[p] = this.props[p];
    });
    constants.ICON_SIZES.forEach(s => {
      classes[s] = this.props[s];
    });
    return (
      <i
        style={this.props.style}
        className={cx(classes, awesome ? 'fa-' + this.props.className : '')}
      >
        {!awesome && this.props.className}
      </i>
    );
  }
}

Icon.propTypes = {
  type: PropTypes.string,
  /*
   * Classname passed to i tag
   */
  className: PropTypes.string,
  /*
   * Icon type: <a href='https://material.io/icons/'>https://material.io/icons/</a>
   */
  children: PropTypes.string,
  /*
   * Placement for icon if used beside a text ↓
   */
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  /*
   * Sizes for icons ↓
   */
  tiny: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool
};

export default Icon;
