import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Player } from '../game.model';
import _sortBy from 'lodash/sortBy';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-hall-of-fame[players][playerName]',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})
export class HallOfFameComponent implements DoCheck {

  @Input() players?: Player[];
  @Input() playerName: string;

  rankedPlayers?: Player[];

  displayedColumns: string[] = ['rank', 'name', 'played', 'won', 'draw', 'lost', 'winRatio']

  ngDoCheck(): void {
    if (this.players) {
      this.rankedPlayers = _sortBy(this.players, "totalScore.winRatio").reverse();
    }
  }
}
