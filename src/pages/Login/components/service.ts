export async function loginUser(username: string, password: string) {
  const response = await fetch(
    "https://taskapi.hiweb.ir/api/Security/UserLogin/Login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username.trim(),
        passWord: password.toString(),
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  } else {
    throw new Error("Failed to log in");
    console.log("Failed");
  }
}
