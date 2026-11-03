import React from "react";
import ErrorExperience from "./ErrorExperience";

export default class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error("Application render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return <ErrorExperience type="runtime" />;
    return this.props.children;
  }
}
