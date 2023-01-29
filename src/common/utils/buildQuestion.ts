import { FormElementProps } from "@application/models/Survey/FormElementProps";
import { IGetSurveyResponse } from "@application/models/Survey/ICreateSurveyPayload";
import { formElements } from "@pages/Survey/data/components";

const buildQuestion = (survey: IGetSurveyResponse): FormElementProps[] => {
  const questions: FormElementProps[] = [];
  for (const id in survey.schema.properties) {
    const question = survey.schema.properties[id];
    const questionProps = formElements.find(
      (element) => element.type === id.split("__")[1]
    );
    Object.assign(questionProps, {
      id,
      schema: question,
      required: survey?.schema?.required?.includes(id),
      uiSchema: survey?.uiSchema?.[id] || {},
    });

    questions.push(questionProps);
  }
  return questions;
};

export default buildQuestion;
