import { ErrorMessage } from "@hookform/error-message";
import ErrorTooltip from "../../tooltip/ErrorTooltip";
import LabelLayout from "../LabelLayout";
import { LabelInputProps, SelectOption } from "@/type/index";

interface LabelSelectProps extends Omit<LabelInputProps, "type"> {
  options: SelectOption[];
  defaultOption?: string;
}

const LabelSelect = (props: LabelSelectProps) => {
  return (
    <LabelLayout {...props}>
      <select
        {...props.register}
        id={props.label}
        className={`w-full py-[10px] px-[15px] rounded-[15px] border border-gray-300 appearance-none bg-white ${
          props.inputClassName ? props.inputClassName : ""
        }`}
        defaultValue={props.defaultOption || props.watch(props.label)}
        aria-invalid={props.ariaInvalid}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default LabelSelect;
