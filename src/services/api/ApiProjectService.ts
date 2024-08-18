import { AxiosInstance } from "axios";
import { Project, UpdateProject } from "../../@types/project";
import ApiService from "./ApiService";

class ApiProjectService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getProjects(): Promise<Project[]> {
    const response = await this.api.get<Project[]>("/project");
    return response.data;
  }

  async addProject(repoPath: string): Promise<Project> {
    const response = await this.api.post("/project/create", { url: repoPath });
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    await this.api.delete(`/project/${id}`);
  }

  async updateProject(id: string, payload: UpdateProject): Promise<Project> {
    const response = await this.api.patch(`/project/${id}`, payload);
    return response.data;
  }
}

const service = new ApiProjectService(ApiService.getAxiosInstance());

export default service;
