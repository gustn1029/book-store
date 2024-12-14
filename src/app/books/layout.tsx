import React, { ReactNode } from "react";
import Heading from "../../components/heading/Heading";

const BooksInfoLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Heading isHidden />
      {children}
    </>
  );
};

export default BooksInfoLayout;
