import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const TablesContext = createContext();

const initialState = {
  tables: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "tables/loaded":
      return {
        ...state,
        isLoading: false,
        tables: action.payload,
      };
    case "tables/created":
      return {
        ...state,
        isLoading: false,
        tables: [...state.tables, action.payload],
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return "unknown action type";
  }
}

function TablesProvider({ children }) {
  const [{ tables, isLoading }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchTable() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/tables");
        const data = res.data;
        dispatch({ type: "isLoading" });

        dispatch({
          type: "tables/loaded",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "there was error in loading data",
        });
      }
    }
    fetchTable();
  }, [isLoading]);

  async function createTable(newTable) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tables/create",
        newTable
      );
      dispatch({ type: "isLoading" });
      dispatch({ type: "tables/created", payload: res.data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error creating user",
      });
    }
  }

  return (
    <TablesContext.Provider value={{ tables, isLoading, createTable }}>
      {children}
    </TablesContext.Provider>
  );
}

const useTables = () => {
  const context = useContext(TablesContext);

  if (context === undefined) {
    throw new Error("Unable to find table");
  }

  return context;
};
export { TablesProvider, useTables };
