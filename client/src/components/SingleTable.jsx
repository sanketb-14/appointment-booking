
import { FaDatabase } from "react-icons/fa";
import { useUsers } from "../context/UsersContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function SingleTable({ name }) {
  const { isLoading, getTableData,tableName } = useUsers();
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault;
    
    await getTableData(name);
    navigate('/home')
    
  }
  if(isLoading) return <Loader/>

  return (
    <li className="text-lg sm:text-xl border-l-2 border-secondary m-2">
      <button onClick={() => handleClick(name)}>
        <FaDatabase /> {name}
      </button>
    </li>
  );
}
