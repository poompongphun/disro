import Category from "./Category";
import User from "./User";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: Category[];
  members: User[];
}

export default Project;
