import { clearAuthToken, getAuthToken, setAuthToken } from "@/utils/auth";
import axios from "../lib/axios";
import {jwtDecode} from 'jwt-decode';

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

export function isTokenExpired(token: string) :boolean {
  if (!token) return true
  try {
    const decodedToken = jwtDecode(token)
    if(!decodedToken.exp) return true
    const expirationTime = decodedToken.exp * 1000
    return Date.now() > expirationTime
  } catch (error) {
    console.log('Error decoding token',error)
    return false
  }
}

export const getUserId = (): string | null => {
  const token = getAuthToken();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.sub){
        return null
      }
      return decodedToken.sub; // 'sub' es el campo con el id del usuario
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  }
  return null;
};