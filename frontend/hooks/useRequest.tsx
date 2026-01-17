import { useState } from "react";
import { useAppToast } from "@/hooks/useAppToast";

type ToastOptions = {
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
};

type UseRequestReturn<T = any> = {
  loading: boolean;
  error: string | null;
  success: boolean;
  execute: (
    callback: () => Promise<T>,
    toastMessages?: ToastOptions
  ) => Promise<T>;
};

export function useRequest<T = any>(): UseRequestReturn<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const toast = useAppToast();

  const execute = async (
    callback: () => Promise<T>,
    toastMessages?: ToastOptions
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await callback();
      setSuccess(true);

      if (toastMessages?.success) {
        toast.showSuccess(toastMessages.success);
      }

      return response;
    } catch (err: any) {
      const message =
        err?.response?.data?.details ||
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong.";

      setError(message);

      if (toastMessages?.error) {
        toast.showError(toastMessages.error, message);
      }

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, execute };
}
