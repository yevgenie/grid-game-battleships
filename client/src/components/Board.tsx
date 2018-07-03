import * as React from "react";
import { Cell } from "../models/Cell";
import { ColorTile } from "../models/ColorTile";
import { Point } from "../models/Point";
import { Positioned } from "../models/Positioned";
import { Row } from "../models/Row";

interface BoardState {
  rows: Row[];
}

interface BoardProps {
  cellHeight?: number;
  cellWidth?: number;
  baseTileColor?: string;
  children?: any;
  style?: any;
  positionedObjects?: Positioned[];
  hideAxisLabels?: boolean;
  onBoardClick?: any;
  onCellClick?: any;
  skewDegree?: number;
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(args: any) {
    super(args);
    this.state = {
      rows: []
    };
  }

  public componentDidMount() {
    const width = this.props.cellWidth ? this.props.cellWidth : 10;
    const height = this.props.cellHeight ? this.props.cellHeight : 10;
    this.createBoard(width, height);
  }

  public createBoard(width: number, height: number) {
    const baseTile = {
      color: this.props.baseTileColor ? this.props.baseTileColor : "#34495e"
    } as ColorTile;

    const rows: Row[] = [];
    for (let y = 0; y < height; y++) {
      const row: Row = [];
      for (let x = 0; x < width; x++) {
        const cell: Cell = [baseTile];
        row.push(cell);
      }
      rows.push(row);
    }

    if (this.props.positionedObjects) {
      this.props.positionedObjects.forEach((positionedObject: Positioned) => {
        positionedObject.coordinates.forEach(coordinate => {
          rows[coordinate.y][coordinate.x].push({
            color: positionedObject.color
          });
        });
      });
    }

    this.setState({
      rows
    });
  }

  public refreshPositionedObjects() {
    const height = this.state.rows.length;
    const width = height > 0 ? this.state.rows[0].length : 0;
    this.createBoard(width, height);
  }

  public componentWillReceiveProps(newProps: any) {
    this.props = newProps;
    this.refreshPositionedObjects();
  }

  public onCellClick = (atPoint: Point) => () => {
    if (this.props.onCellClick) {
      this.props.onCellClick(atPoint);
    }
  };

  public render() {
    const skewCss = this.props.skewDegree ? {
      transformStyle: "preserve-3d",
      transform: `rotateX(${this.props.skewDegree}deg)`
    } : {};
    return (
      <div style={{ perspective: "1000px" }}>
        <div
          onClick={this.props.onBoardClick}
          style={{
            margin: "26px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            height: `500px`,
            width: `500px`,
            ...skewCss,
            ...this.props.style
          }}
        >
          {this.state.rows.map((row: Row, rowIndex: number) => {
            return (
              <div
                key={rowIndex}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  flex: 1
                }}
              >
                {this.props.hideAxisLabels ? null : (
                  <AxisLabel
                    label={rowIndex}
                    style={{
                      top: "50%",
                      left: "-18px"
                    }}
                  />
                )}
                {row.map((cell: Cell, cellIndex: number) => {
                  const topTile = cell.slice(-1).pop() as ColorTile;
                  return (
                    <div
                      key={cellIndex}
                      style={{ flex: 1, margin: "1px", position: "relative" }}
                    >
                      {rowIndex === 0 && !this.props.hideAxisLabels ? (
                        <AxisLabel
                          style={{
                            top: "-18px",
                            left: "50%",
                            transform: "translateX(-50%)"
                          }}
                          label={cellIndex}
                        />
                      ) : null}
                      <div
                        onClick={this.onCellClick({
                          x: cellIndex,
                          y: rowIndex
                        })}
                        style={{
                          backgroundColor: topTile
                            ? topTile.color
                            : "transparent",
                          height: "100%",
                          width: "100%"
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const AxisLabel = (props: { label: string | number; style: any }) => {
  return (
    <span
      style={{
        color: "#2c3e50",
        position: "absolute",
        transform: "translateY(-50%)",
        ...props.style
      }}
    >
      {props.label}
    </span>
  );
};

export default Board;
