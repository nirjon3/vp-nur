import { z } from "zod";

/** Bangladeshi mobile: 01XXXXXXXXX or +8801XXXXXXXXX */
const phoneRegex = /^(\+?880|0)1[3-9]\d{8}$/;

const optionalString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""));

const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => phoneRegex.test(v), { message: "সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন" });

export const citizenRequestSchema = z.object({
  name: z.string().trim().min(2, { message: "নাম প্রয়োজন" }).max(120),
  phone: phoneSchema,
  union: optionalString(120),
  category: z.enum([
    "general",
    "constituency",
    "development",
    "service",
    "grievance",
    "contact",
  ]),
  subject: z.string().trim().min(3, { message: "বিষয় লিখুন" }).max(200),
  description: z
    .string()
    .trim()
    .min(10, { message: "বিস্তারিত লিখুন (অন্তত ১০ অক্ষর)" })
    .max(5000),
  consent: z.boolean().refine((v) => v === true, {
    message: "তথ্য জমা দেওয়ার সম্মতি প্রয়োজন",
  }),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CitizenRequestInput = z.infer<typeof citizenRequestSchema>;

export const trackRequestSchema = z.object({
  ref: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^NRV-\d{8}-[A-Z2-9]{6}$/, { message: "সঠিক ট্র্যাকিং নম্বর লিখুন" }),
  phone: phoneSchema,
});

export const contactFormSchema = citizenRequestSchema.extend({
  category: z.literal("contact"),
});
