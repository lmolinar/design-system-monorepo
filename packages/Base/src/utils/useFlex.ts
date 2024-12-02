import cx from "classnames";
import { useMemo } from "react";

export type FlexItemProp = {
    order?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: "auto" | "initial" | "inherit" | "33pct" | "50pct" | "66pct" | number;
    alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
};

export const useFlexItem = ({ order, flexGrow, flexShrink, flexBasis, alignSelf }: FlexItemProp) => {
    const className = useMemo(
        () =>
            cx(
                order != null && `order-${order}`,
                flexGrow != null && `flex-grow-${flexGrow}`,
                flexShrink != null && `flex-shrink-${flexShrink}`,
                flexBasis && `flex-basis-${flexBasis}`,
                alignSelf && `align-self-${alignSelf}`
            ),
        [alignSelf, flexBasis, flexGrow, flexShrink, order]
    );
    return className;
};
