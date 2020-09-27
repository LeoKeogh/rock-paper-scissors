import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';
import { GameItemComponent } from '../game-item/game-item.component';
import { GameItemType, GameResult } from '../game.model';

import { GameItemsPlayedComponent } from './game-items-played.component';

describe('GameItemsPlayedComponent', () => {
  let component: TestGameItemsPlayedComponent;
  let fixture: ComponentFixture<TestGameItemsPlayedComponent>;

  let appGameItems: HTMLElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameItemsPlayedComponent,
        TestGameItemsPlayedComponent,
        GameItemComponent,
      ],
      imports: [MatRippleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGameItemsPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appGameItems = fixture.nativeElement.querySelectorAll('app-game-item');
  });

  const expectAppGameItems = (_: string) => {
    expect(appGameItems.length).toEqual(2);
    expect(appGameItems[0].id).toEqual('computerItem');
    expect(appGameItems[0].getAttribute('ng-reflect-played')).toEqual('true');
    expect(appGameItems[0].getAttribute('ng-reflect-item-type')).toEqual(
      component.computerItemType
    );
    expect(
      appGameItems[0].getAttribute('ng-reflect-opponent-item-type')
    ).toEqual(component.humanItemType);
    expect(appGameItems[0].getAttribute('ng-reflect-gore-enabled')).toEqual(
      `${component.goreEnabled}`
    );
    expect(appGameItems[0].getAttribute('ng-reflect-orientation')).toEqual(
      `down`
    );

    expect(appGameItems[1].id).toEqual('humanItem');
    expect(appGameItems[1].getAttribute('ng-reflect-played')).toEqual('true');
    expect(appGameItems[1].getAttribute('ng-reflect-item-type')).toEqual(
      component.humanItemType
    );
    expect(
      appGameItems[1].getAttribute('ng-reflect-opponent-item-type')
    ).toEqual(component.computerItemType);
    expect(appGameItems[1].getAttribute('ng-reflect-gore-enabled')).toEqual(
      `${component.goreEnabled}`
    );
  };

  it('should display 2 game items with human victory', (done) => {
    expect(component).toBeTruthy();

    component.humanItemType = GameItemType.SCISSORS;
    component.computerItemType = GameItemType.PAPER;
    component.humanResult = GameResult.WIN;
    component.goreEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectAppGameItems('Victory!');

      done();
    });
  });

  it('should display 2 game items with human defeat', (done) => {
    expect(component).toBeTruthy();

    component.humanItemType = GameItemType.PAPER;
    component.computerItemType = GameItemType.ROCK;
    component.humanResult = GameResult.LOSE;
    component.goreEnabled = false;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectAppGameItems('Defeat!');

      done();
    });
  });

  it('should display 2 game items with stalemate', (done) => {
    expect(component).toBeTruthy();

    component.humanItemType = GameItemType.PAPER;
    component.computerItemType = GameItemType.PAPER;
    component.humanResult = GameResult.DRAW;
    component.goreEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectAppGameItems('Stalemate!');

      done();
    });
  });
});

@Component({
  template:
    '<app-game-items-played [computerItemType]="computerItemType" [humanItemType]="humanItemType"'
    + ' [goreEnabled]="goreEnabled" [humanResult]="humanResult" ></app-game-items-played>',
})
class TestGameItemsPlayedComponent {
  computerItemType: GameItemType;
  humanItemType: GameItemType;
  goreEnabled: boolean;
  humanResult: GameResult;
}
