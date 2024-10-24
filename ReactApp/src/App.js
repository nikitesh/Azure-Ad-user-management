
import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import axios from 'axios';

const App = () => {
  const { instance, accounts } = useMsal();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      }).then(response => {
        fetchUsersAndRoles(response.accessToken);
      });
    }
  }, [accounts, instance]);

  const fetchUsersAndRoles = async (accessToken) => {
    try {
      const userResponse = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUsers(userResponse.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddRole = async (userId, roleId) => {
    // API call to add role
  };

  const handleDeleteRole = async (userId, roleId) => {
    // API call to delete role
  };

  const handleEditRole = async (userId, roleId) => {
    // API call to edit role
  };

  return (
    <div>
      <h1>User Role Management</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.displayName}</td>
              <td>{user.roles.join(", ")}</td>
              <td>
                <button onClick={() => handleAddRole(user.id, "newRoleId")}>Add Role</button>
                <button onClick={() => handleEditRole(user.id, "newRoleId")}>Edit Role</button>
                <button onClick={() => handleDeleteRole(user.id, "roleIdToRemove")}>Delete Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
