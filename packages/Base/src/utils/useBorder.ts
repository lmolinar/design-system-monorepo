import cx from "classnames";
import { useMemo } from "react";

import type { Color, Shade } from "./useColor";

const radiusValues = ["sm", "lg", "round"] as const;

export type BorderProp = {
    radius?: (typeof radiusValues)[number];
    color?: Color;
    colorShade?: Shade;
    width?: 1 | 2;
};

export const useBorder = ({ radius, color, colorShade = "normal", width }: BorderProp) => {
    const className = useMemo(
        () => cx(radius && `b-r-${radius}`, color && `b-c-${color}-${colorShade}`, width && `b-w-${width}`),
        [radius, color, colorShade, width]
    );
    return className;
};
