import { Injectable } from "@angular/core";
import { GameItemType, GameResult, Player } from "./game.model";

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

    human.refreshScores(humanResult);
    computer.refreshScores(computerResult);

    return humanResult;
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
