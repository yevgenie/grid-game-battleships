import { Point } from "./Point";

export interface Positioned {
    // tslint:disable-next-line:array-type
    coordinates: Array<Point>
    color: string;
}