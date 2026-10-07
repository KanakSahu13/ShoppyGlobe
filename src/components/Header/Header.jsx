import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../../redux/cartSlice";
import { selectSearchQuery, setSearchQuery } from "../../redux/searchSlice";
import "./Header.css";

function Header() {
    const dispatch = useDispatch();
    const query = useSelector(selectSearchQuery);
    const cartCount = useSelector(selectCartCount);

    const handleSearch = (event) => {
        const value = event.target.value;
        dispatch(setSearchQuery(value));
    }

    return (
        <header className="site-header">
            <Link className="brand" to="/">ShoppyGlobe</Link>

            <nav aria-label="Main navigation" data-testid="main-navigation">
                <Link to="/">Home</Link>
                <Link to="/cart" className="cart-link">Cart 
                    <span>{cartCount}</span>    
                </Link>
            </nav>

            <label className="search-box">
                <span className="sr-only">Search products</span>
                <input value={query} onChange={handleSearch} placeholder="Search products..." />
            </label>
        </header>
    )
}

export default Header;