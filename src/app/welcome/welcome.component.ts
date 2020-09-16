import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player, PlayerType } from '../game.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  title = "Welcome to the greatest Rock Paper Scissors of all time";

  player: Player = {
    type: PlayerType.HUMAN,
    name: "",
    score: {
      wins: 0,
      losses: 0,
      draws: 0
    }
  };

  constructor(
    private playersService: PlayersService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.playersService.setCurrentPlayer(this.player);
    this.router.navigate(["/game-board"]);
  }

}
