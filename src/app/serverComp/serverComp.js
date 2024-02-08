import { Suspense } from "react";

const apiUrl = 'http://localhost:3001/users';
async function loadUsers() {
    const res = await fetch(apiUrl);
    return res.json();
  }
async function ServerComp() {
    const users = await loadUsers()
  return (
    <div>
        {users.map(user => (
          <div key={user.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <div className="text-xl font-semibold mb-2">User {user.id}</div>
              <div className="text-gray-600">Email: {user.email}</div>
              <div className="text-gray-600">Password: {user.password}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ServerComp