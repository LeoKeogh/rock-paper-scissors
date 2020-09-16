export interface Player {
  type: PlayerType,
  name: string,
  score: Score
}

export enum PlayerType {
  HUMAN,
  COMPUTER
}

export interface Score {
  wins: number,
  losses: number,
  draws: number,
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
