function ListUser({ user , deleteUser }) {
  

  function handleClick(e) {
    e.preventDefault();
    deleteUser(user.id);
  }

  return (
    <li className="card mx-2 card-compact w-full shadow-xl border-b-2 border-accent  ">
      <div className="mx-2 card-body text-primary flex w-full flex-row justify-center items-center ">
        <div className="card-title">{user.name}</div>
        <p className="text-secondary">{user.email}</p>
        <p>{user.phone}</p>
       
        <div className="btn btn-sm btn-secondary">Edit</div>
        <div
          className="btn btn-sm btn-accent "
          onClick={(e) => handleClick(e)}
        >
          Delete
        </div>
      </div>
    </li>
  );
}

export default ListUser;
