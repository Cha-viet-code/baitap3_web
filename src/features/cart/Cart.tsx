import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from "./cartSlice";

export default function Cart() {
    const dispatch = useAppDispatch();

    const items = useAppSelector((state) => state.cart.items);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="cart-card">
                <div className="cart-header">
                    <h2 className="cart-title">
                        <span>🛍️ Giỏ hàng</span>
                    </h2>
                    <span className="cart-count">0 món</span>
                </div>
                <div className="cart-empty">
                    <span className="cart-empty-icon">🛒</span>
                    <h3>Giỏ hàng đang trống</h3>
                    <p>Hãy chọn sản phẩm bạn thích để thêm vào giỏ hàng nhé!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-card">
            <div className="cart-header">
                <h2 className="cart-title">
                    <span>🛍️ Giỏ hàng</span>
                </h2>
                <span className="cart-count">{totalCount} món</span>
            </div>

            <div className="cart-items-list">
                {items.map((item) => (
                    <div className="cart-item" key={item.id}>
                        {item.image && (
                            <img
                                className="cart-item-img"
                                src={item.image}
                                alt={item.title}
                            />
                        )}

                        <div className="cart-item-details">
                            <h4 className="cart-item-title" title={item.title}>
                                {item.title}
                            </h4>
                            <div className="cart-item-price">
                                <strong>${item.price.toFixed(2)}</strong> × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>

                        <div className="cart-qty-ctrl">
                            <button
                                className="qty-btn"
                                onClick={() =>
                                    dispatch(
                                        updateQuantity({
                                            id: item.id,
                                            quantity: item.quantity - 1,
                                        })
                                    )
                                }
                                title="Giảm số lượng"
                            >
                                -
                            </button>

                            <span className="qty-val">{item.quantity}</span>

                            <button
                                className="qty-btn"
                                onClick={() =>
                                    dispatch(
                                        updateQuantity({
                                            id: item.id,
                                            quantity: item.quantity + 1,
                                        })
                                    )
                                }
                                title="Tăng số lượng"
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn-remove-item"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            title="Xoá món này"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                <div className="summary-row">
                    <span>Tổng số lượng:</span>
                    <strong>{totalCount} món</strong>
                </div>

                <div className="total-row">
                    <span>Tổng thanh toán:</span>
                    <span className="total-amount">${total.toFixed(2)}</span>
                </div>

                <div className="cart-actions">
                    <button
                        className="btn-checkout"
                        onClick={() => alert(`🎉 Đặt hàng thành công! Tổng thanh toán: $${total.toFixed(2)}`)}
                    >
                        <span>💳 Thanh toán ngay</span>
                    </button>

                    <button
                        className="btn-clear-cart"
                        onClick={() => dispatch(clearCart())}
                    >
                        <span>🗑️ Xoá toàn bộ giỏ</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

