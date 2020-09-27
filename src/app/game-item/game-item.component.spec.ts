import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';
import { GameItemOrientation, GameItemType } from '../game.model';
import { GameItemComponent } from './game-item.component';

describe('GameItemComponent', () => {
  let component: TestGameItemComponent;
  let fixture: ComponentFixture<TestGameItemComponent>;

  let imgElement: HTMLImageElement;
  const mockOnClick: jasmine.Spy = jasmine.createSpy("clicksOnGameItem");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameItemComponent, TestGameItemComponent],
      imports: [MatRippleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a upward facing game item and call onClick function on user click', (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.ROCK;
    component.orientation = GameItemOrientation.UP;
    component.clicksOnGameItem = mockOnClick;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(`assets/images/${component.itemType}.png`)
      ).toBeTrue();
      expect(imgElement.getAttribute('data-played')).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute('data-orientation')).toEqual(
        `${component.orientation}`
      );

      imgElement.click();
      expect(mockOnClick).toHaveBeenCalledWith(component.itemType);

      done();
    });
  });

  it('should display a downward facing played game item', (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.PAPER;
    component.orientation = GameItemOrientation.DOWN;
    component.played = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(`assets/images/${component.itemType}.png`)
      ).toBeTrue();
      expect(imgElement.getAttribute('data-played')).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute('data-orientation')).toEqual(
        `${component.orientation}`
      );

      done();
    });
  });

  it('should display a gory losing downward facing played game item', (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.SCISSORS;
    component.orientation = GameItemOrientation.DOWN;
    component.played = true;
    component.opponentItemType = GameItemType.ROCK;
    component.goreEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(
          `assets/images/${component.itemType}-vs-${component.opponentItemType}.png`
        )
      ).toBeTrue();
      expect(imgElement.getAttribute('data-played')).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute('data-orientation')).toEqual(
        `${component.orientation}`
      );

      done();
    });
  });

  it('should display a gory losing downward facing played game item with easter egg mode enabled', (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.PAPER;
    component.orientation = GameItemOrientation.DOWN;
    component.played = true;
    component.opponentItemType = GameItemType.SCISSORS;
    component.goreEnabled = true;
    component.easterEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(
          `assets/images/${component.itemType}-vs-${component.opponentItemType}-egged.png`
        )
      ).toBeTrue();
      expect(imgElement.getAttribute('data-played')).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute('data-orientation')).toEqual(
        `${component.orientation}`
      );

      done();
    });
  });
});

@Component({
  template:
    '<app-game-item [itemType]="itemType" [played]="played"  [orientation]="orientation" [opponentItemType]="opponentItemType"' +
    ' [goreEnabled]="goreEnabled" [easterEnabled]="easterEnabled" (clicksOnGameItem)="clicksOnGameItem($event)"></app-game-item>',
})
class TestGameItemComponent {
  itemType?: GameItemType;
  opponentItemType?: GameItemType;

  played = false;
  orientation: GameItemOrientation = GameItemOrientation.UP;

  goreEnabled = false;
  easterEnabled = false;

  clicksOnGameItem?: () => void;
}
