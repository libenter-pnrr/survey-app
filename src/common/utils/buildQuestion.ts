import { FormElementProps } from "@application/models/Survey/FormElementProps";
import { IGetSurveyResponse } from "@application/models/Survey/ICreateSurveyPayload";
import { formElements } from "@pages/Survey/data/components";

const buildQuestion = (survey: IGetSurveyResponse): FormElementProps[] => {
  const questions: FormElementProps[] = [];
  for (const id of Object.keys(survey.schema.properties)) {
    const question = survey.schema.properties[id];
    const questionProps = formElements.find(
      (element) => element.type === id.split("__")[1]
    );

    const obj = Object.assign({
      ...questionProps,
      id,
      schema: question,
      required: survey?.schema?.required?.includes(id) || false,
      uiSchema: survey?.uiSchema?.[id] || {},
    });
    questions.push(obj);
  }
  return questions;
};

export default buildQuestion;
