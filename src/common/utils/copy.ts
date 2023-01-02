import { DraggableLocation } from "react-beautiful-dnd";
import { FormElementProps } from "../../pages/Survey/types";
import { v4 as uuid } from "uuid";
/**
 * Moves an item from one list to another list.
 */
export default function copy(
  source: FormElementProps[],
  destination: FormElementProps[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): FormElementProps[] {
  const sourceClone = [...source];
  const destClone = [...destination];
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
}
