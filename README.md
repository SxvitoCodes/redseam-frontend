# RedSeam Clothing Store Frontend

A small e-commerce frontend built with **React**, **TypeScript**, and **TailwindCSS**.\
This project demonstrates a working product listing, cart functionality, sorting, filtering, and user authentication.

---

## Features

- **User Authentication**

  - Login and register users.
  - Stores user token in `localStorage`.
  - Displays user avatar in the navbar.

- **Products**

  - List of products fetched from API.
  - Sort by newest, price ascending, or price descending.
  - Filter products by price range.

- **Cart**

  - Add items with **color**, **size**, and **quantity**.
  - Remove items correctly based on `color` and `size`.
  - Quantity controls (`+` and `-`).
  - Shows subtotal, delivery fee, and total.
  - Checkout functionality (calls API endpoint).

- **State Management**

  - **AuthContext**: user login/logout and token management.
  - **CartContext**: cart management with API calls.

---

## Project Structure

```
src/
├─ assets/           # Images & SVGs
├─ components/       # Reusable UI components (Input, Button, CartPanel, etc.)
├─ context/          # React Contexts (Auth, Cart)
├─ helpers/          # Utilities (authRequest, colorMap, pagination)
├─ pages/            # Page components (ProductListPage, ProductDetails)
├─ App.tsx
└─ main.tsx
```

> Optional: shared types (`Product`, `CartItem`, `User`) could live in a `types/` folder for easier reuse across components.

---

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/SxvitoCodes/redseam-frontend
   cd redseam-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app at [http://localhost:5173](http://localhost:5173)

---

## Notes / Considerations

- Cart API expects **color** and **size** to properly manage items.
- Sorting and filtering are handled via API parameters.
- All API calls are wrapped in `authRequest` helper to automatically include the token.
- Password input has a show/hide toggle for better UX.
- Navbar shows the user avatar if logged in, otherwise a default icon.

---

## Future Improvements

- Add animations for dropdowns and cart panel.
- Implement **lazy loading** or pagination for product images.
- Add unit tests for components and context logic.

---

### Author

Tsotne Skhvitaridze – built as part of RedSeam Clothing project

