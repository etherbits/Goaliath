import type { Priority } from '@prisma/client'


interface Props {
  priority: Priority
}

const priorityColor = {
  HIGH: "bg-yellow-300",
  MEDIUM: "bg-blue-300",
  LOW: "bg-neutral-300",
}

const PriorityTag: React.FC<Props> = ({ priority }) => {
  return <div className='flex gap-2 w-60 items-center p-[6px_12px] rounded-md cursor-pointer hover:bg-neutral-800'>
    <div className={`w-3 h-3 rounded-sm ${priorityColor[priority]}`} />
    <span className='text-neutral-300 lowercase first-letter:uppercase'>{priority}</span>
  </div>
}

export default PriorityTag;
