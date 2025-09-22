import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import FilterPopup from "./components/FilterPopup";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import { userService } from "./services/userService";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, asc: true });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setLoading(true);
    userService
      .getUsers()
      .then(data => {
        setUsers(data.map(user => ({
          ...user,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ").slice(1).join(" "),
          department: ["Engineering", "Marketing", "Sales", "HR", "Finance"][user.id % 5]
        })));
        setError("");
      })
      .catch(() => setError("Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = [...users];

    // Text search
    if (debouncedSearch)
      data = data.filter(u =>
        Object.values(u).some(val =>
          String(val).toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    Object.keys(filters).forEach(key => {
      if (filters[key])
        data = data.filter(
          u =>
            (u[key] || "")
              .toLowerCase()
              .includes(filters[key].toLowerCase())
        );
    });

    // Sorting
    if (sortConfig.key)
      data.sort((a, b) => {
        const v1 = a[sortConfig.key] || "";
        const v2 = b[sortConfig.key] || "";
        if (v1 < v2) return sortConfig.asc ? -1 : 1;
        if (v1 > v2) return sortConfig.asc ? 1 : -1;
        return 0;
      });

    setFiltered(data);
    setPage(1); 
  }, [users, debouncedSearch, filters, sortConfig]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pagedUsers = filtered.slice((page - 1) * perPage, page * perPage);

  function handleSave(data) {
    setLoading(true);
    if (editingUser) {
      userService
        .updateUser(editingUser.id, data)
        .then(upd => {
          setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...data } : u)));
          setShowForm(false);
          setEditingUser(null);
        })
        .catch(() => setError("Failed to update user"))
        .finally(() => setLoading(false));
    } else {
      userService
        .createUser(data)
        .then(newUser => {
          const id = Date.now();
          setUsers([{ ...newUser, id, ...data }, ...users]);
          setShowForm(false);
        })
        .catch(() => setError("Failed to add user"))
        .finally(() => setLoading(false));
    }
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;
    setLoading(true);
    userService
      .deleteUser(id)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(() => setError("Failed to delete user"))
      .finally(() => setLoading(false));
  }

  function handleSort(key) {
    setSortConfig(cfg => {
      if (cfg.key === key) return { key, asc: !cfg.asc };
      return { key, asc: true };
    });
  }

  function handleApplyFilters(f) {
    setFilters(f);
    setShowFilter(false);
  }

  function handleClearFilters() {
    setFilters({ firstName: "", lastName: "", email: "", department: "" });
    setShowFilter(false);
    setSearch("");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b py-4 px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-bold text-blue-700">User Management Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-72 px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => { setShowForm(true); setEditingUser(null); }}
          >
            Add User
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-6 px-4">
        {error && <ErrorMessage message={error} onClose={() => setError("")} />}
        {loading && <LoadingSpinner />}
        <UserList
          users={pagedUsers}
          onEdit={user => { setEditingUser(user); setShowForm(true); }}
          onDelete={handleDelete}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={setPerPage}
        />
        {showForm &&
          <Modal onClose={() => { setShowForm(false); setEditingUser(null); }}>
            <UserForm
              user={editingUser}
              onSubmit={handleSave}
              onCancel={() => { setShowForm(false); setEditingUser(null); }}
              loading={loading}
            />
          </Modal>
        }
        {showFilter &&
          <Modal onClose={() => setShowFilter(false)}>
            <FilterPopup
              filters={filters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              onClose={() => setShowFilter(false)}
            />
          </Modal>
        }
      </main>
    </div>
  );
}
export default App;
