import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(token),
    enabled: !!token
  });

  if (isLoading) return <p style={{ color: "white" }}>Loading users...</p>;
  if (error) return <p style={{ color: "white" }}>取得使用者列表失敗</p>;

  return (
    <div className="auth-container">
      <h2>所有使用者</h2>
      <table style={{ width: "100%", color: "white", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <th align="left">ID</th>
            <th align="left">Username</th>
            <th align="left">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #333" }}>
              <td>{user.id}</td>
              <td>{user.name}</td> {/* 修正：從 user.username 改為 user.name */}
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="secondary-btn" style={{ marginTop: "15px" }} onClick={() => navigate("/welcome")}>
        返回
      </button>
    </div>
  );
}

export default UsersPage;
