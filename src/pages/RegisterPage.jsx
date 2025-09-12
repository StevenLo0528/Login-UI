import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../api/userApi";

function RegisterPage() {
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
    email: ""
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => register(form),
    onSuccess: () => {
      alert("註冊成功！");
      navigate("/");
    },
    onError: () => {
      alert("註冊失敗！");
    }
  });

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {["id", "username", "password", "email"].map((field) => (
        <input
          key={field}
          // password 也改成 text
          type="text"
          placeholder={field}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button onClick={() => mutation.mutate()}>完成註冊</button>
      <button className="secondary-btn" onClick={() => navigate("/")}>
        取消
      </button>
    </div>
  );
}

export default RegisterPage;
