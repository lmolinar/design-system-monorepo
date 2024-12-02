import cx from "classnames";
import { useMemo } from "react";

export type SpacingRanges = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SpacingObject = {
    top?: SpacingRanges;
    left?: SpacingRanges;
    bottom?: SpacingRanges;
    right?: SpacingRanges;
};

export type SpacingProp = SpacingRanges | SpacingObject;

export type Props = {
    margin?: SpacingProp;
    padding?: SpacingProp;
};

export const getSpacingClasses =
    (rule: "margin" | "padding" | "h-margin" | "h-padding") =>
    (value?: SpacingProp): Array<string> => {
        const spacingClassNames: Array<string> = [];

        if (!rule) return spacingClassNames;

        if (rule !== "margin" && rule !== "padding" && rule !== "h-margin" && rule !== "h-padding")
            return spacingClassNames;

        if (isFinite(value as number)) {
            const n = Number(value);

            // spacing values must be in the range 0-10
            if (n < 0 || n > 10) return [];

            if (n % 1 === 0.5) spacingClassNames.push(`${rule}-${Math.floor(n)}p5`);
            else spacingClassNames.push(`${rule}-${n}`);
        } else if (typeof value === "object") {
            for (const side in value) {
                // discard properties inherited through the prototype chain: https://eslint.org/docs/rules/guard-for-in
                if (Object.prototype.hasOwnProperty.call(value, side)) {
                    const n = Number(value[side]);

                    // spacing values must be in the range 0-10
                    if (n < 0 || n > 10) break;
                    if (n % 1 === 0.5) spacingClassNames.push(`${rule}-${side}-${Math.floor(n)}p5`);
                    else spacingClassNames.push(`${rule}-${side}-${n}`);
                }
            }
        }

        return spacingClassNames;
    };

export const useSpacing = ({ margin, padding }: Props) => {
    const className = useMemo(
        () => cx(...getSpacingClasses("margin")(margin), ...getSpacingClasses("padding")(padding)),
        [margin, padding]
    );

    return className;
};
