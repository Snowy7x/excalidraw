import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getClientColor } from "../clients";
import { Avatar } from "../components/Avatar";
import { eyeIcon } from "../components/icons";
import { t } from "../i18n";
import { register } from "./register";
export const actionGoToCollaborator = register({
    name: "goToCollaborator",
    viewMode: true,
    trackEvent: { category: "collab" },
    perform: (_elements, appState, collaborator) => {
        if (!collaborator.socketId ||
            appState.userToFollow?.socketId === collaborator.socketId ||
            collaborator.isCurrentUser) {
            return {
                appState: {
                    ...appState,
                    userToFollow: null,
                },
                commitToHistory: false,
            };
        }
        return {
            appState: {
                ...appState,
                userToFollow: {
                    socketId: collaborator.socketId,
                    username: collaborator.username || "",
                },
                // Close mobile menu
                openMenu: appState.openMenu === "canvas" ? null : appState.openMenu,
            },
            commitToHistory: false,
        };
    },
    PanelComponent: ({ updateData, data, appState }) => {
        const { clientId, collaborator, withName, isBeingFollowed } = data;
        const background = getClientColor(clientId);
        return withName ? (_jsxs("div", { className: "dropdown-menu-item dropdown-menu-item-base UserList__collaborator", onClick: () => updateData(collaborator), children: [_jsx(Avatar, { color: background, onClick: () => { }, name: collaborator.username || "", src: collaborator.avatarUrl, isBeingFollowed: isBeingFollowed, isCurrentUser: collaborator.isCurrentUser === true }), collaborator.username, _jsx("div", { className: "UserList__collaborator-follow-status-icon", style: { visibility: isBeingFollowed ? "visible" : "hidden" }, title: isBeingFollowed ? t("userList.hint.followStatus") : undefined, "aria-hidden": true, children: eyeIcon })] })) : (_jsx(Avatar, { color: background, onClick: () => {
                updateData(collaborator);
            }, name: collaborator.username || "", src: collaborator.avatarUrl, isBeingFollowed: isBeingFollowed, isCurrentUser: collaborator.isCurrentUser === true }));
    },
});
