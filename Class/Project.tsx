import Category from "./Category";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  category: Category[];
}

export default Project;
