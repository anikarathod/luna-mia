import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmailButton from "./components/EmailButton";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import CustomHampers from "./pages/CustomHampers";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import Categories from "./pages/admin/Categories";
import Enquiries from "./pages/admin/Enquiries";
import Gallery from "./pages/admin/Gallery";
import HomepageManager from "./pages/admin/HomepageManager";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /><EmailButton /></>} />
          <Route path="/shop" element={<><Navbar /><Shop /><Footer /><EmailButton /></>} />
          <Route path="/collections" element={<><Navbar /><Collections /><Footer /><EmailButton /></>} />
          <Route path="/product/:id" element={<><Navbar /><ProductDetails /><Footer /><EmailButton /></>} />
          <Route path="/custom" element={<><Navbar /><CustomHampers /><Footer /><EmailButton /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /><EmailButton /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /><EmailButton /></>} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route index element={null} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="categories" element={<Categories />} />
            <Route path="homepage" element={<HomepageManager />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="enquiries" element={<Enquiries />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Analytics />
    </AuthProvider>
  );
}