import { Cell } from "src/models/Cell";

export interface Row extends Array<Cell> {
    [index: number]: Cell
}