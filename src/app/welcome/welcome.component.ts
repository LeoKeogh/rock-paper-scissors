import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player, Score } from '../game.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  title = "Welcome to the greatest Rock Paper Scissors of all time";

  player: Player = {
    name: "",
    score: {}
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
