import React from "react";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function UserList({ users, onEdit, onDelete, onSort, sortConfig }) {
  function sortIcon(key) {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.asc
      ? <FaSortUp className="text-blue-600" />
      : <FaSortDown className="text-blue-600" />;
  }
  if (!users.length)
    return <div className="text-gray-500 text-center py-8">No users found.</div>;
  return (
    <div className="bg-white rounded shadow border my-6 overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {["id", "firstName", "lastName", "email", "department"].map(col =>
              <th
                key={col}
                className="py-3 px-6 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-blue-50"
                onClick={() => onSort(col)}
              >
                <span className="flex items-center gap-1 capitalize">{col}{sortIcon(col)}</span>
              </th>
            )}
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="py-2 px-6">{u.id}</td>
              <td className="py-2 px-6">{u.firstName}</td>
              <td className="py-2 px-6">{u.lastName}</td>
              <td className="py-2 px-6">{u.email}</td>
              <td className="py-2 px-6">{u.department}</td>
              <td className="py-2 px-6">
                <button className="mr-2 text-blue-600 hover:text-blue-800" onClick={() => onEdit(u)} title="Edit"><FaEdit /></button>
                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(u.id)} title="Delete"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserList;
