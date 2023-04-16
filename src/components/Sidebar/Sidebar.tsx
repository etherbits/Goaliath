import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { ModalButton } from "../ModalButton";
import { CreateCategory } from "../modals/CreateCategory/CreateCategory";
import { CreateGoal } from "../modals/CreateGoal";
import { atom, useAtom } from "jotai";

const filtersAtom = atom({
    isActive: true,
    categoryId: ""
    });

const sortsAtom = atom({
    deadline: "asc",
    });

export const searchParamsAtom = atom((get) => ({
    filters: get(filtersAtom),
    sorts: get(sortsAtom)
    }));

export const Sidebar = () => {
  const user = useUser();
  const [filters, setFilters] = useAtom(filtersAtom);

  const { data: categories } = api.category.getAll.useQuery(undefined, {
    enabled: !!user,
  });

  // const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   addGoalFilter("categoryId", e.target.value);
  // };

  return (
    <div className="flex flex-col ">
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.id}</li>
        ))}
      </ul>
      <ModalButton variant="primary" ModalComponent={<CreateCategory />}>
        Add Category
      </ModalButton>
      --
      <ModalButton variant="primary" ModalComponent={<CreateGoal />}>
        Add Goal
      </ModalButton>
      <input
        value={filters.categoryId}
        onChange={(e) => {
          setFilters(currentFilters => ({...currentFilters, categoryId: e.target.value}))
        }}
      />
    </div>
  );
};
