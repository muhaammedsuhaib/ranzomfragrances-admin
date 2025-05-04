import React from "react";

const Loader = ({ message = "Loading...", showBg = true }) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        zIndex: 1050,
        backgroundColor: showBg ? "rgba(255, 255, 255, 0.6)" : "transparent",
      }}
    >
      <div className="d-flex flex-column align-items-center gap-2">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <span className="visually-hidden">{message}</span>
        </div>

        {/* <i
          className="ri-circle-fill text-info"
          style={{
            fontSize: "2rem",
            animation: "spin 1s linear infinite",
          }}
        ></i> */}

        <span className="text-dark">{message}</span>
      </div>

      {/* Inline CSS animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
