import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { GameItemOrientation, GameItemType, GameResult } from "../game.model";
import _delay from "lodash/delay";

@Component({
  selector: "app-game-items-played",
  templateUrl: "./game-items-played.component.html",
  styleUrls: ["./game-items-played.component.scss"],
})
export class GameItemsPlayedComponent implements OnChanges {
  @Input() humanItemType?: GameItemType;
  @Input() computerItemType?: GameItemType;

  @Input() goreEnabled: boolean = false;

  @Input() humanResult: GameResult;

  GameItemOrientation = GameItemOrientation;

  resultMessage?: string;

  ngOnChanges(): void {
    this.resultMessage = undefined;

    // small delay for css animation
    _delay(() => {
      switch (this.humanResult) {
        case GameResult.WIN:
          this.resultMessage = "Victory!";
          break;
        case GameResult.DRAW:
          this.resultMessage = "Stalemate!";
          break;
        case GameResult.LOSE:
          this.resultMessage = "Defeat!";
          break;
      }
    }, 10);
  }
}
