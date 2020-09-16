import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GameItemOrientation, GameItemType } from '../game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit, OnChanges {

  @Input() itemType?: GameItemType;
  typeImgSrc?: string;

  @Input() played: boolean = false;
  @Input() orientation: GameItemOrientation = GameItemOrientation.UP

  @Output() onClick?: EventEmitter<any> = new EventEmitter();

  ngOnChanges(): void {
    if (this.itemType) {
      this.typeImgSrc = `assets/${this.itemType}.png`
    }
  }

  onGameItemClick() {
    this.onClick && this.onClick.emit();
  }

  ngOnInit(): void {
  }

}
