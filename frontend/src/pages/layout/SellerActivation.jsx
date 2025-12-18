import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SellerActivation = () => {
  const { url } = useParams();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const hasActivatedRef = useRef(false);

  useEffect(() => {
    if (!url || hasActivatedRef.current) return;

    let isCancelled = false;
    hasActivatedRef.current = true; // block further triggers immediately

    const sendRequest = async () => {
      setLoading(true);
      setError(false);
      setErrorMsg("");
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/shop/seller/activation`,
          { activation_token: url }
        );
        if (!isCancelled) {
          setLoading(false);
          toast.success(res.data.message || "Activation successful!");
        }
      } catch (err) {
        if (!isCancelled) {
          setLoading(false);
          setError(true);
          const msg =
            err?.response?.data?.message ||
            (err?.response?.status === 409
              ? "Your account is already activated."
              : err?.response?.status === 400
              ? "Invalid or expired activation link."
              : "Activation failed. Try again.");
          setErrorMsg(msg);
          toast.error(msg);
        }
      }
    };

    sendRequest();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  const handleRetry = () => {
    hasActivatedRef.current = false;
    setError(false);
    setErrorMsg("");
    setLoading(true);
    // force re-run useEffect by pushing a dummy param, or refactor logic to a function and call here
    // For real world, you might want to refactor sendRequest out of useEffect for better retry support
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {loading ? (
        <p aria-live="polite">Activating your account...</p>
      ) : error ? (
        <>
          <p className="text-red-600" aria-live="assertive">{errorMsg || "Your token is expired or invalid."}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleRetry}
            aria-label="Retry activation"
          >
            Retry
          </button>
        </>
      ) : (
        <p className="text-green-600" aria-live="polite">Your account has been created successfully.</p>
      )}
    </div>
  );
};

export default SellerActivation;