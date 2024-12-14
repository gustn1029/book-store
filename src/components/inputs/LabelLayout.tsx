import { LabelInputProps } from '@/type'
import React from 'react'

const LabelLayout = (props: LabelInputProps) => {
  return (
    <label htmlFor={props.label} className={`relative ${props.labelClassName ? props.labelClassName : ""}`}>
        <span className={`block mb-[5px] ml-[10px] ${props.isLabelTextHidden ? "sr-only":""}`}>{props.label}</span>
        {props.children}
    </label>
  )
}

export default LabelLayout