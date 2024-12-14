import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
  UseFormWatch,
} from "react-hook-form";

export interface LabelInputProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn<string>;
  watch: UseFormWatch<any>;
  children?: React.ReactNode;
  type?: "text" | "number" | "date" | "password" | "file" | "email";
  error?: FieldErrors<FieldValues>;
  isLabelTextHidden?: boolean;
  description?: string;
  errorView?: FieldError;
  isDisabled?: boolean;
  isRequired?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  ariaInvalid?: boolean;
}

export interface Book {
  id?: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  bookImage: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface BooksResponse {
  books: Book[];
  totalPages: number;
  totalCount: number;
}

export interface FetchBooksParams {
  page: number;
  search?: string;
  searchField?: 'title' | 'author';
}

export interface SelectOption {
  value: string;
  label: string;
}