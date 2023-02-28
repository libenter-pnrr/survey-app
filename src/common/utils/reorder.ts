import { FormElementProps } from "@application/models/Survey/FormElementProps";

// a little function to help us with reordering the result
export default function reorder(
  list: FormElementProps[],
  startIndex: number,
  endIndex: number
): FormElementProps[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
