import React, { Component } from 'react';
import PropTypes from 'prop-types';
import idgen from './idgen';
import cx from 'classnames';

const classes = {
  'dropdown-content': true
};

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.idx = 'dropdown_' + idgen();
    this.instances = null;
    this.elems =[]
    this.renderTrigger = this.renderTrigger.bind(this);
  }

  componentDidMount() {
    const { options } = this.props;
    this.elems = document.querySelectorAll('.dropdown-trigger');
    this.instances = M.Dropdown.init(this.elems, options);
  }

  componentWillUnmount() {
    M(this.elems).map((i,el) => {
      var instance = M.Dropdown.getInstance(el);
      instance.destroy();
    });
  }

  render() {
    const { children, className, ...props } = this.props;
    delete props.trigger;
    delete props.options;

    return (
      <span>
        {this.renderTrigger()}
        <ul {...props} className={cx(classes, className)} id={this.idx}>
          {children}
        </ul>
      </span>
    );
  }

  renderTrigger() {
    const { trigger } = this.props;

    return React.cloneElement(trigger, {
      ref: t => (this._trigger = `[data-target=${this.idx}]`),
      className: cx(trigger.props.className, 'dropdown-trigger'),
      'data-target': this.idx
    });
  }
}

Dropdown.propTypes = {
  /**
   * The node to trigger the dropdown
   */
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Options hash for the dropdown
   * <a target="_blank" href="http://materializecss.com/dropdown.html#options">http://materializecss.com/dropdown.html</a>
   */
  options: PropTypes.shape({
    inDuration: PropTypes.number,
    outDuration: PropTypes.number,
    constrainWidth: PropTypes.bool,
    hover: PropTypes.bool,
    gutter: PropTypes.number,
    coverTrigger: PropTypes.bool,
    alignment: PropTypes.oneOf(['left', 'right'])
  })
};

export default Dropdown;
