// UserGrid.js
import React, { useState, useEffect, useContext } from "react";
import DataGridStyle from "./DataGridStyle";
import { UserContext } from "@/services/userContext";

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const { user, fetchUsers } = useContext(UserContext);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  useEffect(() => {
    const fetchUsersLocal = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersLocal();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridStyle
        rows={users.map((user, index) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        }))}
        columns={columns}
        pageSize={5}
        autoHeight
        checkboxSelection={false}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default UserGrid;
