import { Component, EventEmitter, Output } from '@angular/core';
import { GameItemType } from '../game.model';

@Component({
  selector: 'app-game-items',
  templateUrl: './game-items.component.html',
  styleUrls: ['./game-items.component.scss'],
})
export class GameItemsComponent {
  @Output() clicksOnGameItem?: EventEmitter<any> = new EventEmitter();

  GameItemType = GameItemType;

  constructor() {
  }

  onGameItemClick(itemType: GameItemType) {
    if (this.clicksOnGameItem) {
      this.clicksOnGameItem.emit(itemType);
    }
  }
}
