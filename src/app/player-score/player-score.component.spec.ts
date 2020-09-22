import { Component } from "@angular/core";
import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Player, PlayerType } from "../game.model";

import { PlayerScoreComponent } from "./player-score.component";

describe("PlayerScoreComponent", () => {
  let component: TestPlayerScoreComponent;
  let fixture: ComponentFixture<TestPlayerScoreComponent>;

  let matSpinner: HTMLElement;
  let spanName: HTMLSpanElement;
  let spanPoints: HTMLSpanElement;

  const human = {
    name: "beavis",
    type: PlayerType.HUMAN,
    currentScore: {
      won: 1,
      draw: 0,
      lost: 2,
      winRatio: 33,
    },
    totalScore: {
      won: 1,
      draw: 0,
      lost: 3,
      winRatio: 25,
    },
  };

  const computer: Player = {
    name: "HAL",
    type: PlayerType.COMPUTER,
    currentScore: {
      won: 0,
      draw: 1,
      lost: 0,
      winRatio: 0,
    },
    totalScore: {
      won: 10,
      draw: 1,
      lost: 23,
      winRatio: 21,
    },
  };

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

  it("should display spinner when player not defined", (done) => {
    expect(component).toBeTruthy();
    component.player = undefined;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector("mat-spinner");
      expect(matSpinner).toBeTruthy();

      done();
    });
  });

  it("should display human name and score", (done) => {
    expect(component).toBeTruthy();
    component.player = human;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector("mat-spinner");
      expect(matSpinner).toBeFalsy();

      spanName = fixture.nativeElement.getElementsByClassName("name")[0];
      expect(spanName.textContent).toEqual(human.name);

      spanPoints = fixture.nativeElement.getElementsByClassName("points")[0];
      expect(spanPoints.textContent).toEqual(`${human.currentScore.won} Point`);

      done();
    });
  });

  it("should display computer name and score", (done) => {
    expect(component).toBeTruthy();
    component.player = computer;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      matSpinner = fixture.nativeElement.querySelector("mat-spinner");
      expect(matSpinner).toBeFalsy();

      spanName = fixture.nativeElement.getElementsByClassName("name")[0];
      expect(spanName.textContent).toEqual(`${computer.name} (Computer)`);

      spanPoints = fixture.nativeElement.getElementsByClassName("points")[0];
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
  player?: Player;
}
