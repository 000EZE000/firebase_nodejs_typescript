import "dotenv/config";

export const PORT = Number(process.env.PORT ?? 3000);
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ?? "";
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN ?? "";
export const FIREBASE_PROYECT_ID = process.env.FIREBASE_PROYECT_ID ?? "";
export const FIREBASE_STORAGE_BUCKET =
  process.env.FIREBASE_STORAGE_BUCKET ?? "";
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env.FIREBASE_MESSAGING_SENDER_ID ?? "";
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID ?? "";
export const FIREBASE_MEASUREMENT_ID =
  process.env.FIREBASE_MEASUREMENT_ID ?? "";
