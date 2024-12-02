import "@lok/text/dist/styles.css";

import { Base, BaseProps } from "@lok/base";
import { Overwrite } from "@lok/types";
import cx from "classnames";
import { forwardRef, ForwardRefExoticComponent } from "react";

export const fontWeightValues = ["regular", "medium", "semibold", "bold"] as const;
export const sizeValues = [
    "text-xs",
    "text-sm",
    "text-md",
    "text-lg",
    "text-xl",
    "title-xs",
    "title-sm",
    "title-md",
    "title-lg",
    "title-xl",
] as const;
export const textAlignValues = ["left", "center", "right"] as const;
export const truncateValues = [1, 2, 3] as const;

export type TextProps<T = Element> = Overwrite<
    BaseProps<T>,
    {
        fontWeight?: (typeof fontWeightValues)[number];
        italic?: boolean;
        size?: (typeof sizeValues)[number];
        textAlign?: (typeof textAlignValues)[number];
        truncate?: (typeof truncateValues)[number];
        underline?: boolean;
        underlineHover?: boolean;
        uppercase?: boolean;
    }
>;

export const Text: ForwardRefExoticComponent<TextProps> = forwardRef(
    (
        {
            children,
            className,
            fontWeight = "regular",
            italic,
            size = "text-md",
            textAlign,
            truncate,
            underline,
            underlineHover,
            uppercase,
            ...props
        },
        ref
    ) => {
        if (!children) return null;

        const decoration = {
            italic,
            underline,
            uppercase,
            "underline-h": underlineHover,
        };

        const fontWeightClassName = `fw-${fontWeight}`;
        const fontSize = size;
        const alignment = textAlign && `txt-align-${textAlign}`;
        const truncation = truncate && `trunc-${truncate}`;

        return (
            <Base
                ref={ref}
                className={cx(className, alignment, decoration, fontSize, fontWeightClassName, truncation)}
                {...props}
            >
                {children}
            </Base>
        );
    }
);

Text.displayName = "Text";
