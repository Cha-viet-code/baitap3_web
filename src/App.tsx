import Products from "./features/products/Products";
import Cart from "./features/cart/Cart";
import { useAppSelector } from "./app/hooks";
import "./App.css";
import Favorites from "./features/favorites/Favorites";

function App() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCart = () => {
    const cartEl = document.getElementById("cart-section");
    if (cartEl) {
      cartEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <div className="brand">
            <div className="brand-icon">🛒</div>
            <div className="brand-info">
              <span className="brand-title">Redux Store</span>
              <span className="brand-subtitle">Shopping Cart Toolkit</span>
            </div>
          </div>

          <div className="header-actions">
            <button className="cart-quick-btn" onClick={scrollToCart} title="Xem giỏ hàng">
              <span>🛒 Giỏ hàng</span>
              <span className="cart-quick-badge">{totalCartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="store-layout">
          <div className="products-container">
            <Products />
            <Favorites />
          </div>

          <aside className="cart-sidebar" id="cart-section">
            <Cart />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;

