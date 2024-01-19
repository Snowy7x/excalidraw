import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./UserList.scss";
import React from "react";
import clsx from "clsx";
import { Tooltip } from "./Tooltip";
import { useExcalidrawActionManager } from "./App";
import * as Popover from "@radix-ui/react-popover";
import { Island } from "./Island";
import { searchIcon } from "./icons";
import { t } from "../i18n";
import { isShallowEqual } from "../utils";
const FIRST_N_AVATARS = 3;
const SHOW_COLLABORATORS_FILTER_AT = 8;
const ConditionalTooltipWrapper = ({ shouldWrap, children, clientId, username, }) => shouldWrap ? (_jsx(Tooltip, { label: username || "Unknown user", children: children }, clientId)) : (_jsx(React.Fragment, { children: children }, clientId));
const renderCollaborator = ({ actionManager, collaborator, clientId, withName = false, shouldWrapWithTooltip = false, isBeingFollowed, }) => {
    const data = {
        clientId,
        collaborator,
        withName,
        isBeingFollowed,
    };
    const avatarJSX = actionManager.renderAction("goToCollaborator", data);
    return (_jsx(ConditionalTooltipWrapper, { clientId: clientId, username: collaborator.username, shouldWrap: shouldWrapWithTooltip, children: avatarJSX }, clientId));
};
const collaboratorComparatorKeys = [
    "avatarUrl",
    "id",
    "socketId",
    "username",
];
export const UserList = React.memo(({ className, mobile, collaborators, userToFollow }) => {
    const actionManager = useExcalidrawActionManager();
    const uniqueCollaboratorsMap = new Map();
    collaborators.forEach((collaborator, socketId) => {
        const userId = (collaborator.id || socketId);
        uniqueCollaboratorsMap.set(
        // filter on user id, else fall back on unique socketId
        userId, { ...collaborator, socketId });
    });
    const uniqueCollaboratorsArray = Array.from(uniqueCollaboratorsMap).filter(([_, collaborator]) => collaborator.username?.trim());
    const [searchTerm, setSearchTerm] = React.useState("");
    if (uniqueCollaboratorsArray.length === 0) {
        return null;
    }
    const searchTermNormalized = searchTerm.trim().toLowerCase();
    const filteredCollaborators = searchTermNormalized
        ? uniqueCollaboratorsArray.filter(([, collaborator]) => collaborator.username?.toLowerCase().includes(searchTerm))
        : uniqueCollaboratorsArray;
    const firstNCollaborators = uniqueCollaboratorsArray.slice(0, FIRST_N_AVATARS);
    const firstNAvatarsJSX = firstNCollaborators.map(([clientId, collaborator]) => renderCollaborator({
        actionManager,
        collaborator,
        clientId,
        shouldWrapWithTooltip: true,
        isBeingFollowed: collaborator.socketId === userToFollow,
    }));
    return mobile ? (_jsx("div", { className: clsx("UserList UserList_mobile", className), children: uniqueCollaboratorsArray.map(([clientId, collaborator]) => renderCollaborator({
            actionManager,
            collaborator,
            clientId,
            shouldWrapWithTooltip: true,
            isBeingFollowed: collaborator.socketId === userToFollow,
        })) })) : (_jsxs("div", { className: clsx("UserList", className), children: [firstNAvatarsJSX, uniqueCollaboratorsArray.length > FIRST_N_AVATARS && (_jsxs(Popover.Root, { onOpenChange: (isOpen) => {
                    if (!isOpen) {
                        setSearchTerm("");
                    }
                }, children: [_jsxs(Popover.Trigger, { className: "UserList__more", children: ["+", uniqueCollaboratorsArray.length - FIRST_N_AVATARS] }), _jsx(Popover.Content, { style: {
                            zIndex: 2,
                            width: "13rem",
                            textAlign: "left",
                        }, align: "end", sideOffset: 10, children: _jsxs(Island, { style: { overflow: "hidden" }, children: [uniqueCollaboratorsArray.length >=
                                    SHOW_COLLABORATORS_FILTER_AT && (_jsxs("div", { className: "UserList__search-wrapper", children: [searchIcon, _jsx("input", { className: "UserList__search", type: "text", placeholder: t("userList.search.placeholder"), value: searchTerm, onChange: (e) => {
                                                setSearchTerm(e.target.value);
                                            } })] })), _jsxs("div", { className: "dropdown-menu UserList__collaborators", children: [filteredCollaborators.length === 0 && (_jsx("div", { className: "UserList__collaborators__empty", children: t("userList.search.empty") })), _jsx("div", { className: "UserList__hint", children: t("userList.hint.text") }), filteredCollaborators.map(([clientId, collaborator]) => renderCollaborator({
                                            actionManager,
                                            collaborator,
                                            clientId,
                                            withName: true,
                                            isBeingFollowed: collaborator.socketId === userToFollow,
                                        }))] })] }) })] }))] }));
}, (prev, next) => {
    if (prev.collaborators.size !== next.collaborators.size ||
        prev.mobile !== next.mobile ||
        prev.className !== next.className ||
        prev.userToFollow !== next.userToFollow) {
        return false;
    }
    for (const [socketId, collaborator] of prev.collaborators) {
        const nextCollaborator = next.collaborators.get(socketId);
        if (!nextCollaborator ||
            !isShallowEqual(collaborator, nextCollaborator, collaboratorComparatorKeys)) {
            return false;
        }
    }
    return true;
});
