import { z } from "zod";
import { create } from "zustand";
import {
  goalFiltersSchema,
  goalInputSchema,
  goalSortSchema,
} from "~/schema/goal";

type GoalInput = z.infer<typeof goalInputSchema>;
type GoalFilters = z.infer<typeof goalFiltersSchema>;
type GoalFilterKeys = keyof GoalFilters;
type GoalSort = z.infer<typeof goalSortSchema>;
type GoalSortKeys = keyof GoalSort;

// goalFiltersSchema
interface FilterStore {
  goalInput: GoalInput;
  addGoalFilter: (
    arg0: GoalFilterKeys,
    arg1: GoalFilters[GoalFilterKeys]
  ) => void;
  changeGoalSort: (arg0: GoalSortKeys, arg1: GoalSort[GoalSortKeys]) => void;
}

const addFilter = (
  goalInput: GoalInput,
  field: GoalFilterKeys,
  value: GoalFilters[GoalFilterKeys]
): GoalInput => {
  if (field === "categoryId" && typeof value === "string") {
    goalInput.filterBy.categoryId = value;
  } else if (field === "isActive" && typeof value === "boolean") {
    goalInput.filterBy.isActive = value;
  }

  return { ...goalInput };
};

const changeSort = (
  goalInput: GoalInput,
  field: GoalSortKeys,
  value: GoalSort[GoalSortKeys]
): GoalInput => {
  goalInput.sortBy[field] = value;

  return { ...goalInput };
};

export const useFilterStore = create<FilterStore>()((set) => ({
  goalInput: {
    filterBy: {},
    sortBy: {
      field: "deadline",
      order: "asc",
    },
  },
  addGoalFilter: (field, value) =>
    set((state) => ({
      goalInput: addFilter(state.goalInput, field, value),
    })),
  changeGoalSort: (field, value) =>
    set((state) => ({
      goalInput: changeSort(state.goalInput, field, value),
    })),
}));
