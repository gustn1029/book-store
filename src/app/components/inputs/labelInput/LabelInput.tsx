import { ErrorMessage } from "@hookform/error-message";
import ErrorTooltip from "../../tooltip/ErrorTooltip";
import LabelLayout from "../LabelLayout";
import { LabelInputProps } from "@/type/index";

const LabelInput = (props: LabelInputProps) => {
  return (
    <LabelLayout {...props}>
      <input
        type={props.type ? props.type : "text"}
        {...props.register}
        id={props.label}
        placeholder={props.placeholder}
        className={`w-full py-[10px] px-[15px] rounded-[15px] border border-gray-300 ${
          props.inputClassName ? props.inputClassName : ""
        }`}
        defaultValue={props.watch(props.label)}
        aria-invalid={props.ariaInvalid}
      />
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

export default LabelInput;