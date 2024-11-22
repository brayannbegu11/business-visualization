import { clearAuthToken, setAuthToken } from "@/utils/auth";
import axios from "../lib/axios";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const response = await axios.post("/auth/login", data);
  setAuthToken(response.data.access_token);
  return response.data;
}

export async function signup(data: SignupData) {
  const response = await axios.post("/auth/register", data);
  return response.data;
}

export function logout() {
  clearAuthToken();
  window.location.href = '/auth/login'
}