
# React Admin Panel for PHP CRUD API

This is a React-based admin panel for managing your data via the [PHP CRUD API Generator](https://github.com/BitsHost/php-crud-api-generator).  
It provides a simple UI for listing, creating, editing, and deleting table rows via the API.

---

## 🚀 Features

- Auto-discovers tables and columns from your API
- List, create, update, and delete records
- Supports authentication (API Key, Basic Auth, JWT)
- Table filtering, sorting, and pagination
- Responsive and easy to extend

---

## 🛠️ Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-org/your-react-admin.git
    cd your-react-admin
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn
    ```

---

## ⚙️ Configuration

1. **Set API Endpoint**

    Edit `.env` and set:

    ```
    REACT_APP_API_URL=http://localhost/index.php
    ```

    > If your PHP API is running on a different host or port, update the URL accordingly.

2. **Set Authentication (Optional)**

    - For API Key: Add `REACT_APP_API_KEY=your-api-key` in your `.env`
    - For JWT: The login form will request username and password, and store the token.
    - For Basic Auth: The login form will request username and password.

---

## 🌐 CORS Issue Solution

If your API and React app run on different domains/ports (e.g., API on `localhost:80`, frontend on `localhost:3000`),  
**the browser will block requests due to CORS (Cross-Origin Resource Sharing) unless your API allows it.**

### **To Fix CORS:**

**In your PHP API, add this line at the top of your `public/index.php`:**

```php
// Add this line if admin React is enabled.
\App\Cors::sendHeaders();
```

- This will output the necessary CORS headers for requests from your React app.
- Make sure your `Cors` class outputs at least the following headers:
  - `Access-Control-Allow-Origin: http://localhost:3000`
  - `Access-Control-Allow-Credentials: true`
  - `Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key`
  - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- Change `http://localhost:3000` to match your React app's URL if different.

---

## 🏃‍♂️ Running the App

```bash
npm start
# or
yarn start
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

- Output will be in the `build/` directory.

---

## 🙋 Troubleshooting

- **CORS errors:**  
  Double-check the CORS headers via your `\App\Cors::sendHeaders()` method and that you are using the correct port/domain in both API and React app.
- **API not reachable:**  
  Make sure the API is running and accessible from your browser – try opening the API URL directly.

---

## 📝 License

MIT

---

## 🙌 Credits

Built by [BitsHost](https://github.com/BitsHost). PRs/issues welcome!


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
