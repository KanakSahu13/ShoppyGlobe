import ProductList from "../components/ProductList/ProductList";
import useProducts from "../hooks/useProducts";

function Home() {
    const productState = useProducts();
    return <ProductList {...productState} />;
}

export default Home;