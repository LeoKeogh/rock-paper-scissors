import { Component, DoCheck, Input, OnChanges, OnInit } from "@angular/core";
import { Player } from "../game.model";
import _sortBy from "lodash/sortBy";

@Component({
  selector: "app-hall-of-fame[players][playerName]",
  templateUrl: "./hall-of-fame.component.html",
  styleUrls: ["./hall-of-fame.component.scss"],
})
export class HallOfFameComponent implements DoCheck, OnInit {

  @Input() players?: Player[];
  @Input() playerName: string;

  rankedPlayers?: Player[];

  displayedColumns: string[] = [
    "rank",
    "name",
    "played",
    "won",
    "draw",
    "lost",
    "winRatio",
  ];

  visible: boolean = true;
  visibleStorageKey = "rps-hall-of-fame-visible";

  ngOnInit(): void {
    this.visible = localStorage.getItem(this.visibleStorageKey) !== "false";
  }

  ngDoCheck(): void {
    if (this.players) {
      this.rankedPlayers = _sortBy(
        this.players,
        "totalScore.winRatio"
      ).reverse();
    }
  }

  onHideClick() {
    this.visible = !this.visible;
    localStorage.setItem(this.visibleStorageKey, `${this.visible}`);
  }
}
