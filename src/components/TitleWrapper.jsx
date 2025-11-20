// src/components/TitleWrapper.jsx
import React, { useEffect } from "react";

const TitleWrapper = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
};

export default TitleWrapper;
