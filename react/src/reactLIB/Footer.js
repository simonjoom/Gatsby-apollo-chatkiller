import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'; 

class Footer extends Component {
  render() {
    const {
      children,
      className,
      copyrights,
      links,
      moreLinks,
      ...props
    } = this.props;

    let classes = {
      'page-footer': true
    };

    return (
      <footer className={cx(classes,"md-grid", className)} {...props}>
        <div className="md-grid">
          <div className="md-cell md-cell--6-phone md-cell--6 post md-cell--8-tablet">
              {children}
          </div>
          <div className="md-cell md-cell--2-desktop-offset md-cell--6-tablet-offset md-cell--4-phone md-cell--4 post md-cell--4-tablet">
              {links} 
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            {copyrights}
            {moreLinks}
          </div>
        </div>
      </footer>
    );
  }
}
Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  copyrights: PropTypes.string,
  links: PropTypes.node,
  moreLinks: PropTypes.node
};

export default Footer;
