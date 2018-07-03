import * as React from "react";
import "./App.css";
import Board from "./components/Board";
import battleShipsData, { BattleShip } from "./data/BattleShips.data";
import { Point } from "./models/Point";
import { Positioned } from "./models/Positioned";

class App extends React.Component<any, any> {
  private shipThumbnailVerticalPoint: Point = {
    x: 3,
    y: 1
  }
  private shipThumbnailHorizontalPoint: Point = {
    x: 1,
    y: 3
  }
  private gameBoardSize = {
    width: 10,
    height: 10
  }

  constructor(args: any) {
    super(args);
    this.state = {
      battleShips: battleShipsData,
      battleShipsTiled: this.convertBattleShipsToPositionedObjects(battleShipsData),
      selectedShipIndex: null,
      placedShips: []
    };
  }
  
  public selectShip = (index: number) => () => {
    if (this.state.battleShips[index].isPlaced) {
      return;
    }
    this.setState({
      selectedShipIndex: index
    });
  };

  public rotateShip = (index: number) => () => {
    const battleShips: BattleShip[] = this.state.battleShips;
    battleShips[index].isHorizontal = !battleShips[index].isHorizontal;
    this.setState({
      battleShips,
      battleShipsTiled: this.convertBattleShipsToPositionedObjects(battleShips)
    })
  }

  public placeShip = () => (atPoint: Point) => {
    if (this.state.selectedShipIndex === null) {
      return;
    }
    const battleShips: BattleShip[] = [...this.state.battleShips];
    const selectedBattleShip = battleShips[this.state.selectedShipIndex];
    const newShipPositioned = this.convertShipToPositioned(selectedBattleShip, atPoint);
    selectedBattleShip.isPlaced = true;
    
    if (this.isValidPlacement(newShipPositioned.coordinates)) {
      this.setState({
        placedShips: [...this.state.placedShips, newShipPositioned],
        battleShips,
        selectedShipIndex: null
      });
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Welcome to Battleships by Yev! (work in progress)
          </h1>
          <span>Select a ship, place it on the game board below.</span>
        </header>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {this.state.battleShips.map((ship: BattleShip, index: number) => {
            const isSelected: boolean = index === this.state.selectedShipIndex;
            const isPlaced: boolean = this.state.battleShips[index].isPlaced;
            return (
              <div key={index} style={{ position: "relative", marginTop: "5em", marginBottom: "5em" }}>
                {isSelected ?
                <span
                  style={{ position: "absolute", left: 0, right: 0, margin: "auto", color: "blue" }}
                  onClick={this.rotateShip(index)}>
                  Rotate
                </span> : null}
                <Board
                  onBoardClick={this.selectShip(index)}
                  hideAxisLabels={true}
                  positionedObjects={[this.state.battleShipsTiled[index]]}
                  cellHeight={7}
                  cellWidth={7}
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "rgba(0,0,0,.1)",
                    border: `2px ${isPlaced ? "dotted" : "solid"} ${isSelected || isPlaced ? "blue" : "white"
                    }`
                  }}
                  baseTileColor={"white"}
                />
                <span
                  style={{ position: "absolute", left: 0, right: 0, margin: "auto" }}>
                  {ship.name}
                </span>
              </div>
            );
          })}
        </div>
        <Board
          skewDegree={45}
          positionedObjects={this.state.placedShips}
          onCellClick={this.placeShip()} />
      </div>
    );
  }

  private convertBattleShipsToPositionedObjects(battleShips: BattleShip[]): Positioned[] {
    return battleShips.map((ship: BattleShip) => {
      const atPoint: Point = ship.isHorizontal ? this.shipThumbnailHorizontalPoint : this.shipThumbnailVerticalPoint;
      return this.convertShipToPositioned(ship, atPoint);
    });
  }

  private convertShipToPositioned(
    ship: BattleShip,
    atPoint: Point = { x: 1, y: 3 } // for default thumbnail board of 7x7,
  ): Positioned {
    const { size, color, isHorizontal } = ship;
    const coordinates: Point[] = [];
    for (let i = 0; i < size; i++) {
      const point: Point = {
        x: atPoint.x,
        y: atPoint.y
      };
      if (isHorizontal) {
        point.x += i;
      } else {
        point.y += i;
      }
      coordinates.push(point);
    }
    return {
      coordinates,
      color
    }
  }
  
  private isValidPlacement(coordinates: Point[]): boolean {
    const isInvalid: boolean = coordinates.some((c) => {
        return c.y > this.gameBoardSize.height - 1 || c.x > this.gameBoardSize.width - 1;
    });
    return !isInvalid;
  }
}

export default App;
