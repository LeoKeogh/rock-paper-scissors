import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultNewPlayer, Player, PlayerType } from '../game.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  playerName?: string;
  player?: Player;

  constructor(
    private playersService: PlayersService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.playerName = this.playerName?.trim();
    if (!this.playerName) { return; }

    this.playersService.addPlayer({ ...DefaultNewPlayer, name: this.playerName })
    .subscribe(
      player => {
        this.router.navigate(["/game-board"], {queryParams: {playerName: this.playerName}});
      }
    )
  }

  search(name: string) {
    this.playersService.getPlayer(name)
    .subscribe(
      players => {
        this.player = players[0];
      }
    )
  }

}
