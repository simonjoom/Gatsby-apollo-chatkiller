import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ProgressBar = ({ progress, className, variant, valueBuffer, color }) => {
  let style;
  const classes = {
    indeterminate: progress === undefined,
    determinate: !!progress
  };
  if (progress) {
    style = {
      width: progress + '%'
    };
  }
  const inlineStyles = { bar2: {} };
  const dashedClass = cx('dashed', {
    dashedColorPrimary: color === 'primary',
    dashedColorSecondary: color === 'secondary'
  });
  const bar2ClassName = cx('bar', {
    barcolorPrimary: color === 'primary' && variant === 'buffer',
    barcolorSecondary: color === 'secondary' && variant === 'buffer',
    bar2Buffer: variant === 'buffer'
  });
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      inlineStyles.bar2.transform = `scaleX(${(valueBuffer || 0) / 100})`;
    }
  }

  return (
    <div
      className={cx('progress lighten-5', className)}
      style={variant === 'buffer' ? { backgroundColor: 'transparent' } : {}}
    >
      {variant === 'buffer' ? <div className={dashedClass} /> : null}
      <div className={cx(classes, className)} style={style} />
      {variant === 'buffer' ? (
        <div className={bar2ClassName} style={inlineStyles.bar2} />
      ) : null}
    </div>
  );
};

ProgressBar.defaultProps = {
  color: 'primary',
  variant: 'indeterminate'
};
ProgressBar.propTypes = {
  className: PropTypes.string,
  /**
   * A number between 0..100 that indicates the current progress,
   * when provided, a determinate bar with the progress is displayed,
   * otherwise a indeterminate bar is shown
   */
  progress: PropTypes.number
};

export default ProgressBar;
