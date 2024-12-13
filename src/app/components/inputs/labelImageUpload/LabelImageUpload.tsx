"use client";

import { ErrorMessage } from "@hookform/error-message";
import ErrorTooltip from "../../tooltip/ErrorTooltip";
import LabelLayout from "../LabelLayout";
import { LabelInputProps } from "@/type/index";
import { useState } from "react";
import Image from "next/image";

interface LabelImageUploadProps extends Omit<LabelInputProps, 'type'> {
 previewUrl?: string;
 onImageChange?: (file: File) => void;
}

const LabelImageUpload = (props: LabelImageUploadProps) => {
 const [preview, setPreview] = useState<string>(props.previewUrl || '');

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (file) {
     const imageUrl = URL.createObjectURL(file);
     setPreview(imageUrl);
     props.onImageChange?.(file);
   }
 };

 return (
   <LabelLayout {...props}>
     <div className="relative">
       <input
         type="file"
         accept="image/*"
         {...props.register}
         id={props.label}
         onChange={(e) => {
           props.register.onChange(e);
           handleImageChange(e);
         }}
         className="hidden"
         aria-invalid={props.ariaInvalid}
       />
       
       <label 
         htmlFor={props.label}
         className="cursor-pointer w-[200px] h-[200px] flex flex-col items-center gap-2"
       >
         {preview ? (
           <div className="w-[200px] h-[200px] relative">
             <Image 
               src={preview} 
               alt="Preview" 
               fill
             />
           </div>
         ) : (
           <div className="w-[200px] h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
             <span className="text-gray-500">이미지를 선택해주세요</span>
           </div>
         )}
         
         <button
           type="button"
           className="py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
         >
           {preview ? '이미지 변경' : '이미지 업로드'}
         </button>
       </label>
     </div>

     {props.errorView && (
       <ErrorMessage
         errors={props.error}
         name={props.register.name}
         render={({ message }) => <ErrorTooltip message={message} />}
       />
     )}
   </LabelLayout>
 );
};

export default LabelImageUpload;