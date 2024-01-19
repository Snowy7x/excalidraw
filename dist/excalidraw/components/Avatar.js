import { jsx as _jsx } from "react/jsx-runtime";
import "./Avatar.scss";
import { useState } from "react";
import { getNameInitial } from "../clients";
import clsx from "clsx";
export const Avatar = ({ color, onClick, name, src, isBeingFollowed, isCurrentUser, }) => {
    const shortName = getNameInitial(name);
    const [error, setError] = useState(false);
    const loadImg = !error && src;
    const style = loadImg ? undefined : { background: color };
    return (_jsx("div", { className: clsx("Avatar", {
            "Avatar--is-followed": isBeingFollowed,
            "Avatar--is-current-user": isCurrentUser,
        }), style: style, onClick: onClick, children: loadImg ? (_jsx("img", { className: "Avatar-img", src: src, alt: shortName, referrerPolicy: "no-referrer", onError: () => setError(true) })) : (shortName) }));
};
