import { useState, useEffect } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Cta from "./components/Cta";
import Menu from "./components/Menu";
import { CartProvider, useCart } from "./components/CartContext";

function AppContent() {
  const { addToCart } = useCart();

  return (
    <>
      <Header />
      <Cta />
      <Menu onAddToCart={addToCart} />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
