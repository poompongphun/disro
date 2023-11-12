import Category from "./Category";
import User from "./User";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  categories: Category[];
  member: User[];
}

export default Project;
