import { FormElementProps } from "@application/models/Survey/FormElementProps";
import { formElements } from "@pages/Survey/data/components";
import { SET_QUESTIONS } from "@reducers/Survey/actions";
import { DropResult } from "react-beautiful-dnd";
import copy from "./copy";
import reorder from "./reorder";

export const onDragEnd = (
  result: DropResult,
  dispatch: React.Dispatch<any>,
  questions: FormElementProps[]
) => {
  const { source, destination } = result;
  // dropped outside the list
  if (!destination) {
    return;
  }

  switch (source.droppableId) {
    case "FORM":
      dispatch({
        type: SET_QUESTIONS,
        payload: reorder(questions, source.index, destination.index),
      });
      break;
    case "ITEMS":
      dispatch({
        type: SET_QUESTIONS,
        payload: copy(formElements, questions, source, destination),
      });
      break;
  }
};
