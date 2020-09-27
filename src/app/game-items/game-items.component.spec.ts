import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';
import { GameItemComponent } from '../game-item/game-item.component';
import { GameItemType } from '../game.model';

import { GameItemsComponent } from './game-items.component';

describe('GameItemsComponent', () => {
  let component: TestGameItemsComponent;
  let fixture: ComponentFixture<TestGameItemsComponent>;

  let appGameItems: HTMLElement[];
  const mockOnClick: jasmine.Spy = jasmine.createSpy();

  const expectedGameItemTypes = [
    GameItemType.ROCK,
    GameItemType.PAPER,
    GameItemType.SCISSORS,
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameItemsComponent,
        TestGameItemsComponent,
        GameItemComponent,
      ],
      imports: [MatRippleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGameItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appGameItems = fixture.nativeElement.querySelectorAll('app-game-item');
    component.clicksOnGameItem = mockOnClick;
  });

  it('should display 3 game items and call onClick for each game item user click', () => {
    expect(component).toBeTruthy();
    expect(appGameItems.length).toEqual(3);

    appGameItems.forEach((appGameItem, index) => {
      expect(appGameItem.getAttribute('ng-reflect-item-type')).toEqual(
        expectedGameItemTypes[index]
      );
      appGameItem.querySelector('img').click();
      expect(mockOnClick).toHaveBeenCalledWith(
        appGameItem.getAttribute('ng-reflect-item-type')
      );
    });
  });
});

@Component({
  template: '<app-game-items (clicksOnGameItem)="clicksOnGameItem($event)"></app-game-items>',
})
class TestGameItemsComponent {
  clicksOnGameItem?: (type: GameItemType) => void;
}
