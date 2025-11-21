import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Deposit() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function startDeposit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.patch("/api/v1/user/deposit", { amount });
      const details = res.data.data; // RazorpayDto

      openRazorpay(details);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  function openRazorpay(optionsFromServer) {
    const options = {
      key: optionsFromServer.key,
      amount: optionsFromServer.amount,
      currency: optionsFromServer.currency,
      name: "Online Banking",
      description: "Deposit Amount",
      order_id: optionsFromServer.orderId,

      callback_url: `/api/v1/user/confirm-deposit?amount=${optionsFromServer.amount}`,

      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
          Deposit Money
        </span>

        <span></span>
      </nav>

      {/* FORM */}
      <div className="container py-5">
        <div
          className="p-4 mx-auto rounded shadow-lg text-light"
          style={{
            maxWidth: "600px",
            background: "#161b22",
            border: "1px solid #30363d",
          }}
        >
          <form onSubmit={startDeposit}>
            <label className="form-label">Enter Amount</label>
            <input
              type="number"
              className="form-control mb-3 bg-secondary text-light border-dark"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="btn btn-info w-100" disabled={loading}>
              {loading ? "Initializing..." : "Proceed to Pay"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
