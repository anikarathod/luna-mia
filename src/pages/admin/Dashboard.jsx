import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  const links = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/categories", label: "Categories" },
    { to: "/admin/homepage", label: "Homepage" },
    { to: "/admin/gallery", label: "Gallery" },
    { to: "/admin/enquiries", label: "Enquiries" },
  ];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-beige p-6 flex flex-col hidden md:flex h-screen sticky top-0">
        <h1 className="font-serif text-2xl tracking-[0.2em] text-chocolate text-center mb-2">LUNA MIA</h1>
        <p className="text-[10px] text-center text-champagne tracking-widest mb-8 uppercase">Admin Panel</p>

        <nav className="flex-1 space-y-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`block px-4 py-2 rounded-lg text-sm transition ${
                location.pathname === l.to
                  ? "bg-chocolate text-cream"
                  : "text-espresso/70 hover:bg-beige/50 hover:text-chocolate"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-beige mt-6">
          <p className="text-xs text-espresso/50 mb-4 truncate">{session?.user?.email}</p>
          <Link to="/" className="block text-center btn-outline py-2 mb-2 text-xs">View Website</Link>
          <button onClick={handleSignOut} className="w-full btn-primary py-2 text-xs">Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 border-b border-beige flex justify-between items-center sticky top-0 z-10">
          <h1 className="font-serif text-xl tracking-widest text-chocolate">LUNA MIA</h1>
          <button onClick={handleSignOut} className="text-xs text-red-600">Sign Out</button>
        </div>

        {/* If the URL is exactly /admin, show a welcome message. Otherwise, show the child page (Products, etc.) */}
        {location.pathname === "/admin" ? (
           <div className="p-8 max-w-4xl mx-auto text-center mt-20">
            <h2 className="font-serif text-3xl text-chocolate mb-4">Welcome to the Admin Panel</h2>
            <p className="text-espresso/70 mb-8">Use the sidebar to manage your website.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/admin/products" className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition border border-transparent hover:border-champagne">
                <h3 className="font-serif text-xl text-chocolate mb-2">Products</h3>
                <p className="text-sm text-espresso/60">Add or edit gift hampers.</p>
              </Link>
              <Link to="/admin/enquiries" className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition border border-transparent hover:border-champagne">
                <h3 className="font-serif text-xl text-chocolate mb-2">Enquiries</h3>
                <p className="text-sm text-espresso/60">Read messages from customers.</p>
              </Link>
              <Link to="/admin/categories" className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition border border-transparent hover:border-champagne">
                <h3 className="font-serif text-xl text-chocolate mb-2">Categories</h3>
                <p className="text-sm text-espresso/60">Manage shop categories.</p>
              </Link>
            </div>
          </div>
        ) : (
          <Outlet /> // This renders the sub-pages!
        )}
      </main>
    </div>
  );
}