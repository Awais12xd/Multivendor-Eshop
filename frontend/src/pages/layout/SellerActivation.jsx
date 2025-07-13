import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SellerActivation = () => {
  const { url } = useParams();
  const [error, setError] = useState(false);

  const hasActivatedRef = useRef(false); // ✅ ref to block reactivation

  useEffect(() => {
    if (!url || hasActivatedRef.current) return;

    hasActivatedRef.current = true; // ✅ block further triggers immediately

    const sendRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/shop/seller/activation", {
          activation_token: url,
        });

        toast.success(res.data.message);
      } catch (err) {
        setError(true);
        toast.error(
          err?.response?.data?.message || "Activation failed. Try again."
        );
      }
    };

    sendRequest();
  }, [url , ]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {error ? (
        <p>Your token is expired or invalid.</p>
      ) : (
        <p>Your account has been created successfully.</p>
      )}
    </div>
  );
};

export default SellerActivation;
