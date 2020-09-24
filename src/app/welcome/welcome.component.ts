import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerImpl } from '../game.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  playerName?: string;

  constructor(private playerService: PlayerService, private router: Router) {
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
}
