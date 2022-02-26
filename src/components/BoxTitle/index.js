import React from "react";
import BoxTitleCSS from "./BoxTitle.module.css";

// export default function BoxTitle({ children, ref }) {

//   return <p className={BoxTitleCSS.title}>{children}</p>;
// }

const BoxTitle = React.forwardRef((props, ref) => {
  return (
    <p ref={ref} className={props.className}>
      {props.children}
    </p>
  );
});

export default BoxTitle;
