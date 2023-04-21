import { Category } from "@prisma/client";
import Image from "next/image";

interface Props {
  category: Category
}

const Category: React.FC<Props> = ({ category }) => {
  return <div className="flex gap-2 w-60 p-1 rounded-md cursor-pointer hover:bg-neutral-800">
    <Image width={24} height={24} src={category.icon} alt="category icon" />
    <span className="text-neutral-300">
      {category.name}
    </span>
  </div>
}

export default Category;
