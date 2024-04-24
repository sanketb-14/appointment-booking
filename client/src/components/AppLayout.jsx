
import Tables from "./Tables";
import {  Outlet } from "react-router-dom";


function AppLayout() {
  return (
    <div className="flex h-screen ">
      <Tables />
    

      <main className="flex-1 overflow-auto  p-2  ">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
