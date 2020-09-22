import { Injectable } from "@angular/core";
import _round from "lodash/round";
import { GameItemType, GameResult, Player, Score } from "./game.model";

@Injectable({
  providedIn: "root",
})
export class GameService {
  determineResultAndRefreshScores(human: Player, computer: Player): GameResult {
    let humanResult = GameResult.DRAW;
    let computerResult = GameResult.DRAW;
    if (human.playedItem !== computer.playedItem) {
      const humanWon =
        (computer.playedItem === GameItemType.ROCK &&
          human.playedItem === GameItemType.PAPER) ||
        (computer.playedItem === GameItemType.PAPER &&
          human.playedItem === GameItemType.SCISSORS) ||
        (computer.playedItem === GameItemType.SCISSORS &&
          human.playedItem === GameItemType.ROCK);

      if (humanWon) {
        humanResult = GameResult.WIN;
        computerResult = GameResult.LOSE;
      } else {
        humanResult = GameResult.LOSE;
        computerResult = GameResult.WIN;
      }
    }

    this.refreshScores(human, humanResult);
    this.refreshScores(computer, computerResult);

    return humanResult;
  }

  private refreshScores(player: Player, result: GameResult): void {
    switch (result) {
      case GameResult.WIN:
        player.currentScore.won++;
        player.totalScore.won++;
        break;
      case GameResult.LOSE:
        player.currentScore.lost++;
        player.totalScore.lost++;
        break;
      case GameResult.DRAW:
        player.currentScore.draw++;
        player.totalScore.draw++;
        break;
    }

    this.refreshWinRatio(player.currentScore);
    this.refreshWinRatio(player.totalScore);
  }

  private refreshWinRatio(score: Score) {
    const gamesWonOrLost = score.won + score.lost;
    score.winRatio =
      gamesWonOrLost > 0
        ? _round((score.won / gamesWonOrLost) * 100)
        : undefined;
  }

  getRandomItemType(): GameItemType {
    const enumValues = [
      GameItemType.ROCK,
      GameItemType.PAPER,
      GameItemType.SCISSORS,
    ];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }
}
