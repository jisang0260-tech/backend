export function redirectToGoogleLogin(_req, res) {
  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  googleUrl.searchParams.set("client_id", "mock-google-client-id");
  googleUrl.searchParams.set("redirect_uri", "http://localhost:3000/oauth2/callback/google");
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("state", "new-project-mock-state");

  return res.redirect(302, googleUrl.toString());
}
