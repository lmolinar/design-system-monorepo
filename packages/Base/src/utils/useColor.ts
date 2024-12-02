import cx from "classnames";
import { useMemo } from "react";

export const colorValues = ["blue", "yellow", "green", "red", "orange", "gray", "black", "white"] as const;
export const shadeValues = [
    "light-5",
    "light-4",
    "light-3",
    "light-2",
    "light-1",
    "normal",
    "dark-1",
    "dark-2",
    "dark-3",
    "dark-4",
    "dark-5",
] as const;
export type Color = (typeof colorValues)[number];
export type Shade = (typeof shadeValues)[number];

export type ColorProp = {
    bg?: Color;
    bgShade?: Shade;
    color?: Color;
    colorShade?: Shade;
};

export const useColor = ({ bg, color, bgShade = "normal", colorShade = "normal" }: ColorProp) => {
    const className = useMemo(
        () => cx(color && `c-${color}-${colorShade}`, bg && `bg-${bg}-${bgShade}`),
        [bg, color, bgShade, colorShade]
    );
    return className;
};
