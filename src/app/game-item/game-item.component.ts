import { Component, Input, OnInit } from '@angular/core';
import { GameItemType } from '../game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() itemType?: GameItemType;
  typeImgSrc?: string;

  ngOnInit(): void {
    if (this.itemType) {
      this.typeImgSrc = `assets/${this.itemType}.png`
    }
  }

}
