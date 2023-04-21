import { Category } from "@prisma/client";

interface Props {
  category: Category
}

const Category: React.FC<Props> = ({ category }) => {
  return <div className="flex gap-2 w-60 p-1 rounded-md cursor-pointer hover:bg-neutral-800">
    <div className="w-6 h-6 bg-neutral-500" style={{ mask: `url(${category.icon}` }} />
    <span className="text-neutral-300">
      {category.name}
    </span>
  </div>
}

export default Category;
