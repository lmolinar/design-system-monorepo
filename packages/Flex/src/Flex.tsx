import "@lok/flex/dist/styles.css";

import { Base, BaseProps, SpacingRanges } from "@lok/base";
import { Overwrite } from "@lok/types";
import cx from "classnames";
import { useMemo, ForwardRefExoticComponent, forwardRef } from "react";

export const alignItemsValues = [
    "stretch",
    "center",
    "flex-start",
    "flex-end",
    "baseline",
    "initial",
    "inherit",
] as const;
export const flexDirectionValues = ["row", "column", "row-reverse", "column-reverse"] as const;
export const flexWrapValues = ["wrap", "nowrap", "wrap-reverse"] as const;
export const justifyContentValues = [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "initial",
    "inherit",
] as const;

type GapProp = SpacingRanges | { row: SpacingRanges; column: SpacingRanges };
type JustifyContentProp = (typeof justifyContentValues)[number];
type FlexWrapProp = (typeof flexWrapValues)[number];
type AlignItemsProp = (typeof alignItemsValues)[number];
type FlexDirectionProp = (typeof flexDirectionValues)[number];

export type FlexProps<T = Element> = Overwrite<
    BaseProps<T>,
    {
        alignItems?: AlignItemsProp;
        flexDirection?: FlexDirectionProp;
        flexWrap?: FlexWrapProp;
        gap?: GapProp;
        inline?: boolean;
        justifyContent?: JustifyContentProp;
    }
>;

function getListOfGapClasses(value?: GapProp): Array<string> {
    const classNames = [];

    if (isFinite(value as number)) {
        const n = Number(value);

        // spacing values must be in the range 0-10
        if (n < 0 || n > 10) return [];

        if (n % 1 === 0.5) classNames.push(`gap-${Math.floor(n)}p5`);
        else classNames.push(`gap-${n}`);
    } else if (typeof value === "object") {
        for (const side in value) {
            // discard properties inherited through the prototype chain: https://eslint.org/docs/rules/guard-for-in
            if (Object.prototype.hasOwnProperty.call(value, side)) {
                const n = Number(value[side]);

                // spacing values must be in the range 0-10
                if (n < 0 || n > 10) break;
                if (n % 1 === 0.5) classNames.push(`${side}-gap-${Math.floor(n)}p5`);
                else classNames.push(`${side}-gap-${n}`);
            }
        }
    }

    return classNames;
}

export const Flex: ForwardRefExoticComponent<FlexProps> = forwardRef(
    (
        {
            justifyContent = "flex-start",
            flexDirection = "row",
            flexWrap = "wrap",
            alignItems = "flex-start",
            inline = false,
            children,
            className,
            gap,
            ...otherProps
        },
        ref
    ) => {
        const flexContainerClasses = useMemo(
            () =>
                cx(className, "flex", { "flex--inline": inline }, [
                    `dir-${flexDirection}`,
                    `jc-${justifyContent}`,
                    `w-${flexWrap}`,
                    `ai-${alignItems}`,
                    getListOfGapClasses(gap),
                ]),
            [className, inline, flexDirection, justifyContent, flexWrap, alignItems, gap]
        );

        if (!children) return null;

        return (
            <Base ref={ref} className={flexContainerClasses} {...otherProps}>
                {children}
            </Base>
        );
    }
);

Flex.displayName = "Flex";
