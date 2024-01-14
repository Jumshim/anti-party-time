import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://yawtngjngrqazogxnvqm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhd3RuZ2puZ3JxYXpvZ3hudnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxMzE3MTYsImV4cCI6MjAyMDcwNzcxNn0.itThWCRdjs3j_OnbBGQ7OiE8NTTg-miJN2s0CesNEU8"
);

const chromeStorageKeys = {
  gauthAccessToken: "gauthAccessToken",
  gauthRefreshToken: "gauthRefreshToken",
};

export async function getCurrentUser() {
  const gauthAccessToken = (
    await chrome.storage.sync.get(chromeStorageKeys.gauthAccessToken)
  )[chromeStorageKeys.gauthAccessToken];
  const gauthRefreshToken = (
    await chrome.storage.sync.get(chromeStorageKeys.gauthRefreshToken)
  )[chromeStorageKeys.gauthRefreshToken];

  if (gauthAccessToken && gauthRefreshToken) {
    try {
      const resp = await supabase.auth.setSession({
        access_token: gauthAccessToken,
        refresh_token: gauthRefreshToken,
      });

      const user = resp.data?.user;
      const supabaseAccessToken = resp.data.session?.access_token;

      if (user && supabaseAccessToken) {
        return { user, accessToken: supabaseAccessToken };
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  return null;
}

export default function Login() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    await chrome.runtime.sendMessage({
      action: "signInWithGoogle",
      payload: { url: data.url },
    });
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Login</button>
    </div>
  );
}