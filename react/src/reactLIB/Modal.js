import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import idgen from './idgen';
import Button from './Button';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalID = props.id || `modal_${idgen()}`;
    this.showModal = this.showModal.bind(this);
    this.createRoot();
  }

  createRoot() {
    this.modalRoot = document.createElement('div');
    document.body.appendChild(this.modalRoot);
  }

  componentDidMount() {
    const { trigger, modalOptions, open } = this.props;

    if (!trigger) {
      M(`#${this.modalID}`).modal(modalOptions);
    }

    if (open) this.showModal();
  }

  componentWillUnmount() {
    document.body.removeChild(this.modalRoot);
    this.modalRoot = null;
  }

  componentWillReceiveProps(nextProps) {
    // if the modal is not open yet
    if (!this.props.open && nextProps.open) {
      this.showModal();
      // open could be undefined
    } else if (nextProps.open === false) {
      this.hideModal();
    }
  }

  renderModalPortal() {
    const {
      actions,
      bottomSheet,
      children,
      fixedFooter,
      header,
      className,
      ...other
    } = this.props;

    delete other.modalOptions;
    delete other.trigger;

    const classes = cx(
      'modal',
      {
        'modal-fixed-footer': fixedFooter,
        'bottom-sheet': bottomSheet
      },
      className
    );

    return this.modalRoot
      ? ReactDOM.createPortal(
          <div {...other} className={classes} id={this.modalID}>
            <div className="modal-content">
              <h4>{header}</h4>
              {children}
            </div>
            <div className="modal-footer">
              {React.Children.toArray(actions)}
            </div>
          </div>,
          this.modalRoot
        )
      : null;
  }

  showModal(e) {
    if (e) e.preventDefault();
    const { modalOptions = {} } = this.props;
    M(`#${this.modalID}`).modal(modalOptions);
    M(`#${this.modalID}`).modal('open');
  }

  hideModal(e) {
    if (e) e.preventDefault();
    M(`#${this.modalID}`).modal('close');
  }

  render() {
    const { trigger } = this.props;

    return (
      <div>
        {trigger && React.cloneElement(trigger, { onClick: this.showModal })}
        {this.renderModalPortal()}
      </div>
    );
  }
}

Modal.propTypes = {
  /**
   * ModalOptions
   * Object with options for modal
   */
  modalOptions: PropTypes.shape({
    /*
     * Modal can be dismissed by clicking outside of the modal
     */
    dismissible: PropTypes.bool,
    /*
     * Opacity of modal background ( from 0 to 1 )
     */
    opacity: PropTypes.number,
    /*
     * Transition in duration
     */
    inDuration: PropTypes.number,
    /*
     * Transition out duration
     */
    outDuration: PropTypes.number,
    /*
     * Starting top style attribute
     */
    startingTop: PropTypes.string,
    /*
     * Ending top style attribute
     */
    endingTop: PropTypes.string,
    /*
     * Callback for Modal open. Modal and trigger parameters available.
     */
    ready: PropTypes.func,
    /*
     *  Callback for Modal close
     */
    complete: PropTypes.func
  }),
  /**
   * Extra class to added to the Modal
   */
  className: PropTypes.string,
  /**
   * Modal is opened on mount
   */
  open: PropTypes.bool,
  /**
   * BottomSheet styled modal
   * @default false
   */
  bottomSheet: PropTypes.bool,
  /**
   * Component children
   */
  children: PropTypes.node,
  /**
   * FixedFooter styled modal
   * @default false
   */
  fixedFooter: PropTypes.bool,
  /**
   * Text to shown in the header of the modal
   */
  header: PropTypes.string,
  /**
   * The button to trigger the display of the modal
   */
  trigger: PropTypes.node,
  /**
   * The buttons to show in the footer of the modal
   * @default <Button>Close</Button>
   */
  actions: PropTypes.node,
  /**
   * The ID to trigger the modal opening/closing
   */
  id: PropTypes.string
};

Modal.defaultProps = {
  modalOptions: {},
  fixedFooter: false,
  bottomSheet: false,
  actions: [
    <Button waves="light" modal="close" flat>
      Close
    </Button>
  ]
};

export default Modal;
