import Image from "next/image";
import React from "react";

interface LabelTextProps {
  title: string;
  value: string;
  isImage?: boolean;
}

const LabelText = ({ title, value, isImage = false }: LabelTextProps) => {
  return title && value ? (
    <section className="flex gap-[20px]">
      <h3 className="text-[1.1rem] font-bold">{title} :</h3>
      {isImage ? <Image src={`${value}`} width={300} height={300} alt={title} priority /> : <p>{value}</p>}
    </section>
  ) : (
    <p></p>
  );
};

export default LabelText;
