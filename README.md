# ShoppyGlobe 🛍️

ShoppyGlobe is a responsive e-commerce web application built with **React + Vite**. It provides a simple shopping experience where users can browse products, search the catalogue, view product details, manage a shopping cart and complete a mock checkout.

The application uses Redux Toolkit for centralized cart and search state, React Router for navigation and the DummyJSON Products API for product data.

## Features

- **Product catalogue**: Fetches and displays products from the DummyJSON API through a reusable `useProducts` custom hook, with dedicated loading and error states.

- **Dynamic product details**: Provides `/products/:productId` routes with a product-specific API request, loading states and graceful error handling for unavailable products.

- **Redux-powered cart**: Uses Redux Toolkit to manage cart state with actions for adding, removing, incrementing, decrementing and clearing products, along with selectors for cart items, item count and total price.

- **Product search**: Provides case-insensitive product search backed by Redux state, allowing the header and catalogue to share a single source of truth. 

- **Quantity management**: Supports incrementing and decrementing cart quantities while ensuring a product quantity can never fall below `1`.

- **Checkout flow**: Includes a controlled checkout form, order summary, total calculation, centered `Order placed` confirmation, automatic cart clearing and redirect to the Home page.

- **Client-side routing**: Uses React Router's `createBrowserRouter` with dynamic product routes for Home, Product Details, Cart, Checkout and a custom 404 page. 

- **Detailed 404 handling**: Displays the requested path and relevant error details when a user navigates to an unknown route.

- **Code splitting and lazy loading**: Uses `React.lazy` and `Suspense` to load route-level components on demand and provide loading feedback during module loading.

- **Optimized images**: Uses native browser image lazy loading with `loading="lazy"` to avoid unnecessarily loading off-screen product images.

- **Reusable components with prop validation**: Uses functional, reusable React components with PropTypes to validate component props and make expected data structures explicit. 

- **Robust data fetching**: Handles failed API requests gracefully and uses `AbortController` to cancel pending requests when components unmount or requested product routes change. 

- **Responsive interface**: Uses responsive CSS and adaptive layouts to provide a consistent shopping experience across desktop, tablet and mobile screen sizes. 

## Getting Started

### Prerequisites

Before running the application, make sure the following are installed:

- Node.js (18+ recommended)
- npm

### Install dependencies 

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open the local URL printed by Vite.

### Production build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
├── app/store.js
├── components/
│   ├── Cart/
│   ├── CartItem/
│   ├── Checkout/
│   ├── Header/
│   ├── NotFound/
│   ├── ProductDetail/
│   ├── ProductItem/
│   ├── ProductList/
├── hooks/useProducts.js
├── pages/
│   ├── CartPage.jsx
│   ├── Home.jsx
├── redux/
│   ├── cartSlice.js
│   ├── searchSlice.js
├── routes/router.jsx
├── styles/index.css
├── App.jsx
├── main.jsx
```

## Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- Vite
- CSS

### State Management

- Redux Toolkit
- React Redux

### Routing

- React Router
- `createBrowserRouter`
- Dynamic product routes

### Validation

- PropTypes
- Native HTML form validation

### API

- DummyJSON Products API

## API

Product data is retrieved from the DummyJSON Products API:
`https://dummyjson.com/products`

Individual products are fetched dynamically using their product ID:
`https://dummyjson.com/products/:productId`
