import React, { useState, useEffect } from "react";

const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

function UserForm({ user, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", department: "" });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (user) setForm({ ...user });
  }, [user]);

  function validate() {
    const e = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.department) e.department = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold mb-2">{user ? "Edit User" : "Add New User"}</h2>
      <div>
        <label className="block text-gray-700 mb-1">First Name *</label>
        <input name="firstName" value={form.firstName} onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.firstName && "border-red-500"}`} disabled={loading} />
        {errors.firstName && <span className="text-red-600">{errors.firstName}</span>}
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Last Name *</label>
        <input name="lastName" value={form.lastName} onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.lastName && "border-red-500"}`} disabled={loading} />
        {errors.lastName && <span className="text-red-600">{errors.lastName}</span>}
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Email *</label>
        <input name="email" type="email" value={form.email} onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.email && "border-red-500"}`} disabled={loading} />
        {errors.email && <span className="text-red-600">{errors.email}</span>}
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Department *</label>
        <select name="department" value={form.department} onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.department && "border-red-500"}`} disabled={loading}>
          <option value="">Select department</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.department && <span className="text-red-600">{errors.department}</span>}
      </div>
      <div className="flex gap-2 pt-4">
        <button type="button" className="flex-1 bg-gray-600 text-white py-2 rounded" onClick={onCancel} disabled={loading}>Cancel</button>
        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? "Saving..." : (user ? "Update" : "Add")}</button>
      </div>
    </form>
  );
}
export default UserForm;
