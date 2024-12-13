interface IProps {
  message: string;
  className?: string;
}

/**
 * 입력값에 오류가 있거나, 비즈니스 로직에 사용하는 에러 컴포넌트
 * @returns
 */
const ErrorTooltip = ({ message, className = "" }: IProps) => {
  return (
    <span className={`${className !== "" ? className : ""} absolute left-0 bottom-0 text-red-500 translate-x-[10px] translate-y-[20px] text-[0.75rem] font-[400]`}>{message}</span>
  );
};

export default ErrorTooltip;
