import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../game.model';

@Component({
  selector: 'app-player-score[player]',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.scss']
})
export class PlayerScoreComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit(): void {
  }

  displayScore(): string {
    const scores = []

    this.player.score.wins && scores.push(this.player.score.wins + " wins");
    this.player.score.draws && scores.push(this.player.score.draws + " draws");
    this.player.score.losses && scores.push(this.player.score.losses + " losses");

    return scores.join(" - ") || " - "
  }

}
