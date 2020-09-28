import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { easterEnabledStorageKey, goreEnabledStorageKey } from '../game-board/game-board.component';
import { PlayerImpl } from '../game.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  title: string;
  playerName?: string;

  easterEnabled: boolean = false;
  goreEnabled: boolean = false;

  constructor(private playerService: PlayerService, private router: Router) {
  }

  ngOnInit() {
    this.goreEnabled =
      localStorage.getItem(goreEnabledStorageKey) === 'true';

    this.easterEnabled =
      localStorage.getItem(easterEnabledStorageKey) === 'true';
    this.updateTitle();
  }

  onSubmit() {
    this.playerName = this.playerName?.trim()?.toLowerCase();
    if (!this.playerName) {
      return;
    }

    this.playerService.getPlayer(this.playerName).subscribe((player) => {
      if (!player) {
        this.playerService
          .addPlayer(new PlayerImpl(this.playerName))
          .subscribe();
      }
      this.router.navigate(['/game-board'], {
        queryParams: { playerName: this.playerName },
      });
    });
  }

  updateTitle(): void {
    this.title = this.easterEnabled ? "Rock Paper Shotgun&trade;" : "Rock Paper Scissors"
  }
}
