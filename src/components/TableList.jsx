import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function TableList({ onSelect }) {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest({ action: "tables" })
      .then(setTables)
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="error">{error}</div>;
  return (
    <div className="table-list">
      <h3>Tables</h3>
      <ul>
        {tables.map(tbl => (
          <li key={tbl} onClick={() => onSelect(tbl)}>{tbl}</li>
        ))}
      </ul>
    </div>
  );
}