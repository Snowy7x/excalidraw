import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import clsx from "clsx";
import "./FilledButton.scss";
export const FilledButton = forwardRef(({ children, startIcon, onClick, label, variant = "filled", color = "primary", size = "medium", fullWidth, className, }, ref) => {
    return (_jsxs("button", { className: clsx("ExcButton", `ExcButton--color-${color}`, `ExcButton--variant-${variant}`, `ExcButton--size-${size}`, { "ExcButton--fullWidth": fullWidth }, className), onClick: onClick, type: "button", "aria-label": label, ref: ref, children: [startIcon && (_jsx("div", { className: "ExcButton__icon", "aria-hidden": true, children: startIcon })), variant !== "icon" && (children ?? label)] }));
});
