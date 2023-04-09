import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(3).max(64),
  icon: z.string().min(1),
});

export default categorySchema;
