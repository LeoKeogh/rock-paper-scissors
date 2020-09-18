export interface Player {
  type: PlayerType,
  name: string,
  playedItem?: GameItemType,
  currentScore?: Score,
  totalScore?: Score
}

export enum PlayerType {
  HUMAN = "human",
  COMPUTER = "computer"
}

export const NewPlayer: Player = {
  type: PlayerType.HUMAN,
  name: "John Doe",
  currentScore: {
    won: 0,
    draw: 0,
    lost: 0,
    winRatio: 0
  },
  totalScore: {
    won: 0,
    draw: 0,
    lost: 0,
    winRatio: 0
  }
}

export interface Score {
  won: number,
  draw: number,
  lost: number,
  winRatio: number
}


export enum GameItemType {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors"
}

export enum GameItemOrientation {
  UP = "up",
  DOWN = "down"
}

export enum GameResult {
  WIN = "win",
  LOSE = "lose",
  DRAW = "draw",
}
