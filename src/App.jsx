import "./App.css";

function App() {
  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          <div className="product">
            <img
              src="http://dummyimage.com/350x350.png/dddddd/000000"
              alt="sample name"
            />
            <h2>Sample name</h2>
            <p>Sample desc</p>
            <button>Add to cart</button>
          </div>
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">Cart (Total Price is x Baht)</h1>
        <div className="cart-item-list">
          <div className="cart-item">
            <h1>Item name: Fond - Neutral</h1>
            <h2>Price: 160 Baht</h2>
            <h2>Quantity: 2</h2>
            <button className="delete-button">x</button>
            <div className="quantity-actions">
              <button className="add-quantity">+</button>
              <button className="subtract-quantity">-</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
