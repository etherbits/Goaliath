import { Priority } from "@prisma/client";
import { z } from "zod";

const goalSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string(),
  priority: z.nativeEnum(Priority),
  deadline: z.date().min(new Date()),
  isPublic: z.boolean(),
  categoryId: z.string().min(1),
});

export default goalSchema;
