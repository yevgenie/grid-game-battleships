export interface BattleShip {
    name: string;
    size: number;
    isHorizontal: boolean;
    color: string;
    isPlaced?: boolean;
}

const battleShips: BattleShip[] = [
  {
    name: "Carrier",
    size: 5,
    isHorizontal: false,
    color: "#2ecc71",
  },
  {
    name: "Battleship",
    size: 4,
    isHorizontal: false,
    color: "#2ecc71"
  },
  {
    name: "Cruiser",
    size: 3,
    isHorizontal: false,
    color: "#2ecc71"
  },
  {
    name: "Submarine",
    size: 3,
    isHorizontal: false,
    color: "#2ecc71"
  },
  {
    name: "Destroyer",
    size: 2,
    isHorizontal: false,
    color: "#2ecc71"
  },
];

export default battleShips;
