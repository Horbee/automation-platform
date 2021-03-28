import React from "react";

interface LoadingWrapperProps {
  loading: boolean;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  children
}) => {
  return loading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
