import Category from "./Category";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  categorys: Category[];
}

export default Project;
