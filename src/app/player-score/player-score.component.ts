import { Component, DoCheck, Input, OnInit } from '@angular/core';
import _round from 'lodash/round';
import { Player, PlayerType } from '../game.model';


@Component({
  selector: 'app-player-score[player]',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.scss']
})
export class PlayerScoreComponent implements OnInit, DoCheck {

  @Input() player: Player;

  displyedName: string;
  pointsTooltip: string;

  constructor() { }

  // Used instead of ngOnChanges because "Angular only calls the ngOnChanges hook when the value of the input property changes.
  // The value of the player property is the reference to the player object. Angular doesn’t care that the player's own properties change"
  ngDoCheck(): void {
    this.calculateWinRatio()
  }

  ngOnInit(): void {
    this.displyedName = `${this.player.name} (${this.player.type === PlayerType.HUMAN ? "You" : "Computer"})`
  }

  calculateWinRatio() {
    const gamesPlayed = this.player.score.wins + this.player.score.losses;

    this.pointsTooltip =
    `(${this.player.score.wins || "no"} win${this.player.score.wins !== 1 ? "s" : ""}
    , ${this.player.score.losses || "no"} loss${this.player.score.losses !== 1 ? "es" : ""}
    , ${this.player.score.draws || "no"} draw${this.player.score.draws !== 1 ? "s" : ""})`

    const winRatio = gamesPlayed > 0 ? _round((this.player.score.wins / gamesPlayed) * 100) : undefined;
    if (winRatio) {
      this.pointsTooltip = `${winRatio}% win ratio ${this.pointsTooltip}`
    }
  }
}
