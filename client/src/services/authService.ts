const baseUrl = "/api/auth";

export const signUp = async (userObject: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObject),
  });

  if (!res.ok) {
    throw new Error("Failed to sign up");
  }

  return res.json();
};

export const signIn = async (userObject: {
  email: string;
  password: string;
}) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObject),
  });

  if (!res.ok) {
    throw new Error("Failed to sign in");
  }

  return res.json();
};
