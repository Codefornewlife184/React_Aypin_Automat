import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch() {}
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            padding: 12,
            background: "#fee2e2",
            color: "#7f1d1d",
            zIndex: 99999,
            borderBottom: "1px solid #fca5a5",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          <strong>Uygulama hatası:</strong> {String(this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}
