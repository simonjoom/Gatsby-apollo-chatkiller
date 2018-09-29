import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const NavItem = ({
  divider,
  children,
  href = '',
  onClick,
  waves,
  ...props
}) => {
  const mywaves = waves;
  const classes = cx({
    'card-image': true,
    'waves-effect': waves,
    'waves-block': waves,
    [mywaves]: waves
  });

  if (divider) return <li className="divider" />;
  const a = onClick ? (
    <a onClick={onClick} className={classes}>
      {children}
    </a>
  ) : (
    <a href={href} className={classes}>
      {children}
    </a>
  );
  return <li {...props}>{a}</li>;
};

NavItem.propTypes = {
  /**
   * children can be a string value or a node
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  divider: PropTypes.bool,
  href: PropTypes.string,
  /**
   * NavItem can have onClick. If it does have, href
   * will not be rendered
   */
  onClick: PropTypes.func
};

export default NavItem;
