import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _delay from 'lodash/delay';
import _omit from 'lodash/omit';
import { GameItemType, GameResult, Player, PlayerImpl, PlayerType } from '../game.model';
import { GameService } from '../game.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  title: string;
  computer: Player = new PlayerImpl('HAL', PlayerType.COMPUTER);

  human?: Player;
  goreEnabled = false;
  goreEnabledStorageKey = 'rps-goreEnabled';

  easterEnabled = false;
  easterEnabledStorageKey = 'rps-easterEnabled';

  humanResult?: GameResult;

  hallOfFamePlayers: Player[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private gameService: GameService
  ) {
  }

  ngOnInit(): void {
    const playerName = this.activatedRoute.snapshot.queryParams.playerName;
    if (!playerName) {
      this.router.navigate(['/']);
    }

    this.playerService.getPlayer(playerName).subscribe((player) => {
      if (!player) {
        this.router.navigate(['/']);
      } else {
        this.human = PlayerImpl.from(player);
      }
    });

    this.playerService.getPlayers().subscribe((players) => {
      this.hallOfFamePlayers = players;
    });

    this.goreEnabled =
      localStorage.getItem(this.goreEnabledStorageKey) === 'true';

    this.easterEnabled =
      localStorage.getItem(this.easterEnabledStorageKey) === 'true';
    this.updateTitle();
  }

  clicksOnNewGame() {
    this.router.navigate(['/']);
  }

  clicksOnGoreSwitch() {
    this.goreEnabled = !this.goreEnabled;
    localStorage.setItem(this.goreEnabledStorageKey, `${this.goreEnabled}`);
  }

  clicksOnGameItem(itemType: GameItemType): void {
    this.human.playedItem = undefined;
    this.computer.playedItem = undefined;
    // small delay for css animation
    _delay(() => {
      this.human.playedItem = itemType;
      this.computer.playedItem = this.gameService.getRandomItemType();

      this.humanResult = this.gameService.determineResultAndRefreshScores(
        this.human,
        this.computer
      );

      this.playerService
        .updatePlayer(_omit(this.human, 'currentScore', 'playedItem'))
        .subscribe();
    }, 10);
  }

  clicksOnEgg(): void {
    this.easterEnabled = !this.easterEnabled;
    localStorage.setItem(this.easterEnabledStorageKey, `${this.easterEnabled}`);
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = this.easterEnabled ? "Rock Paper Shotgun" : "Rock Paper Scissors"
  }

}
