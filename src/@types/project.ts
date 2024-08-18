export type Project = {
  id: string;
  created_at: Date;
  repoCreatedAt: Date;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  userId: string;
};

export type UpdateProject = Partial<Project>;  