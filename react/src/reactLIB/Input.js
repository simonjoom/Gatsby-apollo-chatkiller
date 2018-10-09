import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import idgen from './idgen';
import constants from './constants';
import Icon from './Icon';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || props.defaultValue,
      checked: !!props.checked
    };

    this._onChange = this._onChange.bind(this);
    this.getMultipleValues = this.getMultipleValues.bind(this);
    this.isSelect = this.isSelect.bind(this);
  }

  componentDidMount() {
    if (this.isMaterialSelect()) {
      M(this.selectInput).material_select();
      M(this.selectInput).on('change', this._onChange);
    }
    if (this.isDatePicker) {
      M(this.dateInput).pickadate(this.props.options);
      M(this.dateInput).on('change', this._onChange);
    }
    if (this.isTimePicker) {
      M(this.timeInput).pickatime(this.props.options);
      M(this.timeInput).on('change', this._onChange);
    }
  }

  componentDidUpdate() {
    if (this.isMaterialSelect() && !this.props.multiple) {
      M(this.selectInput).material_select();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isMaterialSelect()) {
      this.setState(
        {
          value: nextProps.defaultValue
        },
        () => M(this.selectInput).material_select()
      );
    }
  }

  componentWillUnmount() {
    if (this.isMaterialSelect()) {
      M(this.selectInput).off('change', this._onChange);
    }
  }

  getMultipleValues({ options }) {
    if (!options) {
      return;
    }

    return Array.from(options)
      .filter(opt => opt.selected)
      .map(opt => opt.value);
  }

  _onChange(e) {
    const { onChange } = this.props;
    var types = {
      checkbox: e.target.checked,
      radio: e.target.checked,
      'select-multiple': this.getMultipleValues(e.target),
      default: e.target.value
    };
    const value = types.hasOwnProperty(e.target.type)
      ? types[e.target.type]
      : types['default'];
    if (onChange) {
      onChange(e, value);
    }

    this.setState({ value, checked: e.target.checked });
  }

  render() {
    const {
      browserDefault,
      children,
      className,
      labelClassName,
      defaultValue,
      error,
      errormessage,
      successmessage,
      label,
      multiple,
      placeholder,
      success,
      s,
      m,
      l,
      type,
      validate,
      onLabel,
      offLabel,
      inline,
      buttonIcon,
      buttonIconStart,
      size = 12,
      style = { width: '100%' },
      setRef,
      ...other
    } = this.props;
    let sizes = { s, m, l };
    this._id = this._id || this.props.id || `input${idgen()}`;
    let classes = {
      //  col: true,
      ['md-cell md-cell--' + size]: true,
      inline: type !== 'checkbox' && type !== 'radio' && inline,
      'input-field': type !== 'checkbox' && type !== 'radio' && type !== 'file',
      'file-field': type === 'file'
    };

    if (inline && style) style.width = '70%';

    constants.SIZES.forEach(size => {
      classes[size + sizes[size]] = sizes[size];
    });
    const validation =
      validate ||
      typeof success !== 'undefined' ||
      typeof error !== 'undefined';
    let inputClasses = {
      validate: validation,
      invalid: validation && !!this.state.value && !success,
      valid: validation && !!this.state.value && success,
      'browser-default': browserDefault && this.isSelect()
    };
    console.log('valid', inputClasses);
    let C, inputType;
    switch (type) {
      case 'textarea':
        C = 'textarea';
        inputClasses['materialize-textarea'] = true;
        break;
      case 'switch':
        C = 'input';
        inputType = 'checkbox';
        break;
      case 'file':
        C = 'input';
        inputClasses['file-path'] = true;
        break;
      default:
        C = 'input';
        inputType = type || 'text';
    }
    let labelClasses = {
      active: this.state.value || this.isSelect() || placeholder
    };

    let htmlLabel =
      label || inputType === 'radio' ? (
        <>
          <label
            className={cx(labelClasses, labelClassName)}
            htmlFor={this._id}
          >
            {label}
          </label>
          {this.state.value &&
            validation && (
              <span
                className="helper-text"
                data-success={success ? successmessage : null}
                data-error={!success ? errormessage : null}
              />
            )}
        </>
      ) : null;

    /* if (this.isSelect()) {
      let options =
        placeholder && !defaultValue
          ? [
              <option disabled key={idgen()}>
                {placeholder}
              </option>
            ]
          : [];
      options = options.concat(
        React.Children.map(children, child =>
          React.cloneElement(child, { key: child.props.value })
        )
      );

      return (
        <div className={cx(classes)}>
          {this.renderIcon()}
          {htmlLabel}
          <select
            {...other}
            style={style}
            multiple={multiple}
            id={this._id}
            className={cx(className, inputClasses)}
            ref={ref => (this.selectInput = ref)}
            defaultValue={defaultValue}
          >
            {options}
          </select>
        </div>
      );
    } else if (type === 'date') {
      this.isDatePicker = true;
      delete other.options;

      return (
        <div className={cx(classes)}>
          {this.renderIcon()}
          <C
            {...other}
            style={style}
            className={cx(className, inputClasses)}
            defaultValue={defaultValue}
            id={this._id}
            ref={ref => (this.dateInput = ref)}
            placeholder={placeholder}
            type="date"
          />
          {htmlLabel}
        </div>
      );
    } else if (type === 'time') {
      this.isTimePicker = true;
      delete other.options;

      return (
        <div className={cx(classes)}>
          {this.renderIcon()}
          <C
            {...other}
            style={style}
            className={cx(className, inputClasses)}
            defaultValue={defaultValue}
            id={this._id}
            ref={ref => (this.timeInput = ref)}
            placeholder={placeholder}
          />
          {htmlLabel}
        </div>
      );
    } else if (type === 'switch') {
      return (
        <div className="switch">
          <label>
            {offLabel || 'Off'}
            <input {...other} 
            style={style} onChange={this._onChange} type="checkbox" />
            <span className="lever" />
            {onLabel || 'On'}
          </label>
        </div>
      );
    } else if (type === 'file') {
      return (
        <div className={cx(classes)}>
          <div className="btn">
            <span>{label}</span>
            <C type="file" multiple={multiple} 
            style={style} {...other} />
          </div>
          <div className="file-path-wrapper">
            <C
              type="text"
              className={cx(className, inputClasses)}
              defaultValue={defaultValue}
              id={this._id}
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    } else {*/
    let defaultVal =
      inputType !== 'checkbox' && inputType !== 'radio'
        ? this.state.value
        : defaultValue;
    /*
      if (inputType === 'checkbox' || inputType === 'radio') {
        return (
          <div className={cx(classes)}>
            {this.renderIcon()}
            <C
              {...other}
              style={style}
              className={cx(className, inputClasses)}
              ref={ref => (this.input = ref)}
              id={this._id}
              checked={this.state.checked}
              onChange={this._onChange}
              placeholder={placeholder}
              type={inputType}
            />
            {htmlLabel}
          </div>
        );
      }*/

    return (
      <div className={cx(classes)}>
        {this.renderIcon()}
        <C
          {...other}
          style={style}
          className={cx(className, inputClasses)}
          defaultValue={defaultVal}
          id={this._id}
          ref={setRef}
          onChange={this._onChange}
          placeholder={placeholder}
          type={inputType}
          required={this.props.required}
        />
        {inline && buttonIcon}
        {htmlLabel}
      </div>
    );
    // }
  }
  /*
          ref={ref => (this.input = ref)}*/

  renderIcon() {
    const { icon, children, type, buttonIconStart } = this.props;
    if (icon) {
      return (
        <div className="prefix">
          <Icon type={type} className={icon} />
        </div>
      );
    } else if (buttonIconStart) {
      return <div className="prefix">{buttonIconStart}</div>;
    }
    /* } else {
      let icon = null;
      if (React.Children.count(children) === 1 && !Array.isArray(children)) {
        icon = React.Children.only(children);
      }
      return icon === null
        ? null
        : React.cloneElement(icon, { className: 'prefix' });
    }*/
  }

  isSelect() {
    return this.props.type === 'select';
  }

  isMaterialSelect() {
    return (
      this.props.type === 'select' &&
      !this.props.browserDefault &&
      typeof M !== 'undefined'
    );
  }
}

Input.propTypes = {
  s: PropTypes.number,
  m: PropTypes.number,
  l: PropTypes.number,
  inline: PropTypes.bool,
  children: PropTypes.node,
  buttonIcon: PropTypes.node,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.string,
  success: PropTypes.bool,
  /**
   * Input field type, e.g. select, checkbox, radio, text, tel, email, file
   * @default 'text'
   */
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  validate: PropTypes.bool,
  multiple: PropTypes.bool,
  browserDefault: PropTypes.bool,
  checked: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.any,
  /**
   * Value used to set a initial value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

Input.defaultProps = {
  type: 'text',
  checked: false,
  errormessage: 'Fail validation',
  successmessage: 'Good'
};

export default Input;
