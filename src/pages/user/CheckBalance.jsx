import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CheckBalance() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBalance();
  }, []);

  async function loadBalance() {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/user/bank-balance");
      setBalance(res.data.data); // contains { accountNumber, balance }
    } catch {
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="navbar navbar-dark px-4"
        style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <button
          className="btn btn-outline-info fw-semibold"
          onClick={() => navigate("/user/dashboard")}
        >
          ⬅ Back
        </button>

        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          Check Balance
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        {loading ? (
          <p className="text-center text-light fs-5">Loading...</p>
        ) : !balance ? (
          <p className="text-center text-secondary fs-5">
            Unable to fetch balance.
          </p>
        ) : (
          <div
            className="p-4 mx-auto rounded text-light shadow-lg"
            style={{
              maxWidth: "500px",
              background: "#161b22",
              border: "1px solid #30363d",
              boxShadow: "0 0 20px rgba(88,166,255,0.3)",
            }}
          >
            <h4 className="fw-bold mb-3" style={{ color: "#79c0ff" }}>
              Account #{balance.accountNumber}
            </h4>

            <h2 className="fw-bold" style={{ color: "#2ea043" }}>
              ₹ {balance.balance}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
