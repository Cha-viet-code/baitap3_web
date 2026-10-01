import { useFavoritesStore } from "./favoritesStore";

export default function Favorites() {
    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    const removeFavorite = useFavoritesStore(
        (state) => state.removeFavorite
    );

    return (
        <section className="favorites-section">
            <div className="favorites-header">
                <div>
                    <h2>❤️ Sản phẩm yêu thích</h2>
                    <p>
                        {favorites.length} sản phẩm đang được yêu thích
                    </p>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="favorites-empty">
                    <span className="favorites-empty-icon">♡</span>
                    <h3>Chưa có sản phẩm yêu thích</h3>
                    <p>
                        Hãy nhấn vào biểu tượng ♡ trên sản phẩm để thêm
                        vào danh sách yêu thích.
                    </p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((product) => (
                        <article
                            className="favorite-card"
                            key={product.id}
                        >
                            <div className="favorite-img-wrapper">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="favorite-img"
                                />
                            </div>

                            {product.category && (
                                <span className="product-category">
                                    {product.category}
                                </span>
                            )}

                            <h3
                                className="favorite-title"
                                title={product.title}
                            >
                                {product.title}
                            </h3>

                            <div className="favorite-bottom">
                                <span className="favorite-price">
                                    ${product.price.toFixed(2)}
                                </span>

                                <button
                                    className="btn-remove-favorite"
                                    onClick={() =>
                                        removeFavorite(product.id)
                                    }
                                    title="Bỏ khỏi yêu thích"
                                >
                                    ♡ Bỏ thích
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}