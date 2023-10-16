import Category from "./Category";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  categories: Category[];
}

export default Project;
