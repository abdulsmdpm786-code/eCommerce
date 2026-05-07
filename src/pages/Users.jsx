import React, { useState, useEffect, useContext } from "react";
import Axios_Api from "../Api/api";
import { AuthContext } from "../Auth/AuthContext";
import { UserPlus, Pencil, Trash2, X, Shield, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentUser, setCurrentUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await Axios_Api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [isAdmin, navigate]);

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    setCurrentUser(user);
    if (mode === "edit" && user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // Don't show existing password
        role: user.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (modalMode === "add") {
        await Axios_Api.post("/users", formData, config);
      } else if (modalMode === "edit" && currentUser) {
        // If password is empty during edit, don't send it
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await Axios_Api.put(`/users/${currentUser._id}`, updateData, config);
      }
      handleCloseModal();
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(`Error ${modalMode}ing user:`, err);
      alert(`Failed to ${modalMode} user: ${err.response?.data?.errMsg || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await Axios_Api.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers(); // Refresh list
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };

  if (!isAdmin) return null; // Or a restricted access message

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="text-indigo-400" />
              User Management
            </h1>
            <p className="mt-2 text-slate-400">
              Manage system users and their roles
            </p>
          </div>
          <button
            onClick={() => handleOpenModal("add")}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30"
          >
            <UserPlus size={18} />
            <span>Add New User</span>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          /* Users Table */
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-slate-300 text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-medium">Name</th>
                    <th className="py-4 px-6 font-medium">Email</th>
                    <th className="py-4 px-6 font-medium">Role</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-200">{user.name}</div>
                        </td>
                        <td className="py-4 px-6 text-slate-300">{user.email}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                              user.role === "admin"
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                : "bg-teal-500/10 text-teal-400 border-teal-500/20"
                            }`}
                          >
                            {user.role === "admin" ? <Shield size={12} /> : null}
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleOpenModal("edit", user)}
                              className="p-1.5 text-slate-400 hover:text-indigo-400 bg-white/5 hover:bg-indigo-500/10 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <h3 className="text-xl font-semibold text-white">
                  {modalMode === "add" ? "Add New User" : "Edit User"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">
                      Password {modalMode === "edit" && <span className="text-xs text-slate-500 font-normal">(Leave empty to keep current)</span>}
                    </label>
                    <input
                      type="password"
                      name="password"
                      required={modalMode === "add"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                    >
                      <option value="user" className="bg-slate-800 text-white">User</option>
                      <option value="admin" className="bg-slate-800 text-white">Admin</option>
                    </select>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg hover:shadow-indigo-500/25"
                    >
                      {modalMode === "add" ? "Create User" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
