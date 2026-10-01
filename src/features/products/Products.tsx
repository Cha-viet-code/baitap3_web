import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../cart/cartSlice";
import { fetchProducts } from "./productsSlice";
import { useFavoritesStore } from "../favorites/favoritesStore";

export default function Products() {
    const dispatch = useAppDispatch();

    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    const toggleFavorite = useFavoritesStore(
        (state) => state.toggleFavorite
    );

    const {
        items: products,
        loading,
        error,
    } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="products-section">
                <div className="loading-box">
                    <div className="spinner"></div>
                    <p>Đang tải danh sách sản phẩm...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-section">
                <div className="alert-error">
                    ⚠️ Có lỗi xảy ra: {error}
                </div>
            </div>
        );
    }

    return (
        <section className="products-section">
            <div className="section-header">
                <h2 className="section-title">
                    <span>✨ Khám phá sản phẩm</span>
                </h2>
                <span className="section-badge">{products.length} sản phẩm</span>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <article className="product-card" key={product.id}>
                        <div className="product-img-wrapper">
                            <img
                                className="product-img"
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                            />

                            <button
                                className="btn-favorite"
                                onClick={() => toggleFavorite(product)}
                                title={
                                    favorites.some((item) => item.id === product.id)
                                        ? "Bỏ khỏi yêu thích"
                                        : "Thêm vào yêu thích"
                                }
                            >
                                {favorites.some((item) => item.id === product.id)
                                    ? "❤️"
                                    : "♡"}
                            </button>
                        </div>

                        {product.category && (
                            <span className="product-category">{product.category}</span>
                        )}

                        <div className="product-info">
                            <h3 className="product-title" title={product.title}>
                                {product.title}
                            </h3>

                            <div className="product-bottom">
                                <span className="product-price">${product.price.toFixed(2)}</span>

                                <button
                                    className="btn-add-cart"
                                    onClick={() => dispatch(addToCart(product))}
                                    title="Thêm vào giỏ hàng"
                                >
                                    <span>+ Thêm giỏ</span>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

