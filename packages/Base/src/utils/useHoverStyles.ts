import cx from "classnames";
import { useMemo } from "react";

import { BorderProp } from "./useBorder";
import { Color, Shade } from "./useColor";
import { getSpacingClasses, SpacingProp } from "./useSpacing";

export type Props = {
    bg?: Color;
    border?: BorderProp;
    bgShade?: Shade;
    color?: Color;
    colorShade?: Shade;
    margin?: SpacingProp;
    padding?: SpacingProp;
};

export const useHoverStyles = ({
    bg,
    border,
    bgShade = "normal",
    color,
    colorShade = "normal",
    margin,
    padding,
}: Props) => {
    const className = useMemo(
        () =>
            cx(getSpacingClasses("h-margin")(margin), getSpacingClasses("h-padding")(padding), {
                [`h-bg-${bg}-${bgShade}`]: Boolean(bg),
                [`h-c-${color}-${colorShade}`]: Boolean(color),
                [`h-b-c-${border?.color}-${border?.colorShade || "normal"}`]: Boolean(border?.color),
                [`h-b-r-${border?.radius}`]: Boolean(border?.radius),
                [`h-b-w-${border?.width}`]: Boolean(border?.width),
            }),
        [bg, bgShade, color, colorShade, margin, padding, border]
    );
    return className;
};
