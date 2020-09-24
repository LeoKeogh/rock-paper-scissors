import { Component, EventEmitter, Input, OnChanges, Output, } from '@angular/core';
import { GameItemOrientation, GameItemType } from '../game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnChanges {
  @Input() itemType?: GameItemType;
  @Input() opponentItemType?: GameItemType;

  typeImgSrc?: string;

  @Input() played = false;
  @Input() orientation: GameItemOrientation = GameItemOrientation.UP;

  @Input() goreEnabled = false;

  @Output() clicksOnGameItem?: EventEmitter<any> = new EventEmitter();

  ngOnChanges(): void {
    if (this.itemType) {
      this.typeImgSrc =
        this.opponentItemType && this.goreEnabled
          ? `assets/images/${this.itemType}-vs-${this.opponentItemType}.png`
          : `assets/images/${this.itemType}.png`;
    }
  }

  onGameItemClick() {
    if (this.clicksOnGameItem) {
      this.clicksOnGameItem.emit(this.itemType);
    }
  }
}
