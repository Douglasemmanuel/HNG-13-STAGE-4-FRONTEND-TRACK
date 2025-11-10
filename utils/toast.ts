import React, { ReactNode } from "react";
import { Toast } from "toastify-react-native";

type ToastPosition = "top" | "bottom";

type ToastOptions = {
  position?: ToastPosition;
  icon?: ReactNode;
  useModal?: boolean;
  duration?: number; // in milliseconds
};

type ToastFunction = (message: string, options?: ToastOptions) => void;

const baseColors = {
  success: "#4CAF50", // green
  error: "#F44336",   // red
  info: "#2196F3",    // blue
  warning: "#FF9800", // orange
};

function brightenColor(color: string, amount = 40): string {
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);
  const brightened = (r << 16) | (g << 8) | b;
  return (usePound ? "#" : "") + brightened.toString(16).padStart(6, "0");
}

export const showToast: Record<
  "success" | "error" | "info" | "warning",
  ToastFunction
> = {
  success: (message, options) =>
    Toast.show({
      type: "success",
      text1: message,
      position: options?.position ?? "bottom",
      visibilityTime: options?.duration ?? 4000,
      autoHide: true,
      backgroundColor: baseColors.success,
      textColor: "#fff",
      iconColor: brightenColor(baseColors.success, 50),
      iconSize: 24,
      progressBarColor: brightenColor(baseColors.success, 80),
      theme: "dark",
      closeIcon: "times-circle",
      closeIconFamily: "FontAwesome",
      closeIconSize: 20,
      closeIconColor: "#fff",
      icon: options?.icon,
      useModal: options?.useModal,
    }),

  error: (message, options) =>
    Toast.show({
      type: "error",
      text1: message,
      position: options?.position ?? "bottom",
      visibilityTime: options?.duration ?? 4000,
      autoHide: true,
      backgroundColor: baseColors.error,
      textColor: "#fff",
      iconColor: brightenColor(baseColors.error, 50),
      iconSize: 24,
      progressBarColor: brightenColor(baseColors.error, 80),
      theme: "dark",
      closeIcon: "times-circle",
      closeIconFamily: "FontAwesome",
      closeIconSize: 20,
      closeIconColor: "#fff",
      icon: options?.icon,
      useModal: options?.useModal,
      
    }),

  info: (message, options) =>
    Toast.show({
      type: "info",
      text1: message,
      position: options?.position ?? "bottom",
      visibilityTime: options?.duration ?? 4000,
      autoHide: true,
      backgroundColor: baseColors.info,
      textColor: "#fff",
      iconColor: brightenColor(baseColors.info, 50),
      iconSize: 24,
      progressBarColor: brightenColor(baseColors.info, 80),
      theme: "dark",
      closeIcon: "times-circle",
      closeIconFamily: "FontAwesome",
      closeIconSize: 20,
      closeIconColor: "#fff",
      icon: options?.icon,
      useModal: options?.useModal,
    }),

  warning: (message, options) =>
    Toast.show({
      type: "warn",
      text1: message,
      position: options?.position ?? "bottom",
      visibilityTime: options?.duration ?? 4000,
      autoHide: true,
      backgroundColor: baseColors.warning,
      textColor: "#fff",
      iconColor: brightenColor(baseColors.warning, 50),
      iconSize: 24,
      progressBarColor: brightenColor(baseColors.warning, 80),
      theme: "dark",
      closeIcon: "times-circle",
      closeIconFamily: "FontAwesome",
      closeIconSize: 20,
      closeIconColor: "#fff",
      icon: options?.icon,
      useModal: options?.useModal,
    }),
};
