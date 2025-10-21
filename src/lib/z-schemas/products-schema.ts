import { z } from "zod";

export const ProductSchema = z.object({
    user_id: z.string(),
    name: z.string().min(1, 'name field is required!'),
    sku: z.string().nullable().optional(),
    price: z.union([z.string(), z.number()]),
    quantity: z.union([z.string(), z.number()], 'quantity field is required'),
    lowStockAt: z.string().nullable().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
