import { AppState } from "../types";
/**
 * Calculates the scroll center coordinates and the optimal zoom level to fit the constrained scrollable area within the viewport.
 *
 * This method first calculates the necessary zoom level to fit the entire constrained scrollable area within the viewport.
 * Then it calculates the constraints for the viewport given the new zoom level and the current scrollable area dimensions.
 * The function returns an object containing the optimal scroll positions and zoom level.
 *
 * @param scrollConstraints - The constraints of the scrollable area including width, height, and position.
 * @param appState - An object containing the current horizontal and vertical scroll positions.
 * @returns An object containing the calculated optimal horizontal and vertical scroll positions and zoom level.
 *
 * @example
 *
 * const { scrollX, scrollY, zoom } = this.calculateConstrainedScrollCenter(scrollConstraints, { scrollX, scrollY });
 */
export declare const calculateConstrainedScrollCenter: (state: AppState, { scrollX, scrollY }: Pick<AppState, "scrollX" | "scrollY">) => {
    scrollX: AppState["scrollX"];
    scrollY: AppState["scrollY"];
    zoom: AppState["zoom"];
};
/**
 * Constrains the AppState scroll values within the defined scroll constraints.
 *
 * @param state - The original AppState with the current scroll position, dimensions, and constraints.
 * @returns A new AppState object with scroll values constrained as per the defined constraints.
 */
export declare const constrainScrollState: (state: AppState, allowOverscroll?: boolean) => AppState;
