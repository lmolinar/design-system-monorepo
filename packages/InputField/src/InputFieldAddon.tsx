import "@lok/input-field/dist/styles.css";

import { Base, BaseProps } from "@lok/base";
import cx from "classnames";
import { FC } from "react";

export type InputFieldAddonProps = BaseProps & {
    position: "left" | "right";
};

export const InputFieldAddon: FC<InputFieldAddonProps> = ({ position, children, className, ...rest }) => {
    const classNames = cx("inputFieldAddon", className, {
        "inputFieldAddon--left": position === "left",
        "inputFieldAddon--right": position === "right",
    });

    const inputAddonProps = {
        className: classNames,
        ...rest,
    };

    return <Base {...inputAddonProps}>{children}</Base>;
};
