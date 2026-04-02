"use client";

import { useEffect } from "react";
import { useMessage } from "../providers/MessageProvider";

export function useServerMessage(state: any) {
  const { addMessage } = useMessage();

  useEffect(() => {
    if (!state) return;

    if (state.error) addMessage(state.error, "error");
    if (state.success) addMessage(state.success, "success");
    if (state.info) addMessage(state.info, "info");
  }, [state]);
}
