import { Map } from "immutable";

export const ACTION_TOGGLE_FAV = "ACTION_TOGGLE_FAV";
export const ACTION_FETCH_EVENTS = "ACTION_FETCH_EVENTS";
export const ACTION_CHANGE_CATEGORY = "ACTION_CHANGE_CATEGORY";

export const createDashboardIniitalState = function () {
  return {
    categoriesOptions: [
      {
        label: "All",
        value: "",
      },
      {
        label: "Rock",
        value: "KnvZfZ7vAeA",
      },
      {
        label: "Alternative",
        value: "KnvZfZ7vAvv",
      },
      {
        label: "R&B",
        value: "KnvZfZ7vAee",
      },
      {
        label: "Classical",
        value: "KnvZfZ7vAeJ",
      },
    ],
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_FETCH_EVENTS: {
      const newState = { ...state };
      const savedFavourites = window.localStorage.getItem("events")
        ? JSON.parse(window.localStorage.getItem("events"))
        : {};
      newState.events = new Map(
        Object.assign(
          {},
          ...Array.from(action.payload.events, (event) => ({
            [event.id]: {
              ...event,
              isFavourite: !!savedFavourites[event.id],
              isVisible: true,
            },
          }))
        )
      );

      return newState;
    }
    case ACTION_TOGGLE_FAV: {
      const newState = { ...state };
      //   console.log(newState.events.get(action.payload.id));
      newState.events = newState.events.set(action.payload.id, {
        ...newState.events.get(action.payload.id),
        isFavourite: !newState.events.get(action.payload.id).isFavourite,
      });

      // local storage persistance
      const savedFavourites = window.localStorage.getItem("events")
        ? JSON.parse(window.localStorage.getItem("events"))
        : {};
      savedFavourites[action.payload.id] = newState.events.get(
        action.payload.id
      ).isFavourite;
      window.localStorage.setItem("events", JSON.stringify(savedFavourites));

      return newState;
    }
    case ACTION_CHANGE_CATEGORY: {
      const newState = { ...state };

      newState.currentCategory = action.payload.id;

      newState.events = newState.events.map((event) => {
        return {
          ...event,
          isVisible:
            newState.currentCategory !== ""
              ? event.classifications?.find((item) => item.primary).genre.id ===
                newState.currentCategory
              : true,
        };
      });

      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
