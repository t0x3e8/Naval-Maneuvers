import { PawnType } from './gameEnums.js'

export default {
  board: {
    numberOfColumns: 12,
    numberOfRows: 18,
    movesPerTurn: 1,
    map: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 5, 3, 5, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0],
      [0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 6, 4, 6, 2, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 6, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 6, 4, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]
  },
  pawns: [
    {
      typeId: PawnType.ENEMY,
      name: 'Enemy ship',
      svgName: 'none.svg',
      range: 0,
      destroys: [],
      destroyed: [],
      fleetSize: 0
    },
    {
      typeId: PawnType.BATTLESHIP,
      name: 'Battleship',
      svgName: 'battleship.svg',
      range: 2,
      destroys: [
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.BATTLESHIP,
        PawnType.SUBMARINE,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 3
    },
    {
      typeId: PawnType.MISSILE,
      name: 'Missile Ship',
      svgName: 'missileship.svg',
      range: 1,
      destroys: [
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP,
        PawnType.BATTERY
      ],
      destroyed: [
        PawnType.MISSILE,
        PawnType.BATTLESHIP,
        PawnType.SUBMARINE,
        PawnType.MINE
      ],
      fleetSize: 3
    },
    {
      typeId: PawnType.CRUISER,
      name: 'Cruiser',
      svgName: 'cruiser.svg',
      range: 2,
      destroys: [
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.CRUISER,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.SUBMARINE,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 3
    },
    {
      typeId: PawnType.DESTROYER,
      name: 'Destroyer',
      svgName: 'destroyer.svg',
      range: 4,
      destroys: [
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.DESTROYER,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.SUBMARINE,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.SUBMARINE,
      name: 'Submarine',
      svgName: 'submarine.svg',
      range: 2,
      destroys: [
        PawnType.SUBMARINE,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.DESTROYER,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.ESCORT,
      name: 'Escort',
      svgName: 'escort.svg',
      range: 3,
      destroys: [
        PawnType.ESCORT,
        PawnType.SUBMARINE,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.ESCORT,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.MINESWEEPER,
      name: 'Minesweeper',
      svgName: 'minesweeper.svg',
      range: 2,
      destroys: [PawnType.MINESWEEPER, PawnType.LANDINGSHIP],
      destroyed: [
        PawnType.MINESWEEPER,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.LANDINGSHIP,
      name: 'Landing Ship',
      svgName: 'landingship.svg',
      range: 2,
      destroys: [],
      destroyed: [
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 1
    },
    {
      typeId: PawnType.BATTERY,
      name: 'Shore Battery',
      svgName: 'battery.svg',
      range: 0,
      destroys: [
        PawnType.BATTLESHIP,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [PawnType.MISSILE],
      fleetSize: 4
    },
    {
      typeId: PawnType.MINE,
      name: 'Mine',
      svgName: 'mine.svg',
      range: 0,
      destroys: [
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.LANDINGSHIP
      ],
      destroyed: [PawnType.MINESWEEPER],
      fleetSize: 6
    }
  ]
}
