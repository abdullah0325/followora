"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ProgressBarProviders = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const hideProgressPaths = [
    "/contact/login",
    "/contact/otp",
    "/contact/register",
    "/otp",
    "/register",
    "/auth/login"
  ];
  const shouldHideProgress = hideProgressPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {children}
      {loading && !shouldHideProgress && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            backgroundColor: "#2563eb",
            zIndex: 9999,
            animation: "progressAnimation 0.5s ease-in-out",
          }}
        />
      )}
      <style jsx>{`
        @keyframes progressAnimation {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ProgressBarProviders;
