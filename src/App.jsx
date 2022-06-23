import Layout from './components/Layout';
import ProductsProvider from './store/ProductsProvider';
import CartProvider from './store/CartProvider';

function App() {
  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
