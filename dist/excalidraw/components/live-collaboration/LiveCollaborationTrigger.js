import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from "../../i18n";
import { usersIcon } from "../icons";
import { Button } from "../Button";
import clsx from "clsx";
import "./LiveCollaborationTrigger.scss";
import { useUIAppState } from "../../context/ui-appState";
const LiveCollaborationTrigger = ({ isCollaborating, onSelect, ...rest }) => {
    const appState = useUIAppState();
    return (_jsxs(Button, { ...rest, className: clsx("collab-button", { active: isCollaborating }), type: "button", onSelect: onSelect, style: { position: "relative" }, title: t("labels.liveCollaboration"), children: [usersIcon, appState.collaborators.size > 0 && (_jsx("div", { className: "CollabButton-collaborators", children: appState.collaborators.size }))] }));
};
export default LiveCollaborationTrigger;
LiveCollaborationTrigger.displayName = "LiveCollaborationTrigger";
