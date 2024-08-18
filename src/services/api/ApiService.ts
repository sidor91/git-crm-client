import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Auth, AuthResponse, CommonResponse } from "../../@types/auth";

class ApiService {
  private readonly api: AxiosInstance;
  private handleIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> =
    () => {};

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
    const token = localStorage.getItem("access_token");

    if (token) {
      this.setTokenToHeader(token);
    }

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 403) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  setIsAuthenticated(callback: React.Dispatch<React.SetStateAction<boolean>>) {
    this.handleIsAuthenticated = callback;
  }

  setTokenToHeader(token: string) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  setTokenToLocalStorage(token: string) {
    localStorage.setItem("access_token", token);
  }

  setToken(token: string) {
    this.setTokenToLocalStorage(token);
    this.setTokenToHeader(token);
  }

  getAxiosInstance(): AxiosInstance {
    return this.api;
  }

  async login(payload: Auth): Promise<void> {
    const response = await this.api.post<AuthResponse>("/auth/login", payload);
    this.setToken(response.data.access_token);
  }

  async register(payload: Auth): Promise<void> {
    const response = await this.api.post("/auth/register", payload);
    this.setToken(response.data.access_token);
  }

  async logout(): Promise<void> {
    await this.api.get<CommonResponse>("/auth/logout");
    this.setToken("");
    this.handleIsAuthenticated(false);
  }
}

const apiService = new ApiService();

export default apiService;
