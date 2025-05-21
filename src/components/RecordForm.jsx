import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function RecordForm({ table, row, onSuccess, onClose }) {
  const [form, setForm] = useState(row || {});
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest({ action: "columns", table })
      .then(setColumns)
      .catch(e => setError(e.message));
  }, [table]);

  function handleChange(e, col) {
    setForm({ ...form, [col]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (row && row.id) {
        await apiRequest({ action: "update", table, id: row.id }, "POST", form);
      } else {
        await apiRequest({ action: "create", table }, "POST", form);
      }
      onSuccess();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="record-form">
        <h4>{row && row.id ? "Edit" : "Add"} {table}</h4>
        {columns.map(col =>
          <div key={col.Field}>
            <label>{col.Field}:
              <input
                value={form[col.Field] || ""}
                onChange={e => handleChange(e, col.Field)}
                disabled={col.Extra === "auto_increment"}
              />
            </label>
          </div>
        )}
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}