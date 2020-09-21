import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _cloneDeep from 'lodash/cloneDeep';
import _delay from 'lodash/delay';
import _omit from 'lodash/omit';
import { GameItemOrientation, GameItemType, GameResult, NewPlayer, Player, PlayerType } from '../game.model';
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

  goreEnabled: boolean = false;

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

    this.goreEnabled = localStorage.getItem("goreEnabled") === "true";


  }

  onNewGameClick() {
    this.router.navigate(["/welcome"]);
  }

  onGoreSwitchClick() {
    this.goreEnabled = !this.goreEnabled;
    localStorage.setItem("goreEnabled", `${this.goreEnabled}`);
  }

  onGameItemClick(itemType: GameItemType): void {
    this.human.playedItem = undefined;
    this.computer.playedItem = undefined;
    this.resultMessage = undefined;
    // small delay for css animation
    _delay(() => {
      this.human.playedItem = itemType;
      this.computer.playedItem = this.gameService.getRandomItemType();

      this.humanResult = this.gameService.determineResultAndRefreshScores(this.human, this.computer);

      this.playerService.updatePlayer(_omit(this.human, "currentScore", "playedItem")).subscribe();
    }, 10)
  }
}
