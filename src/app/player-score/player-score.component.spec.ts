import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerImpl, PlayerType, ScoreImpl } from '../game.model';
import { PlayerScoreComponent } from './player-score.component';

describe('PlayerScoreComponent', () => {
  let component: TestPlayerScoreComponent;
  let fixture: ComponentFixture<TestPlayerScoreComponent>;

  let matSpinner: HTMLElement;
  let spanName: HTMLSpanElement;
  let spanPoints: HTMLSpanElement;

  const human = new PlayerImpl(
    'beavis',
    PlayerType.HUMAN,
    /*currentScore*/ new ScoreImpl(1, 0, 2, 33),
    /*totalScore*/ new ScoreImpl(1, 0, 3, 25)
  );
  const computer = new PlayerImpl(
    'HAL',
    PlayerType.COMPUTER,
    /*currentScore*/ new ScoreImpl(0, 1, 0, 0),
    /*totalScore*/ new ScoreImpl(10, 1, 23, 21)
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerScoreComponent, TestPlayerScoreComponent],
      imports: [
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatTooltipModule,
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerScoreComponent);
    component = fixture.componentInstance;
  });

  it('should display spinner when player not defined', (done) => {
    expect(component).toBeTruthy();
    component.player = undefined;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector('mat-spinner');
      expect(matSpinner).toBeTruthy();

      done();
    });
  });

  it('should display human name and score', (done) => {
    expect(component).toBeTruthy();
    component.player = human;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector('mat-spinner');
      expect(matSpinner).toBeFalsy();

      spanName = fixture.nativeElement.getElementsByClassName('name')[0];
      expect(spanName.textContent).toEqual(human.name);

      spanPoints = fixture.nativeElement.getElementsByClassName('points')[0];
      expect(spanPoints.textContent).toEqual(`${human.currentScore.won} Point`);

      done();
    });
  });

  it('should display computer name and score', (done) => {
    expect(component).toBeTruthy();
    component.player = computer;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector('mat-spinner');
      expect(matSpinner).toBeFalsy();

      spanName = fixture.nativeElement.getElementsByClassName('name')[0];
      expect(spanName.textContent).toEqual(`${computer.name} (Computer)`);

      spanPoints = fixture.nativeElement.getElementsByClassName('points')[0];
      expect(spanPoints.textContent).toEqual(
        `${computer.currentScore.won} Points`
      );

      done();
    });
  });
});

@Component({
  template: '<app-player-score [player]="player"></app-player-score>',
})
class TestPlayerScoreComponent {
  player?: PlayerImpl;
}
