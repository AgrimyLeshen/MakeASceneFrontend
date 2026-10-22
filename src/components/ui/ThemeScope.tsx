import type { CSSProperties, ReactNode } from "react";
import { isThemeId, themes } from "@/lib/themes";

interface ThemeScopeProps {

    /** theme id: if empty or undefined it uses the global.css as standard */
    themeId?: string;
    children: ReactNode;
}


export default function ThemeScope({ themeId, children }: ThemeScopeProps) {

    const theme = themeId && isThemeId(themeId) ? themes[themeId] : undefined;

    const style = theme
        ? (Object.fromEntries(Object.entries(theme).map(([token, value]) => [`--${token}`, value]),) as CSSProperties)
        : undefined;

    return (
        <div style={style} className="min-h-screen bg-background text-text">
            {children}
        </div>
    );
}