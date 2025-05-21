import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import RecordForm from "./RecordForm";

export default function DataGrid({ table }) {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  function fetchRows(page = 1) {
    apiRequest({ action: "list", table, page })
      .then(r => {
        setRows(r.data);
        setMeta(r.meta);
      })
      .catch(e => setError(e.message));
  }

  useEffect(() => {
    if (table) fetchRows();
  }, [table]);

  if (!table) return null;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="datagrid">
      <h3>{table} (page {meta.page || 1})</h3>
      <button onClick={() => setEditing({})}>Add Row</button>
      <table>
        <thead>
          <tr>
            {rows[0] && Object.keys(rows[0]).map(col =>
              <th key={col}>{col}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row =>
            <tr key={row.id || JSON.stringify(row)}>
              {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
              <td>
                <button onClick={() => setEditing(row)}>Edit</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {editing &&
        <RecordForm
          table={table}
          row={editing}
          onSuccess={() => {
            setEditing(null);
            fetchRows(meta.page || 1);
          }}
          onClose={() => setEditing(null)}
        />}
      <div>
        {meta.pages > 1 && [...Array(meta.pages).keys()].map(i =>
          <button key={i} onClick={() => fetchRows(i + 1)}>{i + 1}</button>
        )}
      </div>
    </div>
  );
}