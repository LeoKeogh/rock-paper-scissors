import _round from "lodash/round";

export interface Player {
  name: string;
  type: PlayerType;
  playedItem?: GameItemType;
  currentScore?: Score;
  totalScore?: Score;

  refreshScores(result: GameResult): void;
}

export class PlayerImpl implements Player {
  name: string;
  type: PlayerType;
  playedItem?: GameItemType;
  currentScore?: Score;
  totalScore?: Score;

  constructor(
    name: string,
    type: PlayerType = PlayerType.HUMAN,
    currentScore: Score = new ScoreImpl(),
    totalScore: Score = new ScoreImpl()
  ) {
    this.name = name;
    this.type = type;
    this.currentScore = currentScore;
    this.totalScore = totalScore;
  }

  refreshScores(result: GameResult): void {
    switch (result) {
      case GameResult.WIN:
        this.currentScore.won++;
        this.totalScore.won++;
        break;
      case GameResult.LOSE:
        this.currentScore.lost++;
        this.totalScore.lost++;
        break;
      case GameResult.DRAW:
        this.currentScore.draw++;
        this.totalScore.draw++;
        break;
    }

    this.refreshWinRatio(this.currentScore);
    this.refreshWinRatio(this.totalScore);
  }

  private refreshWinRatio(score: Score) {
    const gamesWonOrLost = score.won + score.lost;
    score.winRatio =
      gamesWonOrLost > 0 ? _round((score.won / gamesWonOrLost) * 100) : 0;
  }

  static from(source: Player): Player {
    let result = new PlayerImpl(source.name, source.type);
    result.currentScore = ScoreImpl.from(source.currentScore);
    result.totalScore = ScoreImpl.from(source.totalScore);

    return result;
  }
}

export interface Score {
  won: number;
  draw: number;
  lost: number;
  winRatio: number;

  refreshWinRatio(): void;
}

export class ScoreImpl implements Score {
  won: number = 0;
  draw: number = 0;
  lost: number = 0;
  winRatio: number = 0;

  constructor(
    won: number = 0,
    draw: number = 0,
    lost: number = 0,
    winRatio: number = 0
  ) {
    this.won = won;
    this.draw = draw;
    this.lost = lost;
    this.winRatio = winRatio;
  }

  refreshWinRatio() {
    const gamesWonOrLost = this.won + this.lost;
    this.winRatio =
      gamesWonOrLost > 0
        ? _round((this.won / gamesWonOrLost) * 100)
        : undefined;
  }

  static from(other?: Score): Score {
    let result = new ScoreImpl();
    result.won = other?.won || 0;
    result.draw = other?.draw || 0;
    result.lost = other?.lost || 0;
    result.winRatio = other?.winRatio || 0;

    return result;
  }
}

export enum PlayerType {
  HUMAN = "human",
  COMPUTER = "computer",
}

export enum GameItemType {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export enum GameItemOrientation {
  UP = "up",
  DOWN = "down",
}

export enum GameResult {
  WIN = "win",
  LOSE = "lose",
  DRAW = "draw",
}
