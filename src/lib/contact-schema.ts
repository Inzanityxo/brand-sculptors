import { z } from "zod";
import { en } from "@/content/en";

export const TOPICS = en.contact.fields.topics;
export const INVESTS = en.contact.fields.invests;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  topic: z.enum(TOPICS as unknown as [string, ...string[]]),
  invest: z.enum(INVESTS as unknown as [string, ...string[]]),
  message: z.string().trim().min(30).max(5000),
  consent: z.literal(true),
  // honeypot, must stay empty
  company: z.string().max(500).optional(),
  // ms timestamp when the form was rendered
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
