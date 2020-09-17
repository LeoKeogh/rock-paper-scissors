export interface Player {
  type: PlayerType,
  name: string,
  score: Score,
  winRatio?: number
}

export enum PlayerType {
  HUMAN,
  COMPUTER
}

export interface Score {
  wins: number,
  draws: number,
  losses: number,
}

export const DefaultNewPlayer: Player = {
  type: PlayerType.HUMAN,
  name: "John Doe",
  score: {
    wins: 0,
    draws: 0,
    losses: 0,
  }
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
  DRAW = "win",
}
