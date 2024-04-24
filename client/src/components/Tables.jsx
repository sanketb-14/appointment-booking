import { Link } from "react-router-dom";
import SingleTable from "./SingleTable";

import { useTables } from "../context/TableContext";
import Loader from "./Loader";

function Tables() {
  const { isLoading, tables } = useTables();
  if (isLoading) return <Loader/>
  return (
    <div className="drawer w-1/5 h-screen  flex  min-h-full bg-base-200 flex-col ">
      <ul className="menu text-primary p-4  ">
        {tables.status === "success" &&
          tables.data.tableNames.map((table, index) => (
            <SingleTable name={table} key={index} />
          ))}
        <Link to="/create-database" className=" mt-8 btn btn-accent">
          Create New Database
        </Link>
      </ul>
    </div>
  );
}

export default Tables;
