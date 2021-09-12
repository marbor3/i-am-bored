import { useCallback, useRef } from "react";
import { ACTION_CHANGE_CATEGORY } from "../../state/DashboardReducer";
import { useDashboardContext } from "../../state/DashboardState";

export default function Filters() {
  const [{ categoriesOptions, currentCategory }, dispatch] =
    useDashboardContext();
  const selectRef = useRef(null);
  const changeCategory = useCallback(() => {
    const categoryId = selectRef.current.value;

    dispatch({
      type: ACTION_CHANGE_CATEGORY,
      payload: {
        id: categoryId,
      },
    });
  }, []);

  return (
    <>
      <label>Filters:</label>
      <select onChange={changeCategory} ref={selectRef}>
        {categoriesOptions.map(({ label, value }) => {
          return (
            <option
              key={value}
              value={value}
              defaultValue={currentCategory === value}
            >
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
}
