export type Video = {
    // id del reel de Instagram: instagram.com/reel/<id>/
    id: string;
    title: string;
    description: string;
};

export const videos: Video[] = [
    {
        id: "DMBpWycyQGU",
        title: "¿Es difícil construir desde cero una casa?",
        description: "Así es el proceso, paso a paso.",
    },
    {
        id: "DL5DX5MxnZ5",
        title: "¿Qué es mejor? Comprar o construir tu casa",
        description: "La diferencia real entre las dos opciones.",
    },
    {
        id: "DJpru-ESSct",
        title: "El secreto detrás de las casas en preventa",
        description: "Qué ventajas tiene comprar antes.",
    },
];

export const reelUrl = (id: string) => `https://www.instagram.com/reel/${id}/`;

export const reelEmbedUrl = (id: string) =>
    `https://www.instagram.com/reel/${id}/embed`;
