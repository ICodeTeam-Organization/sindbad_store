import React from "react";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <StoreHeader/> => This header is different from the one on the home page */}
      <main>{children}</main>
      {/* <StoreFooter/> => => and this as well*/}
    </>
  );
};

export default StoreLayout;
