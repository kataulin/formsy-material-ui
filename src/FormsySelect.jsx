import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';
import ErrorTooltip from './ErrorTooltip';

const FormsySelect = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    errorStyle: React.PropTypes.object,
    errorTooltipStyle: React.PropTypes.object,
    inputClass: React.PropTypes.string,
    inputErrorClass: React.PropTypes.string,
    inputErrorStyle: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    requiredError: React.PropTypes.string,
    style: React.PropTypes.object,
    underlineFocusStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      hasChanged: false,
    };
  },

  handleChange(event, index, value) {
    this.setValue(value);

    this.setState({
      hasChanged: value !== '',
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  hasError() {
    if (this.isRequired() && !this.isPristine() && !this.isValid() && this.isFormSubmitted()) {
      return true;
    }
    return false;
  },

  validationColor(props = this.props) {
    return props.validationColor || '#DA0000';
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let { value } = this.props;

    const {
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      required, // eslint-disable-line no-unused-vars
      underlineStyle,
      underlineFocusStyle,
      errorTooltipStyle,
      requiredError,
      className,
      style,
      ...rest,
      } = this.props;

    value = this.state.hasChanged ? this.getValue() : value;
    const errorText = this.getErrorMessage() || this.hasError() && requiredError;
    const errorTooltipStyles = Object.assign({}, this.props.errorStyle, errorTooltipStyle);

    return (
      <div style={style} className={className}>
        <SelectField
          {...rest}
          onChange={this.handleChange}
          ref={this.setMuiComponentAndMaybeFocus}
          value={value}
          style={style}
          underlineStyle={this.hasError() ?
            { borderColor: this.validationColor() } :
            underlineStyle || { borderBottomColor: '#E0E0E0' }}
          underlineFocusStyle={this.hasError() ?
            { borderColor: this.validationColor() } :
            underlineFocusStyle || { borderBottomColor: '#00AFD2' }}
        >
          {this.props.children}
        </SelectField>
        {
          errorText ? (
            <ErrorTooltip
              style={errorTooltipStyles}
              ugStyle={{ borderRightColor: errorTooltipStyles.background || {} }}
            >
              {errorText}
            </ErrorTooltip>
          ) : ''
        }
      </div>
    );
  },
});

export default FormsySelect;
