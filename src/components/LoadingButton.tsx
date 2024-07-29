import React from "react";

const LoadingButton: React.FC = () => (
  <div className="align-center mt-4 flex w-full justify-center rounded bg-primary py-4 font-medium text-gray disabled:cursor-not-allowed">
    <button className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 transition hover:bg-opacity-90">
      Loading...
    </button>
  </div>
);

export default LoadingButton;
