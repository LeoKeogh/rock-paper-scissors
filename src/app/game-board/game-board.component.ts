import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import _cloneDeep from 'lodash/cloneDeep';
import _delay from 'lodash/delay';
import _omit from 'lodash/omit';
import _round from 'lodash/round';
import { GameItemOrientation, GameItemType, GameResult, NewPlayer, Player, PlayerType, Score } from '../game.model';
import { GameService } from '../game.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) { }

  human?: Player;
  computer: Player = { ..._cloneDeep(NewPlayer), name: "HAL", type: PlayerType.COMPUTER };

  humanResult?: GameResult;
  resultMessage?: string;

  humanPlayers: Player[];

  GameItemType = GameItemType;
  GameItemOrientation = GameItemOrientation;

  ngOnInit(): void {
    const playerName = this.activatedRoute.snapshot.queryParams["playerName"]
    !playerName && this.router.navigate(["/welcome"]);

    this.playerService.getPlayer(playerName).subscribe(player => {
      !player && this.router.navigate(["/welcome"]);
      this.human = { ..._cloneDeep(NewPlayer), ...player };
    })

    this.playerService.getPlayers().subscribe(players => {
      this.humanPlayers = players;
    })
  }

  onNewPlayerClick() {
    this.router.navigate(["/welcome"]);
  }

  onGameItemClick(itemType: GameItemType): void {
    this.human.playedItem = itemType;
    this.computer.playedItem = undefined;
    this.resultMessage = undefined;
    // small delay for a bit of suspense and animation
    _delay(() => {
      this.computer.playedItem = this.gameService.getRandomItemType();

      this.humanResult = this.gameService.determineResultAndRefreshScores(this.human, this.computer);

      switch (this.humanResult) {
        case GameResult.WIN:
          this.resultMessage = "Victory!"
          break;
        case GameResult.DRAW:
          this.resultMessage = "Stalemate!"
          break;
        case GameResult.LOSE:
          this.resultMessage = "Defeat!"
          break;
      }

      this.playerService.updatePlayer(_omit(this.human, "currentScore", "playedItem")).subscribe();

    }, 300)
  }
}
