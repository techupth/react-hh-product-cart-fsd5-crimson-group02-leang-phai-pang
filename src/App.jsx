import { useEffect, useState } from "react";
import "./App.css";
import productData from "./data/products.js";

function App() {
  // Initializing an Array State
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Save cartItems to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Retrieve cartItems from local storage
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addProductToCart = (selectedProduct) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(
      (item) => item.id === selectedProduct.id
    );
    if (existingItem) {
      setCartItems((prevItems) => {
        return prevItems.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
    } else {
      setCartItems((prevItems) => {
        return [...prevItems, { ...selectedProduct, quantity: 1 }];
      });
    }
  };

  const removeProductFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, action) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                action === "add" ? item.quantity + 1 : CSSMathMax.max(0,item.quantity - 1),
            }
          : item
      );
    });
  };

  const totalPriceCartItem = () => {
    return cartItems.reduce((totalAcc, itemCurr) => {
      totalAcc += itemCurr.price * itemCurr.quantity;
      return totalAcc;
    }, 0);
  };
  console.log(totalPriceCartItem());

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {productData.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                {product.price.toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })}
              </p>
              <button onClick={() => addProductToCart(product)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {totalPriceCartItem()} Baht)
        </h1>
        <div className="cart-item-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <h1>Item name: {item.name}</h1>
              <h2>
                Price:{" "}
                {(item.price * item.quantity).toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })}
              </h2>
              <h2>Quantity: {item.quantity}</h2>
              <button
                className="delete-button"
                onClick={() => {
                  removeProductFromCart(item.id);
                }}
              >
                x
              </button>

              <div className="quantity-actions">
                <button
                  className="add-quantity"
                  onClick={() => updateQuantity(item.id, "add")}
                >
                  +
                </button>
                <button
                  className="subtract-quantity"
                  onClick={() => updateQuantity(item.id, "subtract")}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
