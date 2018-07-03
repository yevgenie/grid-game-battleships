import { ColorTile } from "./ColorTile";

export interface Cell extends Array<ColorTile> {
    [key: number]: ColorTile;
}