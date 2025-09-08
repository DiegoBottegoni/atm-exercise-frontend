const BASE_URL = "http://localhost:3000";

export const login = async (pin: number) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  return res.json();
};

export const getBalance = async () => {
  const res = await fetch(`${BASE_URL}/balance`);
  return res.json();
};

export const deposit = async (amount: number) => {
  const res = await fetch(`${BASE_URL}/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};

export const withdraw = async (amount: number) => {
    const res = await fetch(`${BASE_URL}/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Error desconocido");
    }

    return data;
};


export const exit = async () => {
  const res = await fetch(`${BASE_URL}/exit`, { method: "POST" });
  return res.json();
};
