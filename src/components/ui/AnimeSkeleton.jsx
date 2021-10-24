import React from "react";

export default function AnimeSkeleton({ outer__class, inner__class }) {
  return (
    <div className={outer__class}>
      <div className={inner__class}></div>
    </div>
  );
}
