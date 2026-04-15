export type ActionResponse = {
  success?: string;
  error?: string;
  info?: string;
  redirectTo?: string;
};

export const success = (message: string): ActionResponse => ({
  success: message,
});

export const error = (message: string): ActionResponse => ({
  error: message,
});

export const info = (message: string): ActionResponse => ({
  info: message,
});
