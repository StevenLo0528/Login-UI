import { useMutation } from "@tanstack/react-query";
import { deleteUser, updateUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function WelcomePage() {
  const navigate = useNavigate();
  let userData = {};
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  }

  // 設定 newName 的初始值為從 localStorage 讀取到的 username
  const [newName, setNewName] = useState(userData.username || "");

  // 刪除目前登入帳號
  const deleteMutation = useMutation({
    // 修正：傳入正確的欄位名稱 user_ID
    mutationFn: () => deleteUser({ user_ID: userData.userId }),
    onSuccess: () => {
      alert("帳號已刪除");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/");
    },
    onError: () => {
      alert("刪除帳號失敗");
    }
  });

  // 修改目前登入帳號 username
  const updateMutation = useMutation({
    // 修正：傳入正確的欄位名稱 Id 和 name
    mutationFn: () => updateUser({ Id: userData.userId, name: newName }),
    onSuccess: () => {
      alert("名稱修改成功");
      // 更新 localStorage 的 userData
      const updatedUserData = { ...userData, username: newName };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      navigate(0); // 重新整理頁面顯示新名稱
    },
    onError: () => {
      alert("名稱修改失敗");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>
        Welcome 🎉 {userData.username || "Guest"}
        <br />
        {userData.email}
      </h2>

      {/* 1. 查看所有使用者 */}
      <button
        className="secondary-btn"
        style={{ marginTop: "10px" }}
        onClick={() => navigate("/users")}
      >
        查看使用者
      </button>

      {/* 2. 登出 */}
      <button style={{ marginTop: "10px" }} onClick={handleLogout}>
        登出
      </button>

      {/* 3. 修改 username */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="輸入新名稱"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={() => updateMutation.mutate()}>修改 Username</button>
      </div>

      {/* 4. 刪除帳號 */}
      <button
        style={{ marginTop: "10px", backgroundColor: "red" }}
        onClick={() => deleteMutation.mutate()}
      >
        刪除帳號
      </button>
    </div>
  );
}

export default WelcomePage;