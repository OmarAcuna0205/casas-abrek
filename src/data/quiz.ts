import { site } from "@/data/site";

export type QuizOption = {
    id: string;
    label: string;
};

export type QuizQuestion = {
    id: string;
    // dato que se lee antes de la pregunta (precio, enganche). Solo en movil:
    // en desktop ya esta en el panel de Casa Sinaí. Lo que va entre ** sale en negritas
    note?: string;
    title: string;
    // como aparece la respuesta en el WhatsApp que le llega a Josué
    summary: string;
    options: QuizOption[];
};

export const questions: QuizQuestion[] = [
    {
        id: "perfil",
        title: "¿Qué describe mejor lo que estás buscando?",
        summary: "Perfil",
        options: [
            { id: "para-mi", label: "Busco una casa cómoda de una sola planta para mí." },
            { id: "padres", label: "Busco una casa cómoda y segura para mis padres." },
            { id: "familia", label: "Buscamos una casa familiar para nuestra siguiente etapa." },
            { id: "explorando", label: "Solo estoy explorando opciones." },
        ],
    },
    {
        id: "tiempo",
        // el \n solo brinca en movil; en desktop cuenta como espacio
        title: "Si encontraras la casa adecuada,\n¿Cuándo te gustaría comprar?",
        summary: "Cuándo compraría",
        options: [
            { id: "3-meses", label: "Dentro de los próximos 3 meses." },
            { id: "6-meses", label: "Dentro de 4 a 6 meses." },
            { id: "12-meses", label: "Dentro de 7 a 12 meses." },
            { id: "investigando", label: "Solo estoy investigando por ahora." },
        ],
    },
    {
        id: "presupuesto",
        note: "Precio de lanzamiento de Casa Sinaí: **$5,100,000 MXN**.",
        title: "¿En qué rango se encuentra tu presupuesto de compra?",
        summary: "Presupuesto",
        options: [
            { id: "menos-4", label: "Menos de $4,000,000." },
            { id: "4-a-5", label: "De $4,000,000 a $4,999,999." },
            { id: "5-a-5.5", label: "De $5,000,000 a $5,500,000." },
            { id: "mas-5.5", label: "Más de $5,500,000." },
        ],
    },
    {
        id: "pago",
        title: "¿Cómo realizarías la compra?",
        summary: "Forma de compra",
        options: [
            { id: "propios", label: "Con recursos propios." },
            { id: "preaprobado", label: "Con un crédito hipotecario ya preaprobado." },
            { id: "mixto", label: "Con recursos propios más crédito hipotecario." },
            { id: "tramite", label: "Necesito iniciar el trámite de un crédito." },
        ],
    },
    {
        id: "enganche",
        note: "Enganche de lanzamiento: **$510,000**.\nYa incluye el apartado de **$50,000**.",
        title: "¿El enganche está dentro de tus posibilidades?",
        summary: "Enganche",
        options: [
            { id: "si", label: "Sí, puedo cubrirlo." },
            { id: "probable", label: "Probablemente sí; necesito revisar las condiciones." },
            { id: "vender", label: "Dependo de vender otra propiedad." },
            { id: "no", label: "No por el momento." },
        ],
    },
    {
        id: "preventa",
        title: "¿Considerarías comprar en preventa si conoces el contrato, las especificaciones, el proceso de construcción y las condiciones de compra?",
        summary: "Preventa",
        options: [
            { id: "si", label: "Sí, compraría en preventa." },
            { id: "condiciones", label: "Sí, pero primero quiero conocer todas las condiciones." },
            { id: "terminada", label: "Prefiero esperar hasta que la casa esté terminada." },
        ],
    },
];

export const schedules = [
    "9:00 a.m. a 12:00 p.m.",
    "12:00 p.m. a 4:00 p.m.",
    "4:00 p.m. a 7:00 p.m.",
    "Prefiero recibir primero un mensaje por WhatsApp.",
];

// id de la pregunta -> id de la opcion elegida
export type Answers = Record<string, string>;

// el cliente lo manda desde su WhatsApp; a Josué le llega con todo lo que contesto
export function buildMessage(name: string, schedule: string, answers: Answers) {
    const lines = questions.map((question) => {
        const option = question.options.find(
            (item) => item.id === answers[question.id]
        );
        return `${question.summary}: ${option?.label ?? "Sin respuesta"}`;
    });

    return [
        `Hola, soy ${name}. Respondí el cuestionario de Casa Sinaí.`,
        "",
        ...lines,
        "",
        `Horario para contactarme: ${schedule}`,
        "",
        `Recuerda visitar nuestra página web: ${site.url}`,
    ].join("\n");
}
