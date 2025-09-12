# 登入介面專案

這是一個使用 **Vite + React + JavaScript** 建立的簡易登入介面專案。  
專案透過 **TanStack Query** 與 **React Router** 串接後端 API，實現使用者註冊、登入與資料顯示等基本功能。


---

## 功能特色

- **使用者註冊**  
  - 提供 ID（可選）、使用者名稱、密碼與電子郵件欄位  
  - 可建立新帳號 

- **使用者登入**  
  - 透過電子郵件與密碼進行登入驗證 

- **所有使用者列表**  
  - 登入後可查看所有已註冊的使用者  
  - 顯示內容：ID、名稱、電子郵件

- **API 串接**  
  - 使用 **axios** 進行後端 API 請求  
  - 搭配 **TanStack Query** 管理狀態，有效處理載入、快取與錯誤

---

## 後端 API 資訊

本專案串接以下三個主要後端 API 端點：

### 1. 註冊 (Register)

- **端點**: `/User/Register`  
- **方法**: `POST`  
- **請求範例**:
  ```json
  {
    "ID": 114514, // 可選
    "username": "bigred",
    "password": "msg_is_king_of_flavor",
    "email": "kang0726@gmail.com"
  }
  ```
- **回應範例**:
  ```json
  {
    "message": "註冊成功",
    "userId": 114514
  }
  ```

---

### 2. 登入 (Login)

- **端點**: `/User/Login`
- **方法**: `POST`  
- **請求範例**:
  ```json
  {
    "email": "kang0926@gmail.com",
    "password": "msg_is_king_of_flavor"
  }
  ```
- **回應範例**:
  ```json
  {
    "message": "登入成功",
    "userId": 9,
    "username": "kang0926",
    "roles": ["admin"],
    "permissions": [
      "edit_user",
      "delete_user",
      "permission_editing",
      "view"
    ],
    "token": "eyJhbGcioiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### 3. 使用者列表 (Get All Users)

- **端點**: `/User/GetAll`  
- **方法**: `GET`  
- **請求範例**:
  ```http
  GET /User/GetAll
  Authorization: Bearer <token>
  ```
- **回應範例**:
  ```json
  [
    {
      "id": 1,
      "name": "alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "bob",
      "email": "bob@example.com"
    }
  ]
  ```

---

## 專案啟動資訊

專案在 [http://172.16.1.37:5173](http://172.16.1.37:5173) 啟動。  
確保後端 API 服務已開啟，並於 `src/api/userApi.js` 設定正確的 API 網址。

## 操作畫面展示

https://docs.google.com/presentation/d/1sJREL-bYHtRJyYgjEpuUVBPfzzmBh8vxqO5w-N7uiuI/edit?usp=sharing

## 後端專案鏈結

https://github.com/DaredemoDaisukiRobot/userinterface
