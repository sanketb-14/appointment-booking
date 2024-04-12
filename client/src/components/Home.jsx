import Form from "./Form";
import ListUser from "./ListUser"
import { useUsers } from "../context/UsersContext";


export default function Home() {
  const { users, isLoading , deleteUser } = useUsers();
  

  if(isLoading) return <h1>Loading...</h1>

  return (
    <main className="hero min-h-screen bg-base-100 flex flex-col sm:flex-row w-full">
      <h1 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-secondary m-4 absolute top-0 left-0 sm:left-60">
        Appointment Booking App
      </h1>
      <Form />
      <ul className="flex flex-col justify-center w-full items-center">
        {users.map((user) => 
            
            
          <ListUser  key={user.id} user={user} deleteUser={deleteUser}  />
        )}
      </ul>
    </main>
  );
}
 
