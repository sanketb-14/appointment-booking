import { useState } from "react";
import { useUsers } from "../context/UsersContext";

function Form() {
  const { postUser } = useUsers();
  

  const [formData, setFormData] = useState({
    id: new Date().toISOString(),
    name: "",
    email: "",
    phone: "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
     
    };
    await postUser(newUser)
    
    setFormData({
      id: new Date().toISOString(),
      name: "",
      email: "",
      phone: "",
     
    });
  };

  return (
    <form className="card-body w-full m-2 sm:w-2/3" onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered"
          defaultValue={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered"
          defaultValue={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          className="input input-bordered"
          defaultValue={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </div>
    </form>
  );
}

export default Form;
