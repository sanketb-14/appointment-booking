function ListUser({ user , deleteUser }) {
  

  function handleClick(e) {
    e.preventDefault();
    deleteUser(user.id);
  }

  return (
    <li className="card mx-2 card-compact w-full sm:w-1/2 shadow-xl border-b-2 border-accent  ">
      <div className="mx-2 card-body text-primary flex w-full flex-row justify-center items-center ">
        <div className="card-title">{user.username}</div>
        <p className="text-secondary">{user.email}</p>
        <p>{user.phone}</p>
        <img
          className="w-16 h-16 rounded-2xl border-b-2 border-primary"
          src={user.userImg}
          alt={user.username}
        />
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
