import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const UsersContext = createContext();

const initialState = {
  tableName: "",
  tableData: [],
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
    case "users/tableName":
      return {
        ...state,
        isLoading: false,
        tableName: action.payload,
      };
    case "users/loaded":
      return {
        ...state,

        isLoading: false,

        tableData: action.payload,
      };
    case "users/created":
      return {
        ...state,
        isLoading: false,

        tableData: [...state.tableData, action.payload],
      };
    case "users/deleted":
      return {
        isLoading: false,
        tableData: state.tableData.filter((item) => item.id !== action.payload),
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

function UsersProvider({ children }) {
  const [{ tableName, tableData, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getTableData(newTableName) {
    dispatch({ type: "isLoading" });
    try {
      dispatch({ type: "users/tableName", payload: newTableName });
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/${newTableName}`
      );
      dispatch({type: "isLoading"})

      dispatch({ type: "users/loaded", payload: res.data.tableData });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "there was an error loading data",
      });
    }
  }

  async function postUser(newUser) {
    dispatch({ type: "isLoading" });
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/${tableName}`,
        newUser
      );
        dispatch({ type: "isLoading" });
      dispatch({
        type: "users/created",
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error creating user",
      });
    }
  }
  async function deleteUser(id) {
    dispatch({ type: "isLoading" });
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/users/${tableName}/${id}`
      );
      dispatch({ type: "users/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error creating user",
      });
    }
  }

  return (
    <UsersContext.Provider
      value={{
        tableName,
        tableData,
        getTableData,
        isLoading,
        postUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

const useUsers = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error("Unable to find user");
  }

  return context;
};
export { UsersProvider, useUsers };
