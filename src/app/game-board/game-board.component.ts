import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameItemComponent } from '../game-item/game-item.component';
import { GameItemType, Player, Score } from '../game.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(
    private playersService: PlayersService,
    private router: Router) { }

  player: Player;
  computer: Player;

  GameItemType = GameItemType;

  ngOnInit(): void {
    // const currentPlayer = this.playersService.getCurrentPlayer()
    // if (currentPlayer) {
    //   this.player = currentPlayer;
    // } else {
    //   this.router.navigate(["/welcome"]);
    // }
    this.player = {
      name: "Leo",
      score: {}
    }
  }

  onGameItemClick(itemType: GameItemType): void {
    switch (itemType) {
      case GameItemType.ROCK:
        this.player.score.wins = (this.player.score.wins || 0) + 1;
        break;
      case GameItemType.PAPER:
        this.player.score.draws = (this.player.score.draws || 0) + 1;
        break;
      case GameItemType.SCISSORS:
        this.player.score.losses = (this.player.score.losses || 0) + 1;
        break;
    }
  }

}
