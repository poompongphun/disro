import Room from "./Room";

interface Category {
  _id: string;
  name: string;
  room: Room[];
}

export default Category;
