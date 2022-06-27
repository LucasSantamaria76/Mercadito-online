import Layout from './components/Layout';
import ProductsProvider from './store/ProductsProvider';
import CartProvider from './store/CartProvider';
import { AuthProvider } from './firebase/authContext';

function App() {
  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <AuthProvider>
            <Layout />
          </AuthProvider>
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
