import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { GameItemType } from "../game.model";

@Component({
  selector: "app-game-items",
  templateUrl: "./game-items.component.html",
  styleUrls: ["./game-items.component.scss"],
})
export class GameItemsComponent implements OnInit {
  @Output() onClick?: EventEmitter<any> = new EventEmitter();

  GameItemType = GameItemType;

  constructor() {}

  ngOnInit(): void {}

  onGameItemClick(itemType: GameItemType) {
    this.onClick && this.onClick.emit(itemType);
  }
}
