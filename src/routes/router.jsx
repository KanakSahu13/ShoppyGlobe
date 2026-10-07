import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Header = lazy(() => import("../components/Header/Header"));
const Home = lazy(() => import("../pages/Home"));
const ProductDetail = lazy(() => import("../components/ProductDetail/ProductDetail"));
const CartPage = lazy(() => import("../pages/CartPage"));
const Checkout = lazy(() => import("../components/Checkout/Checkout"));
// route-level lazy imports keep non-home screens out of the initial bundle
const NotFound = lazy(() => import("../components/NotFound/NotFound"));

function AppLayout() {
    return (
        <>
            <Suspense fallback={<div className="page-loader">Loading ShoppyGlobe...</div>}>
                <Header />
            </Suspense>
            <main className="container">
                <Suspense fallback={<div className="page-loader">Loading page...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <footer>© {new Date().getFullYear()} ShoppyGlobe</footer>
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { 
                index: true,
                element: <Home />
            },
            {
                path: "products/:productId",
                element: <ProductDetail />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "checkout",
                element: <Checkout /> 
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);