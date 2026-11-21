import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    
    const { error } = await signIn(email, password);
    
    setLoading(false);
    if (error) {
      setErr(error.message);
    } else {
      navigate("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-sm">
        <h1 className="font-serif text-2xl text-chocolate text-center">LUNA MIA Admin</h1>
        <div className="gold-line" />
        
        {err && <p className="text-red-600 text-sm text-center mb-3">{err}</p>}
        
        <label className="block text-sm text-chocolate mb-1">Email</label>
        <input 
          type="email" 
          placeholder="admin@lunamia.in" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          className="w-full border border-champagne/40 rounded-full px-4 py-2 mb-4 text-sm focus:outline-none focus:border-chocolate" 
        />
        
        <label className="block text-sm text-chocolate mb-1">Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          className="w-full border border-champagne/40 rounded-full px-4 py-2 mb-6 text-sm focus:outline-none focus:border-chocolate" 
        />
        
        <button disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}