import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Button } from "~/components/Button";
import { ModalContext } from "~/context/useModal";
import { api } from "~/utils/api";

interface Props {
  refetchCategories: () => void;
}

export const CreateCategory: React.FC<Props> = ({ refetchCategories }) => {
  const { toggleModal } = useContext(ModalContext);

  const { mutate: mutateCategory } = api.category.create.useMutation({
    onSuccess: () => {
      void refetchCategories();
    },
  });

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("/assets/images/box.svg");

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutateCategory({
      name,
      icon,
    });
    
    toggleModal();
  };

  return (
    <form
      className="flex flex-col items-center gap-4 rounded-md bg-neutral-800 p-7"
      onSubmit={handleCategorySubmit}
    >
      <h3 className="text-lg font-medium text-neutral-50">Create Category</h3>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="w-full rounded-md bg-neutral-700 p-1 text-neutral-200"
      />
      <input
        type="text"
        name="icon"
        placeholder="icon path"
        value={icon}
        onChange={(e) => {
          setIcon(e.target.value);
        }}
        className="w-full rounded-md bg-neutral-700 p-1 text-neutral-200"
      />
      <div className="flex w-full justify-between gap-4">
        <Button type="button" variant="secondary" onClick={toggleModal}>
          CANCEL
        </Button>
        <Button type="submit">SUBMIT</Button>
      </div>
    </form>
  );
};
