export interface Player {
  name: string,
  score: Score
}

export interface Score {
  wins?: number,
  draws?: number,
  losses?: number,
}

export enum GameItemType {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors"
}
