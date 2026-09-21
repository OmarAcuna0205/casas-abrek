import { siFacebook, siInstagram, siTiktok } from "simple-icons";

// logos oficiales de las redes (trazos de simple-icons), con sus colores de marca

type LogoProps = { className?: string };

export function InstagramLogo({ className }: LogoProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
            <defs>
                <linearGradient id="instagram-gradient" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FEDA75" />
                    <stop offset="25%" stopColor="#FA7E1E" />
                    <stop offset="50%" stopColor="#D62976" />
                    <stop offset="75%" stopColor="#962FBF" />
                    <stop offset="100%" stopColor="#4F5BD5" />
                </linearGradient>
            </defs>
            <path d={siInstagram.path} fill="url(#instagram-gradient)" />
        </svg>
    );
}

export function FacebookLogo({ className }: LogoProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
            <path d={siFacebook.path} fill={`#${siFacebook.hex}`} />
        </svg>
    );
}

// el logo de TikTok se arma con la nota en negro y dos sombras, cian y roja
export function TiktokLogo({ className }: LogoProps) {
    return (
        <svg viewBox="-1 -1 26 26" aria-hidden="true" className={className}>
            <path d={siTiktok.path} fill="#25F4EE" transform="translate(-0.6 -0.6)" />
            <path d={siTiktok.path} fill="#FE2C55" transform="translate(0.6 0.6)" />
            <path d={siTiktok.path} fill={`#${siTiktok.hex}`} />
        </svg>
    );
}
