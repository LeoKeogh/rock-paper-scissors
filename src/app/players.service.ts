import { Injectable } from '@angular/core';
import { Player } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() { }

  localStorageKey: string = "currentPlayer";

  setCurrentPlayer(player: Player) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(player));
  }

  getCurrentPlayer() : Player | undefined {
    const currentPlayerJson = localStorage.getItem(this.localStorageKey);

    return currentPlayerJson ? JSON.parse(currentPlayerJson) : undefined;
  }
}
