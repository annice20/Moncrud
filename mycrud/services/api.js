import Constants from "expo-constants";

export const BASE_URL = "http://192.168.88.199:3000/";

console.log("Connecté au serveur: ", BASE_URL);

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/inscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'inscription");
    }
    return data;
  } catch (error) {
    console.error("Erreur API ", error);
    throw error;
  }
};
