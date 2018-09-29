import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from './Icon';

class Card extends Component {
  constructor(props) {
    super(props);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderReveal = this.renderReveal.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderAll = this.renderAll.bind(this);
  }

  renderTitle(title, reveal) {
    return (
      <span
        className={cx('card-title', 'grey-text', 'text-darken-4', {
          activator: reveal
        })}
      >
        {title}
        {reveal && <Icon className="ellipsis-v" right />}
      </span>
    );
  }

  renderReveal(title, reveal) {
    return (
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {title}
          <Icon className="times" right />
        </span>
        {reveal}
      </div>
    );
  }

  renderAction(actions) {
    return <div className="card-action">{actions}</div>;
  }

  renderContent(title, reveal, textClassName, children) {
    return (
      <div className={cx('card-content', textClassName)}>
        {title && this.renderTitle(title, reveal)}
        <div>{children}</div>
      </div>
    );
  }
  renderImage(imgClassName, contentImage, reveal, imgtitle, waves = 'light') {
    const classes = cx({
      'card-image': true,
      'waves-effect': waves,
      'waves-block': waves,
      [`waves-${waves}`]: waves
    });
    return (
      <div className={cx(classes, imgClassName)}>
        {contentImage}
        <span className="card-title">{imgtitle}</span>
      </div>
    );
  }
  renderAll(title, titlereveal, reveal, textClassName, children, actions) {
    return (
      <React.Fragment>
        {this.renderContent(title, reveal, textClassName, children)}
        {this.renderReveal(titlereveal, reveal)}
        {actions && this.renderAction(actions)}
      </React.Fragment>
    );
  }

  render() {
    const {
      title,
      imgtitle,
      titlereveal,
      contentImage,
      imgClassName,
      className,
      textClassName,
      actions,
      reveal,
      children,
      horizontal,
      waves,
      ...other
    } = this.props;

    const classes = {
      card: true,
      horizontal: horizontal
    };

    return (
      <div className={className}>
        <div className={cx(classes)} {...other}>
          {contentImage &&
            this.renderImage(
              imgClassName,
              contentImage,
              reveal,
              imgtitle,
              waves
            )}
          {horizontal ? (
            <div className="card-stacked">
              {this.renderAll(
                title,
                titlereveal,
                reveal,
                textClassName,
                children,
                actions
              )}
            </div>
          ) : (
            <>
              {this.renderAll(
                title,
                titlereveal,
                reveal,
                textClassName,
                children,
                actions
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.any,
  textClassName: PropTypes.string,
  reveal: PropTypes.element,
  contentImage: PropTypes.element,
  imgtitle: PropTypes.element,
  // The buttons to be displayed at the action area
  actions: PropTypes.arrayOf(PropTypes.element),
  horizontal: PropTypes.bool
};

export default Card;
