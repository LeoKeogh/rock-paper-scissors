import { Component, DoCheck, Input, OnInit } from '@angular/core';
import _sortBy from 'lodash/sortBy';
import { PlayerImpl } from '../game.model';

@Component({
  selector: 'app-hall-of-fame[players][playerName]',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss'],
})
export class HallOfFameComponent implements DoCheck, OnInit {
  @Input() players?: PlayerImpl[];
  @Input() playerName: string;

  rankedPlayers?: PlayerImpl[];

  displayedColumns: string[] = [
    'rank',
    'name',
    'played',
    'won',
    'draw',
    'lost',
    'winRatio',
  ];

  visible = true;
  visibleStorageKey = 'rps-hall-of-fame-visible';

  ngOnInit(): void {
    this.visible = localStorage.getItem(this.visibleStorageKey) !== 'false';
  }

  ngDoCheck(): void {
    if (this.players) {
      this.rankedPlayers = _sortBy(
        this.players,
        'totalScore.winRatio'
      ).reverse();
    }
  }

  onHideClick() {
    this.visible = !this.visible;
    localStorage.setItem(this.visibleStorageKey, `${this.visible}`);
  }
}
