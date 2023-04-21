import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import ModalButton from "../ModalButton";
import CreateCategory from "../modals/CreateCategory";
import CreateGoal from "../modals/CreateGoal";
import { atom, useAtom } from "jotai";
import type { Filters, Sorts } from "~/schema/goal"
import Category from "./Category";

const filtersAtom = atom<Filters>({
  isActive: true,
  categoryId: ""
});

const sortsAtom = atom<Sorts>({
  deadline: "asc",
});

export const searchParamsAtom = atom((get) => ({
  filters: get(filtersAtom),
  sorts: get(sortsAtom)
}));

const Sidebar = () => {
  const user = useUser();
  const [filters, setFilters] = useAtom(filtersAtom);

  const { data: categories } = api.category.getAll.useQuery(undefined, {
    enabled: !!user,
  });

  return (
    <div className="flex flex-col gap-9">
      <div>
        <h4 className="text-neutral-400 mb-5">Categories</h4>
        <ul className="flex flex-col gap-2">
          {categories?.map((category) => (
            <li key={category.id}><Category category={category} /></li>
          ))}
        </ul>
        <ModalButton variant="regular" ModalComponent={<CreateCategory />} className="mt-4 w-full">
          Add Category
        </ModalButton>
      </div>

      <ModalButton variant="primary" ModalComponent={<CreateGoal />}>
        Add Goal
      </ModalButton>
      <input
        value={filters.categoryId}
        onChange={(e) => {
          setFilters(currentFilters => ({ ...currentFilters, categoryId: e.target.value }))
        }}
      />
    </div>
  );
};

export default Sidebar;
