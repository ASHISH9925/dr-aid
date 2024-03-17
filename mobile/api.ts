import { DoesTokenExist } from "./utils";

const SERVER_URL = "https://2a92-123-201-214-255.ngrok-free.app/api";

export async function AuthLogin(name: string, number: string) {
  const response = await fetch(`${SERVER_URL}/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      number,
    }),
  });
  const data = await response.json();
  return data;
}

export async function getPatientRecords() {
  const token = await DoesTokenExist();
  const response = await fetch(`${SERVER_URL}/get_patient_records/`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const data = await response.json();
  return data;
}
