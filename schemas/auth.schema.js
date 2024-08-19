import { z } from 'zod';

export const registerSchema = z.object({
    nombre: z
        .string({
            required_error: "El nombre es requerido",
        })
        .min(1, {
            message: "El nombre no puede estar vacío",
        }),
    email: z
        .string({
            required_error: 'El email es requerido',
        })
        .email({
            message: "El email es inválido",
        }),
    pass: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(6, {
            message: "La contraseña debe tener al menos 6 caracteres",
        })
        .max(10,{
            message: "La contraseña debe de tener maximo 10 caracteres"
        }),
    telefono: z
        .string({
            required_error: "El número de teléfono es necesario",
        })
        .regex(/^\d+$/, {
            message: "El número de teléfono debe contener solo dígitos",
        }),
    edad: z
        .number({
            required_error: "La edad es requerida",
        })
        .int()
        .min(18, {
            message: "Debes ser mayor de 18 años",
        }),
        nacimiento: z.preprocess((arg) => {
            if (typeof arg === "string" || arg instanceof Date) {
                return new Date(arg);
            }
        }, z.date({
            required_error: "La fecha de nacimiento es requerida",
        }).refine(date => date <= new Date(), {
            message: "La fecha de nacimiento no puede ser en el futuro",
        }).refine(date => {
            const age = new Date().getFullYear() - date.getFullYear();
            return age >= 18;
        }, {
            message: "Debes tener al menos 18 años",
        }))
});

export const loginSchema = z.object({
    email: z
    .string({
        required_error: "El email es requerido"
    })
    .email({
        message: "Email invalido"
    }),
    pass: z
    .string({
        required_error: "La contraseña es requerida",
    })
    .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
})
