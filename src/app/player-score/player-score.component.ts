import { Component, DoCheck, Input } from "@angular/core";
import { Player, PlayerType } from "../game.model";

@Component({
  selector: "app-player-score[player]",
  templateUrl: "./player-score.component.html",
  styleUrls: ["./player-score.component.scss"],
})
export class PlayerScoreComponent implements DoCheck {
  @Input() player?: Player;

  displayedPoints: string;
  displayedName: string;
  pointsTooltip: string;

  // Used instead of ngOnChanges because "Angular only calls the ngOnChanges hook when the value of the input property changes.
  // The value of the player property is the reference to the player object. Angular doesn’t care that the player's own properties change"
  ngDoCheck(): void {
    if (this.player) {
      this.displayedPoints = `${this.player.currentScore.won} Point${
        this.player.currentScore.won !== 1 ? "s" : ""
      }`;
      this.displayedName = `${this.player.name}${
        this.player.type === PlayerType.COMPUTER ? " (Computer)" : ""
      }`;
      this.refreshTooltip();
    }
  }

  refreshTooltip() {
    if (!this.player || !this.player.currentScore) {
      return;
    }

    this.pointsTooltip =
      "Current game: " +
      `${this.player.currentScore.won || "no"} win${
        this.player.currentScore.won !== 1 ? "s" : ""
      }` +
      ` - ${this.player.currentScore.lost || "no"} loss${
        this.player.currentScore.lost !== 1 ? "es" : ""
      }` +
      ` - ${this.player.currentScore.draw || "no"} draw${
        this.player.currentScore.draw !== 1 ? "s" : ""
      }`;

    if (this.player.currentScore.winRatio) {
      this.pointsTooltip += ` (${this.player.currentScore.winRatio}% win / loss  ratio)`;
    }
  }
}
