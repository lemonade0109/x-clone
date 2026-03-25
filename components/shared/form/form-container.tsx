import { ActionStateBase, ActionToastType, FormContainerProps } from "@/types";
import React from "react";
import { toast } from "sonner";

const FormContainer = <S extends ActionStateBase>({
  action,
  initialState,
  className,
  resetOnSuccess = false,
  onSuccess,
  onError,
  children,
}: FormContainerProps<S>) => {
  const [state, formAction, pending] = React.useActionState<S, FormData>(
    action,
    initialState as Awaited<S>,
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  const lastToastKeyRef = React.useRef<string>("");

  React.useEffect(() => {
    const message = state.toast?.message || state.error || state.message;
    if (!message) return;

    const type: ActionToastType =
      state.toast?.type ||
      (state.error ? "error" : state.success ? "success" : "info");

    const key = state.toast?.id || `${type}: ${message}`;
    if (lastToastKeyRef.current === key) return;
    lastToastKeyRef.current = key;

    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  }, [state]);

  React.useEffect(() => {
    if (!state.success) {
      if (state.error) onError?.(state);
      return;
    }

    onSuccess?.(state);
    if (resetOnSuccess) formRef.current?.reset();
  }, [state.success, onSuccess, onError, resetOnSuccess]);
  return (
    <form ref={formRef} action={formAction} className={className}>
      {children({ state, pending })}
    </form>
  );
};

export default FormContainer;
