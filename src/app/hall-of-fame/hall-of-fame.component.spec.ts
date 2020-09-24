import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import _sortBy from 'lodash/sortBy';
import { Player, PlayerImpl, PlayerType, ScoreImpl } from '../game.model';
import { HallOfFameComponent } from './hall-of-fame.component';

describe('HallOfFameComponent', () => {
  let component: TestHallOfFameComponent;
  let fixture: ComponentFixture<TestHallOfFameComponent>;

  let titleDiv: HTMLDivElement;
  let matSpinner: HTMLElement;

  let matTableHeaders: HTMLTableHeaderCellElement[];
  let matTableRows: HTMLTableRowElement[];

  const expectedHeaders = ['Rank', 'Name', 'P', 'W', 'D', 'L', 'W/L Ratio'];

  const players: Player[] = [
    new PlayerImpl(
      'beavis',
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl(1, 2, 3, 25)
    ),
    new PlayerImpl('kenny'),
    new PlayerImpl(
      'butthead',
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl(1, 0, 0, 100)
    ),
  ];
  const rankedPlayers = _sortBy(players, 'totalScore.winRatio').reverse();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HallOfFameComponent, TestHallOfFameComponent],
      imports: [
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatTooltipModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHallOfFameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleDiv = fixture.nativeElement.getElementsByClassName(
      'hall-of-fame-title'
    )[0];
  });

  it('should display spinner when players not defined', (done) => {
    expect(component).toBeTruthy();
    expect(titleDiv.textContent.trim().startsWith('Hall Of Fame')).toBeTrue();

    component.players = undefined;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector('mat-spinner');
      expect(matSpinner).toBeTruthy();

      done();
    });
  });

  it('should display hall of fame with players sorted by total win ratio', (done) => {
    expect(component).toBeTruthy();
    expect(titleDiv.textContent.trim().startsWith('Hall Of Fame')).toBeTrue();

    component.players = players;
    component.playerName = 'kenny';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector('mat-spinner');
      expect(matSpinner).toBeFalsy();

      matTableHeaders = fixture.nativeElement
        .querySelector('thead')
        .querySelectorAll('th');
      matTableHeaders.forEach((th, index) => {
        expect(th.textContent).toEqual(expectedHeaders[index]);
      });

      matTableRows = fixture.nativeElement
        .querySelector('tbody')
        .querySelectorAll('tr');

      matTableRows.forEach((row, index) => {
        expect(row.children[0].textContent.trim()).toEqual(`${index + 1}`);
        expect(row.children[1].textContent.trim()).toEqual(
          `${rankedPlayers[index].name}`
        );
        expect(row.children[2].textContent.trim()).toEqual(
          `${
            rankedPlayers[index].totalScore.won +
            rankedPlayers[index].totalScore.draw +
            rankedPlayers[index].totalScore.lost
          }`
        );
        expect(row.children[3].textContent.trim()).toEqual(
          `${rankedPlayers[index].totalScore.won}`
        );
        expect(row.children[4].textContent.trim()).toEqual(
          `${rankedPlayers[index].totalScore.draw}`
        );
        expect(row.children[5].textContent.trim()).toEqual(
          `${rankedPlayers[index].totalScore.lost}`
        );
        expect(row.children[6].textContent.trim()).toEqual(
          `${rankedPlayers[index].totalScore.winRatio}%`
        );

        if (rankedPlayers[index].name === component.playerName) {
          expect(row.classList.contains('current-player')).toBeTrue();
        }
      });

      done();
    });
  });
});

@Component({
  template:
    '<app-hall-of-fame [players]="players" [playerName]="playerName"></app-hall-of-fame>',
})
class TestHallOfFameComponent {
  players?: Player[];
  playerName: string;
}
