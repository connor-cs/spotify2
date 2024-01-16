function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

async function getToken(body) {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    const data = await response.json();
    localStorage.setItem("refresh_token", data.refresh_token)
    localStorage.setItem("access_token", data.access_token);
    window.location.href = "/account";
  } catch (error) {
    console.error("Error:", error);
  }
}

export function Login() {
  const clientId = "1553a231a3b74e48bb3dc6efdce3cb72";
  const redirectUri = "http://localhost:5173";

  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    let state = generateRandomString(16);
    let scope =
      "user-read-private user-read-email user-read-currently-playing streaming user-read-playback-state user-read-recently-played user-modify-playback-state user-top-read playlist-read-private playlist-read-collaborative";

    localStorage.setItem("code_verifier", codeVerifier);

    const args = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location = "https://accounts.spotify.com/authorize?" + args;
  });
}

export function loginCallback() {
  const clientId = "1553a231a3b74e48bb3dc6efdce3cb72";
  const redirectUri = "http://localhost:5173";

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  const verifier = localStorage.getItem("code_verifier");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });

  getToken(body);
}