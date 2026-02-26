"use client";

import React from "react";

interface State {
  hasError: boolean;
}

export default class NotionErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  static getDerivedStateFromError() {
    return { hasError: false }; // tetap render, jangan crash
  }

  componentDidCatch(error: Error) {
    // Ignore warning ini dari react-notion-x
    if (error.message?.includes("Can't perform a React state update")) {
      return;
    }
    console.error(error);
  }

  render() {
    return this.props.children;
  }
}
