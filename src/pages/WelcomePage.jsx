import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 使用 useQuery 函式來獲取所有使用者列表
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(token),
    // 只有在 token 存在時才發送請求
    enabled: !!token,
  });

  // 如果正在載入資料，顯示 loading 狀態
  if (isLoading) {
    return <p style={{ color: "white" }}>Loading users...</p>;
  }

  // 如果有錯誤發生，顯示錯誤訊息
  if (error) {
    return (
      <div className="auth-container">
        <p>取得使用者列表失敗</p>
        <button onClick={() => navigate("/")} className="secondary-btn">
          返回登入
        </button>
      </div>
    );
  }

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>所有使用者</h2>
      <ul style={{ textAlign: "left", color: "white", listStyleType: "none", padding: 0 }}>
        {data.map((user) => (
          <li key={user.id}>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <hr style={{ borderColor: "#444" }} />
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>登出</button>
    </div>
  );
}

export default WelcomePage;


