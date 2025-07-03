import React from "react";

import { Input, Button } from "components/commons";
import { useHistory } from "react-router-dom";

const Form = ({
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
  setDescription,
  description,
}) => {
  const history = useHistory();

  return (
    <form
      className="mb-4 flex h-3/4 w-full flex-col justify-between rounded-md border p-5 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <Input
          label="Title"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter description"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4 self-end">
        <Button
          buttonText="Cancel"
          style="secondary"
          onClick={() => history.push("/")}
        />
        <Button
          buttonText={type === "create" ? "Submit" : "Update Post"}
          loading={loading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default Form;
