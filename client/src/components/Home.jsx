import Form from "./Form";
import ListUser from "./ListUser";
import { useUsers } from "../context/UsersContext";
import Loader from "./Loader";


export default function Home() {
  const { tableData, isLoading, deleteUser, } = useUsers();



  if (isLoading) return <Loader />;
  

  return (
    <main className="hero min-h-screen bg-base-100 flex flex-col sm:flex-row w-full">
      <Form />
      <ul className="flex flex-col justify-center w-full items-center">
        {tableData.map((user) => (
          <ListUser key={user.id} user={user} deleteUser={deleteUser} />
        ))}
      </ul>
    </main>
  );
}
