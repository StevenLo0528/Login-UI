import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      // 新增：儲存 API 回傳的完整使用者資料，包含 username 和 userId
      localStorage.setItem("userData", JSON.stringify(data)); 
      alert("登入成功！");
      navigate("/welcome");
    },
    onError: () => {
      alert("登入失敗，請檢查帳號或密碼！");
    }
  });

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => mutation.mutate()}>登入</button>
      <button className="secondary-btn" onClick={() => navigate("/register")}>
        註冊
      </button>
    </div>
  );
}

export default LoginPage;