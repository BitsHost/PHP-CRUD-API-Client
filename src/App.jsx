import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import TableList from "./components/TableList";
import DataGrid from "./components/DataGrid";
import "./App.css";

function AdminApp() {
  const { user, logout } = useAuth();
  const [selectedTable, setSelectedTable] = useState(null);

  if (!user) return <LoginForm />;
  return (
    <div className="admin-app">
      <header>
        <h1>Admin Panel</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <div style={{ display: "flex" }}>
          <TableList onSelect={setSelectedTable} />
          <DataGrid table={selectedTable} />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  );
}