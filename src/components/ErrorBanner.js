import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <Alert variant="danger" className="m-3">
      {message}
    </Alert>
  );
}
