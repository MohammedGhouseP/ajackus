import React, { useState, useEffect } from "react";
const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

function FilterPopup({ filters, onApply, onClear, onClose }) {
  const [local, setLocal] = useState(filters);
  useEffect(() => { setLocal(filters); }, [filters]);
  function handleChange(e) { setLocal({ ...local, [e.target.name]: e.target.value }); }
  function handleApply() { onApply(local); }
  return (
    <div className="max-w-md w-full p-4">
      <h3 className="font-bold text-lg mb-4">Filter Users</h3>
      {["firstName", "lastName", "email"].map(f =>
        <div key={f} className="mb-3">
          <label className="block text-gray-700">{f.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}</label>
          <input name={f} value={local[f]} onChange={handleChange}
            className="w-full border rounded px-3 py-2" placeholder={`Filter by ${f}`} />
        </div>
      )}
      <div className="mb-3">
        <label className="block text-gray-700">Department</label>
        <select name="department" value={local.department} onChange={handleChange}
          className="w-full border rounded px-3 py-2">
          <option value="">All departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={onClear} className="flex-1 bg-gray-500 text-white py-2 rounded">Clear All</button>
        <button onClick={onClose} className="flex-1 bg-gray-500 text-white py-2 rounded">Cancel</button>
        <button onClick={handleApply} className="flex-1 bg-blue-600 text-white py-2 rounded">Apply</button>
      </div>
    </div>
  );
}
export default FilterPopup;
