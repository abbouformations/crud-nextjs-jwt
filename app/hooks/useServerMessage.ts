"use client";

import { useEffect } from "react";
import { useMessage } from "../providers/MessageProvider";
import { useRouter } from "next/navigation";

export function useServerMessage(state: any) {
  const { addMessage } = useMessage();
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.error) addMessage(state.error, "error");
    if (state.success) addMessage(state.success, "success");
    if (state.info) addMessage(state.info, "info");
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state]);
}
