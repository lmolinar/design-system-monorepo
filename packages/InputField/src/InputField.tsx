import "@lok/input-field/dist/styles.css";

import cx from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ invalid, className, ...rest }, ref) => {
    const classNames = cx("inputField", className, {
        "inputField--error": invalid,
    });

    const inputProps = {
        className: classNames,
        ...rest,
    };

    return <input {...inputProps} ref={ref} />;
});

InputField.displayName = "InputField";
