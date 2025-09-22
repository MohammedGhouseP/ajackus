import axios from "axios";
const API = "https://jsonplaceholder.typicode.com";
export const userService = {
  async getUsers() {
    const res = await axios.get(`${API}/users`);
    return res.data;
  },
  async createUser(user) {
    const res = await axios.post(`${API}/users`, user);
    return res.data;
  },
  async updateUser(id, user) {
    const res = await axios.put(`${API}/users/${id}`, user);
    return res.data;
  },
  async deleteUser(id) {
    await axios.delete(`${API}/users/${id}`);
    return true;
  }
};
