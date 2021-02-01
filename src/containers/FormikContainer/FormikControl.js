import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import CheckboxGroup from "./CheckboxGroup";
import CustomDatePicker from "./DatePicker";
import ToggleSwitch from "./Switch";
import Color from "./Color";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "color":
      return <Color {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case "toggle":
      return <ToggleSwitch {...rest} />;
    case "date":
      return <CustomDatePicker {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
