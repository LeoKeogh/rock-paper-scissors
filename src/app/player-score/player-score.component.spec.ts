import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Player, PlayerType } from '../game.model';

import { PlayerScoreComponent } from './player-score.component';

describe('PlayerScoreComponent', () => {
  let component: PlayerScoreComponent;
  let fixture: ComponentFixture<PlayerScoreComponent>;

  const human = {
    name: "beavis",
    type: PlayerType.HUMAN,
    currentScore: {
      won: 1,
      draw: 0,
      lost: 2,
      winRatio: 33
    },
    totalScore: {
      won: 1,
      draw: 0,
      lost: 3,
      winRatio: 25
    }
  }

  const computer : Player = {
    name: "HAL",
    type: PlayerType.COMPUTER,
    currentScore: {
      won: 0,
      draw: 1,
      lost: 0,
      winRatio: 0
    },
    totalScore: {
      won: 10,
      draw: 1,
      lost: 23,
      winRatio: 21
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerScoreComponent ],
      imports: [MatProgressSpinnerModule, BrowserAnimationsModule, MatTooltipModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display human name and score', () => {
    expect(component).toBeTruthy();
    component.player = human;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.displyedName).toEqual(`${human.name}`)
      expect(component.displyedPoints).toEqual(`${human.currentScore.won} Point`)
      expect(component.pointsTooltip).toEqual(
        `Current game: ${human.currentScore.won} win - ${human.currentScore.lost} losses - no draws (${human.currentScore.winRatio}% win / loss  ratio)`)
    })

  });

  it('should display computer name and score', () => {
    expect(component).toBeTruthy();
    component.player = computer;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.displyedName).toEqual(`${computer.name} (Computer)`)
      expect(component.displyedPoints).toEqual(`${computer.currentScore.won} Points`)
      expect(component.pointsTooltip).toEqual(
        `Current game: no wins - no losses - 1 draw`)
    })

  });
});
