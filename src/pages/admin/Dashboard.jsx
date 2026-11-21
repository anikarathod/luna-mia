import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-soft w-full max-w-lg text-center">
        <h1 className="font-serif text-3xl text-chocolate">Admin Dashboard</h1>
        <div className="gold-line" />
        
        <p className="text-espresso/70 mt-4 mb-2">
          Welcome back! You are logged in as:
        </p>
        <p className="font-medium text-chocolate mb-8">
          {session?.user?.email}
        </p>

        <div className="space-y-4">
          <Link to="/" className="block w-full btn-outline py-3">
            View Live Website
          </Link>
          
          <button 
            onClick={handleSignOut} 
            className="block w-full btn-primary py-3"
          >
            Sign Out
          </button>
        </div>
        
        <p className="text-xs text-espresso/40 mt-8">
          Products, Categories, and Enquiries management coming next!
        </p>
      </div>
    </div>
  );
}