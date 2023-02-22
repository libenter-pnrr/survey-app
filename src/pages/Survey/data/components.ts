import { FormElementProps } from "@application/models/Survey/FormElementProps";
import {
  AlternateEmail,
  CalendarMonth,
  CheckBox,
  Filter9,
  FormatListBulleted,
  Link,
  Notes,
  RadioButtonChecked,
  TextFields,
} from "@mui/icons-material";

export const formElements: FormElementProps[] = [
  {
    id: "1",
    type: "text",
    icon: TextFields,
    schema: {
      type: "string",
      title: "Text Input",
      description: "Una descrizione del campo",
    },
  },
  {
    id: "2",
    type: "number",
    icon: Filter9,
    schema: {
      type: "number",
      title: "Number Input",
      description: "",
    },
  },
  {
    id: "3",
    type: "email",
    icon: AlternateEmail,
    schema: {
      type: "string",
      format: "email",
      title: "Email Input",
      description: "",
    },
  },
  {
    id: "4",
    type: "textarea",
    icon: Notes,
    schema: {
      type: "string",
      title: "Text Area",
      description: "Una descrizione del campo",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
  {
    id: "5",
    type: "radio",
    icon: RadioButtonChecked,
    schema: {
      type: "string",
      title: "Radio Select",
      description: "Una descrizione del campo",
      oneOf: [
        {
          const: "1",
          title: "one",
        },
        {
          const: "2",
          title: "two",
        },
        {
          const: "3",
          title: "three",
        },
      ],
    },
    uiSchema: {
      "ui:widget": "radio",
    },
  },
  {
    id: "6",
    type: "select",
    icon: FormatListBulleted,
    schema: {
      type: "string",
      title: "Select",
      description: "Una descrizione del campo",
      oneOf: [
        {
          const: "1",
          title: "one",
        },
        {
          const: "2",
          title: "two",
        },
        {
          const: "3",
          title: "three",
        },
      ],
    },
    uiSchema: {},
  },
  {
    id: "7",
    type: "url",
    icon: Link,
    schema: {
      type: "string",
      title: "URL",
      format: "uri",
      description: "Inserire un url valido (es. https://www.google.com)",
    },
    uiSchema: {},
  },
  {
    id: "8",
    type: "date",
    icon: CalendarMonth,
    schema: {
      type: "string",
      title: "Data",
      format: "date",
    },
    uiSchema: {},
  },
];
