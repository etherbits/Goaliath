import { useUser } from "@clerk/nextjs";
import { Priority } from "@prisma/client";
import { useAtom } from "jotai";
import React, { useContext, useState } from "react";
import Button from "~/components/Button";
import { searchParamsAtom } from "~/components/Sidebar";
import { ModalContext } from "~/context/useModal";
import { api } from "~/utils/api";

const CreateGoal: React.FC = () => {
  const { toggleModal } = useContext(ModalContext);
  const { user } = useUser();
  const [searchParams] = useAtom(searchParamsAtom)

  const { data: categories } = api.category.getAll.useQuery(undefined, {
    enabled: !!user,
  });

  const { refetch: refetchGoals } = api.goal.getAll.useQuery(searchParams, {
    enabled: !!user,
  });

  const { mutate: mutateGoal } = api.goal.create.useMutation({
    onSuccess: () => {
      void refetchGoals();
    },
  });

  const [title, setTitle] = useState("test");
  const [description, setDescription] = useState("desc");
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [deadline, setDeadline] = useState("2023-04-22");
  const [isPublic, setIsPublic] = useState(false);
  const [categoryId, setCategoryId] = useState("clgdm8dua0000ueawdbmacf4l");

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutateGoal({
      title,
      description,
      priority,
      deadline: new Date(deadline),
      isPublic,
      categoryId,
    });

    toggleModal();
  };

  return (
    <form
      className="flex flex-col items-center gap-4 rounded-md bg-neutral-800 p-7"
      onSubmit={handleGoalSubmit}
    >
      <h3 className="text-lg font-medium text-neutral-50" > Create Goal </h3>
      <input
        autoFocus={true}
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className=" w-full rounded-md bg-neutral-700 bg-transparent p-1 text-neutral-200"
      />
      <textarea
        name="description"
        placeholder="description..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="w-full rounded-md bg-neutral-700 bg-transparent p-1 text-neutral-200"
      />
      <select
        name="priority"
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value as Priority);
        }}
        className="w-full rounded-md bg-neutral-700 bg-transparent p-1 text-neutral-200"
      >
        {
          Object.values(Priority).map((value) => (
            <option value={Priority[value]} key={Priority[value]} >
              {Priority[value]}
            </option>
          ))
        }
      </select>

      <label className="flex w-full flex-col justify-between gap-2 text-neutral-200" >
        !!!must be after today!!!
        <input
          type="date"
          name="deadline"
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
          className="w-full rounded-md bg-neutral-700 bg-transparent p-1 text-neutral-200"
        /> {" "}
      </label>
      <label className="flex w-full justify-between text-neutral-200" >
        public goal
        <input
          type="checkbox"
          name="isPublic"
          checked={isPublic}
          onChange={(e) => {
            setIsPublic(e.target.checked);
          }}
          placeholder="description..."
        />
      </label>
      <select
        name="category"
        value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
        }}
        className="w-full rounded-md bg-neutral-700 bg-transparent p-1 text-neutral-200"
      >
        <option value="" disabled hidden >
          Choose category
        </option>
        {
          categories?.map((category) => (
            <option key={category.id} value={category.id} >
              {category.name}
            </option>
          ))
        }
      </select>
      <div className="flex w-full justify-between gap-4" >
        <Button type="button" variant="secondary" onClick={toggleModal} >
          CANCEL
        </Button>
        <Button type="submit" > SUBMIT </Button>
      </div>
    </form>
  );
};

export default CreateGoal;
