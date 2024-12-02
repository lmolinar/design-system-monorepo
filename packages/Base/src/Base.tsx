import "@lok/base/dist/styles.css";

import { Overwrite } from "@lok/types";
import cx from "classnames";
import {
    AllHTMLAttributes,
    createElement,
    forwardRef,
    ForwardRefExoticComponent,
    ReactHTML,
    ReactNode,
    RefAttributes,
} from "react";

import { BorderProp, useBorder } from "./utils/useBorder";
import { Color, Shade, useColor } from "./utils/useColor";
import { FlexItemProp, useFlexItem } from "./utils/useFlex";
import { useHoverStyles } from "./utils/useHoverStyles";
import { SpacingProp, useSpacing } from "./utils/useSpacing";

const verticalAlignValues = ["top", "middle", "bottom", "baseline"] as const;
const cursorValues = ["pointer", "default", "not-allowed", "none", "progress", "text", "grab", "grabbing"] as const;
export type BaseProps<T = Element> = Overwrite<
    AllHTMLAttributes<T>,
    {
        children?: ReactNode;
        className?: string;
        bg?: Color;
        bgShade?: Shade;
        color?: Color;
        colorShade?: Shade;
        htmlTag?: keyof ReactHTML;
        margin?: SpacingProp;
        padding?: SpacingProp;
        border?: BorderProp;
        verticalAlign?: (typeof verticalAlignValues)[number];
        flexItem?: FlexItemProp;
        renderEmpty?: boolean;
        cursor?: (typeof cursorValues)[number];
        dataTestId?: string;
        hover?: {
            bg?: Color;
            border?: BorderProp;
            bgShade?: Shade;
            color?: Color;
            colorShade?: Shade;
            margin?: SpacingProp;
            padding?: SpacingProp;
        };
        transition?: boolean;
    }
> &
    RefAttributes<T>;

export const Base: ForwardRefExoticComponent<BaseProps> = forwardRef(
    (
        {
            htmlTag = "div",
            children,
            margin,
            padding,
            color,
            colorShade,
            bg,
            bgShade,
            border,
            flexItem,
            verticalAlign,
            renderEmpty,
            cursor,
            dataTestId,
            hover,
            transition,
            ...otherProps
        },
        ref
    ) => {
        const colorClassName = useColor({ color, bg, colorShade, bgShade });
        const spacingClassName = useSpacing({ margin, padding });
        const borderClassName = useBorder({
            radius: border?.radius,
            color: border?.color,
            colorShade: border?.colorShade,
            width: border?.width,
        });
        const flexClassName = useFlexItem({
            order: flexItem?.order,
            flexGrow: flexItem?.flexGrow,
            flexShrink: flexItem?.flexShrink,
            flexBasis: flexItem?.flexBasis,
            alignSelf: flexItem?.alignSelf,
        });
        const hoverClassName = useHoverStyles({
            bg: hover?.bg,
            border: hover?.border,
            bgShade: hover?.bgShade,
            color: hover?.color,
            colorShade: hover?.colorShade,
            margin: hover?.margin,
            padding: hover?.padding,
        });

        if (!children && !renderEmpty) return null;

        const verticalAlignmentClass = verticalAlign && `valign-${verticalAlign}`;
        const cursorTypeClass = cursor && `cursor-${cursor}`;
        const transitionClass = transition && "transition";

        const className = cx(
            otherProps.className,
            colorClassName,
            spacingClassName,
            borderClassName,
            flexClassName,
            verticalAlignmentClass,
            cursorTypeClass,
            hoverClassName,
            transitionClass
        );

        const forwardedProps = {
            ...otherProps,
            ...(className ? { className } : null),
            ...(dataTestId ? { "data-testid": dataTestId } : null),
        };

        return createElement(htmlTag as unknown as string, { ...forwardedProps, ref }, children);
    }
);

Base.displayName = "Base";
