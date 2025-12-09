import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { forgetPassword, sendOtp, verifyOtp } from "./apis/authApi";

const ForgotPassword = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  // serverError will hold the error message from the server
  const [serverError, setServerError] = useState("");

  // OTP state
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpError("");
    setOtpSent(false);
    setOtpVerified(false);

    // Clear the server error as soon as the user starts typing in either field
    if (serverError) {
      setServerError("");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Send OTP handler
  const handleSendOtp = async () => {
    const { email } = formData;
    if (!email) {
      setOtpError("Please enter your email first.");
      return;
    }

    try {
      setIsSending(true);
      const res = await sendOtp(email);
      const data = res.data;

      if (!data.error) {
        setOtpSent(true);
        setCountdown(60); // allow resend after 60s
        setOtpError("");
      } else {
        setOtpError(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong sending OTP.");
    } finally {
      setIsSending(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async () => {
    const { email } = formData;
    if (!otp) {
      setOtpError("Please enter OTP.");
      return;
    }

    try {
      setIsVerifying(true);
      const res = await verifyOtp(email, otp);
      const data = res.data;

      if (res.status === 201) {
        setOtpVerified(true);
        setOtpError("");
      } else {
        setOtpError(data.error || "Invalid or expired OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong verifying OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setOtpError("Please verify your email with OTP before registering.");
      return;
    }

    try {
      const response = await forgetPassword(formData, otp);

      const data = response.data;
      if (data.error) {
        // If there's an error, set the serverError message
        setServerError(data.error);
      } else {
        // On success, navigate to home or any other protected route
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  // If there's an error, we'll add "input-error" class to both fields
  const hasError = Boolean(serverError);

  return (
    <div className="container">
      <h2 className="heading">Create New Password</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <div className="otp-wrapper">
            <input
              className={`input ${serverError ? "input-error" : ""}`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <button
              type="button"
              className="otp-button"
              onClick={handleSendOtp}
              disabled={isSending || countdown > 0}>
              {isSending
                ? "Sending..."
                : countdown > 0
                ? `${countdown}s`
                : "Send OTP"}
            </button>
          </div>
          {otpError
            ? ""
            : serverError && <span className="error-msg">{serverError}</span>}
        </div>

        {/* OTP Input + Verify */}
        {otpSent && (
          <div className="form-group">
            <label htmlFor="otp" className="label">
              Enter OTP
            </label>
            <div className="otp-wrapper">
              <input
                className="input"
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="4-digit OTP"
                maxLength={4}
                required
              />
              <button
                type="button"
                className="otp-button"
                onClick={handleVerifyOtp}
                disabled={isVerifying || otpVerified}>
                {isVerifying
                  ? "Verifying..."
                  : otpVerified
                  ? "Verified"
                  : "Verify OTP"}
              </button>
            </div>
            {otpError && <span className="error-msg">{otpError}</span>}
          </div>
        )}

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="label">
            New Password
          </label>
          <input
            className={`input ${hasError ? "input-error" : ""}`}
            type="password"
            id="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
          />
          {/* Absolutely-positioned error message below password field */}
          {serverError && <span className="error-msg">{serverError}</span>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
