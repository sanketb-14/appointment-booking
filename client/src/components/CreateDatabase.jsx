import { useState } from "react";
import { useTables } from "../context/TableContext";

function createDatabase() {
  const { isLoading, createTable } = useTables();

  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "" }]);
  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  const handleFieldNameChange = (e, index) => {
    const newFields = [...fields];
    newFields[index].name = e.target.value;
    setFields(newFields);
  };

  const handleFieldTypeChange = (e, index) => {
    const newFields = [...fields];
    newFields[index].type = e.target.value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      tableName,
      fields: Object.fromEntries(
        fields.map((field) => [field.name, { type: field.type }])
      ),
    };

    const serverData = dataToSend;
    console.log(serverData);
    await createTable(serverData);
  };
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className=" w-full flex  justify-center ">
      <form
        onSubmit={handleSubmit}
        className="w-2/3 p-8 ca bg-base-200 rounded-xl shadow-xl my-8"
      >
        <h1 className="text-2xl text-secondary font-semibold my-4">
          Create New Form
        </h1>
        <label htmlFor="tableName" className="text-primary">
          Table Name:
        </label>
        <input
          type="text"
          id="tableName"
          value={tableName}
          className="input input-sm my-2 mx-4"
          onChange={handleTableNameChange}
        />

        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              className="input input-sm mx-4"
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => handleFieldNameChange(e, index)}
            />
            <select
              className="input input-sm"
              value={field.type}
              onChange={(e) => handleFieldTypeChange(e, index)}
            >
              <option value="">Select Type</option>
              <option value="INTEGER">INTEGER</option>
              <option value="STRING">STRING</option>
              <option value="VARCHAR(255)">VARCHAR(255)</option>
            </select>
            <button
              className="btn btn-xs btn-error mx-4"
              type="button"
              onClick={() => handleRemoveField(index)}
            >
              Remove Field
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-sm btn-accent m-4"
          onClick={handleAddField}
        >
          Add Field
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default createDatabase;
