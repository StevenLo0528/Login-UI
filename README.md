# 登入介面專案

這是一個使用 **Vite + React + JavaScript** 建立的簡易登入介面專案。此專案透過 **TanStack Query** 和 **React Router** 串接後端 API，實現使用者註冊、登入與資料顯示等基本功能。

[cite_start]此專案為一個採用輕量級 **MVC** 架構的簡易使用者介面，提供基本的註冊與登入 API [cite: 2]。

## 功能特色

- [cite_start]**使用者註冊**：提供 ID（可選）、使用者名稱、密碼與電子郵件欄位，實現新帳號建立功能 [cite: 4, 8, 9, 10, 11]。
- [cite_start]**使用者登入**：透過電子郵件與密碼進行登入驗證 [cite: 17, 21, 22]。
- **所有使用者列表**：登入後可查看所有已註冊的使用者列表，並顯示其 ID、名稱和電子郵件。
- **API 串接**：使用 **axios** 進行後端 API 請求，並透過 **TanStack Query** 進行狀態管理，有效處理資料載入與錯誤狀態。

## 後端 API 資訊

本專案串接以下兩個主要後端 API 端點：

### 1. 註冊 (Register)

- [cite_start]**端點**: `/User/Register` [cite: 4]
- **請求方法**: `POST`
- **請求範例**:
  ```json
  {
    "ID": 114514, // 可選
    "username": "bigred",
    "password": "msg_is_king_of_flavor",
    "email": "kang0726@gmail.com"
  }
  - **回應範例**:
  ```json
  {
    "message": "註冊成功",
    "userId": 114514
  }

  ### 2. 登入 (Login)
  - [cite_start]**端點**: `/User/Login` [cite: 4]
- **請求方法**: `POST`
- **請求範例**:
  ```json
  {
    "email": "kang0926@gmail.com",
    "password": "msg_is_king_of_flavor"
  }
  - **回應範例**:
  ```json
  {
    "message": "登入成功",
    "userId": 9,
    "username": "kang0926",
    "roles": ["admin"],
    "permissions": ["edit_user", "delete_user", "permission_editing", "view"],
    "token": "eyJhbGcioiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

  專案在 http://172.16.1.37:5173 啟動。請確保後端 API 服務已開啟，並在 src/api/userApi.js 中設定正確的 API 網址。
