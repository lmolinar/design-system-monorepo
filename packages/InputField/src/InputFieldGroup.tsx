import "@lok/input-field/dist/styles.css";

import { Base, BaseProps } from "@lok/base";
import cx from "classnames";
import { FC } from "react";

export type InputFieldGroupProps = BaseProps;

export const InputFieldGroup: FC<InputFieldGroupProps> = ({ children, className, ...rest }) => {
    const classNames = cx("inputFieldGroup", className);

    const baseProps = {
        className: classNames,
        ...rest,
    };

    return <Base {...baseProps}>{children}</Base>;
};
