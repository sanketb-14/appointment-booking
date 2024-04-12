import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const UsersContext = createContext();

const initialState = {
  users: [],
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
    case "users/loaded":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case "users/created":
      return {
        ...state,
        isLoading: false,

        users: [...state.users, action.payload],
        
      };
    case "users/deleted":
      return {
        isLoading: false,
        users: state.users.filter((city) => city.id !== action.payload),
        change:true
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
  const [{ users, isLoading , change }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users");
        const data = res.data;

        dispatch({
          type: "users/loaded",
          payload: data.data,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "there was error in loading data",
        });
      }
    }
    fetchUser();
  }, [isLoading]);

  async function postUser(newUser) {
    dispatch({ type: "isLoading" });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users",
        newUser
      );
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
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
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
        users,
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
