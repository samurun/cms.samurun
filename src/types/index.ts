export interface IUser {
  id: string;
  username: string;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IProject {
  id: string;
  title: string;
  image_cover: string;
  description: string;
  stacks: IStack[];
}

export interface IStack {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  projectCount?: number;
}
