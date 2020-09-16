import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GameItemOrientation, GameItemType, GameResult, Player, PlayerType } from '../game.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(
    private playersService: PlayersService,
    private _snackBar: MatSnackBar) { }

  player: Player;
  computer: Player = {
    type: PlayerType.COMPUTER,
    name: "HAL",
    score: {
      wins: 0,
      losses: 0,
      draws: 0
    }
  };

  playerSelectedItem?: GameItemType;
  computerSelectedItem?: GameItemType;

  playerResult?: GameResult;

  GameItemType = GameItemType;
  GameItemOrientation = GameItemOrientation;

  ngOnInit(): void {
    // const currentPlayer = this.playersService.getCurrentPlayer()
    // if (currentPlayer) {
    //   this.player = currentPlayer;
    // } else {
    //   this.router.navigate(["/welcome"]);
    // }
    this.player = {
      type: PlayerType.HUMAN,
      name: "Leo",
      score: {
        wins: 0,
        losses: 0,
        draws: 0
      }
    }
  }

  async onGameItemClick(itemType: GameItemType): Promise<void> {
    this.playerSelectedItem = itemType;
    this.computerSelectedItem = undefined;
    this.playerResult = undefined;
    this.computerSelectedItem = await this.chooseRandomItemType();

    if (this.playerSelectedItem !== this.computerSelectedItem) {
      const playerWon =
        this.computerSelectedItem === GameItemType.ROCK && this.playerSelectedItem === GameItemType.PAPER
        || this.computerSelectedItem === GameItemType.PAPER && this.playerSelectedItem === GameItemType.SCISSORS
        || this.computerSelectedItem === GameItemType.SCISSORS && this.playerSelectedItem === GameItemType.ROCK

      if (playerWon) {
        this.playerResult = GameResult.WIN;
        this._snackBar.open("You WIN!!", "Close", {duration: 500})
        this.player.score.wins++;
        this.computer.score.losses++;
      } else {
        this.playerResult = GameResult.LOSE;
        this._snackBar.open("You LOSE!!", "Close", {duration: 500})
        this.player.score.losses++;
        this.computer.score.wins++;
      }
    } else {
      this.playerResult = GameResult.DRAW
      this._snackBar.open("It's a DRAW!!", "Close", {duration: 500})
      this.player.score.draws++;
      this.computer.score.draws++;
    }
  }

  async chooseRandomItemType(): Promise<GameItemType> {
    const enumValues = [GameItemType.ROCK, GameItemType.PAPER, GameItemType.SCISSORS]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    await this.delay(500)
    return enumValues[randomIndex]
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
