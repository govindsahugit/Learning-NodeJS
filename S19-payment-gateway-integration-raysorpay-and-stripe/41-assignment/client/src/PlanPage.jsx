import { useEffect, useState } from "react";
import "./PlanPage.css";
import { axiosWithCreds } from "./apis/axiosInstances";
import { useUser } from "./context/UserContext";

export default function PlanPage() {
  const { user } = useUser();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Fetch all plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await axiosWithCreds.get("/plan/get/all/plans");
      setPlans(response.data.plans || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch plans");
      console.error("Fetch plans error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();

    const razorpayScript = document.getElementById("razorpay-script");
    if (razorpayScript) return;
    const script = document.createElement("script");
    script.src = `https://checkout.razorpay.com/v1/checkout.js`;
    script.async = true;
    script.id = "razorpay-script";
    document.body.appendChild(script);
  }, []);

  // Handle plan purchase
  const handleBuyPlan = async (plan) => {
    if (!user) {
      setError("Please login to purchase a plan");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:4000/razorpay/create/starter/plan",
        {
          method: "POST",
          body: JSON.stringify({ planId: plan.planId }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.subscription) location.href = data.subscription.short_url;
    } catch (err) {
      console.log(err);
    }
  };

  // Calculate current storage in GB
  const currentStorageGB = user?.maxStorageInBytes
    ? (user.maxStorageInBytes / 1024 ** 3).toFixed(1)
    : 1;

  // Find current plan
  const currentPlan = plans.find(
    (p) => p.storage === parseFloat(currentStorageGB)
  );

  function openRazorpayPopup({ orderId, user, course }) {
    const rzp = new Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY,
      name: "Cloud Storage Plan",
      order_id: orderId,
      prefill: {
        name: user.name,
        contact: user.email,
      },
      notes: {
        courseId: course.id,
        courseName: course.name,
      },
      handler: async function (response) {
        console.log(response);
        const orderResponse = await fetch(
          "http://localhost:4000/complete-order",
          {
            method: "POST",
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              courseId: course.id,
              courseName: course.name,
              userName: user.name,
              userContact: user.email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const orderStatus = await orderResponse.json();
        console.log(orderStatus);
      },
    });

    rzp.on("payment.failed", function (response) {
      console.log(response);
    });

    rzp.open();
  }

  return (
    <div className="customer-plan-page">
      {/* Header Section */}
      <div className="plan-header-section">
        <div className="header-content">
          <h1>Upgrade Your Storage</h1>
          <p className="subtitle">
            Choose the perfect plan for your cloud storage needs
          </p>
          {user && (
            <div className="current-storage-info">
              <p>
                <strong>Default Storage:</strong> {currentStorageGB} GB
              </p>
              {currentPlan && (
                <p className="current-plan">
                  <span className="badge">Current Plan</span> {currentPlan.name}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
          <button
            className="alert-close"
            onClick={() => setError("")}
            aria-label="Close alert">
            ✕
          </button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span className="alert-icon">✓</span>
          {success}
          <button
            className="alert-close"
            onClick={() => setSuccess("")}
            aria-label="Close alert">
            ✕
          </button>
        </div>
      )}

      {/* Plans Section */}
      <div className="plans-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading plans...</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="empty-state">
            <p>No plans available at the moment</p>
          </div>
        ) : (
          <div className="plans-wrapper">
            {plans.map((plan) => {
              const isCurrentPlan = currentPlan?._id === plan._id;
              const isHigherPlan = plan.storage > parseFloat(currentStorageGB);
              const isLowerPlan = plan.storage < parseFloat(currentStorageGB);

              return (
                <div
                  key={plan._id}
                  className={`plan-card ${isCurrentPlan ? "current" : ""} ${
                    isHigherPlan ? "upgrade" : ""
                  }`}>
                  {isCurrentPlan && (
                    <div className="plan-badge-current">Your Plan</div>
                  )}

                  {/* Plan Header */}
                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-storage-tag">
                      {plan.storage / 1024} GB
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.amount / 100}</span>
                    <span className="period">/month</span>
                  </div>

                  {/* Features */}
                  <div className="plan-features">
                    <div className="feature-item">
                      <span className="feature-icon">💾</span>
                      <span>{plan.storage / 1024} GB Storage</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📱</span>
                      <span>Access on all devices</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔒</span>
                      <span>Advanced security</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">👥</span>
                      <span>Share & collaborate</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="plan-action">
                    {isCurrentPlan ? (
                      <button className="btn-current" disabled>
                        ✓ Current Plan
                      </button>
                    ) : isLowerPlan ? (
                      <button className="btn-downgrade" disabled>
                        Downgrade
                      </button>
                    ) : (
                      <button
                        className={`btn-upgrade ${
                          processingId === plan._id ? "loading" : ""
                        }`}
                        onClick={() => handleBuyPlan(plan)}
                        disabled={processingId === plan._id || !user}>
                        {processingId === plan._id ? (
                          <>
                            <span className="spinner-small"></span>
                            Processing...
                          </>
                        ) : (
                          `Upgrade to ${plan.name}`
                        )}
                      </button>
                    )}
                  </div>

                  {/* Plan Footer */}
                  {isHigherPlan && (
                    <div className="plan-footer">
                      <span className="upgrade-hint">
                        ⬆️ Increase your storage
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="info-section">
        <h2>Why Upgrade?</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🚀</div>
            <h4>More Storage</h4>
            <p>
              Never worry about running out of space for your important files
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h4>Faster Performance</h4>
            <p>Experience faster uploads and downloads with premium plans</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🛡️</div>
            <h4>Better Security</h4>
            <p>Enhanced security features to keep your data safe and secure</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h4>Priority Support</h4>
            <p>Get priority support from our dedicated customer service team</p>
          </div>
        </div>
      </div>

      {/* Login Prompt */}
      {!user?._id && (
        <div className="login-prompt">
          <p>Please login to view available plans and make a purchase</p>
        </div>
      )}
    </div>
  );
}
