import { Component } from "@angular/core";
import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from "@angular/core/testing";
import { MatInputModule } from "@angular/material/input";
import { GameItemOrientation, GameItemType } from "../game.model";
import { GameItemComponent } from "./game-item.component";

describe("GameItemComponent", () => {
  let component: TestGameItemComponent;
  let fixture: ComponentFixture<TestGameItemComponent>;

  let imgElement: HTMLImageElement;
  let mockOnClick: jasmine.Spy = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameItemComponent, TestGameItemComponent],
      imports: [MatInputModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should display a upward facing game item and call onClick function on user click", (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.ROCK;
    component.orientation = GameItemOrientation.UP;
    component.onClick = mockOnClick;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector("img");
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(`assets/images/${component.itemType}.png`)
      ).toBeTrue();
      expect(imgElement.getAttribute("data-played")).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute("data-orientation")).toEqual(
        `${component.orientation}`
      );

      imgElement.click();
      expect(mockOnClick).toHaveBeenCalledWith(component.itemType);

      done();
    });
  });

  it("should display a downward facing played game item", (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.PAPER;
    component.orientation = GameItemOrientation.DOWN;
    component.played = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector("img");
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(`assets/images/${component.itemType}.png`)
      ).toBeTrue();
      expect(imgElement.getAttribute("data-played")).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute("data-orientation")).toEqual(
        `${component.orientation}`
      );

      done();
    });
  });

  it("should display a gory losing downward facing played game item", (done) => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.SCISSORS;
    component.orientation = GameItemOrientation.DOWN;
    component.played = true;
    component.opponentItemType = GameItemType.ROCK;
    component.goreEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector("img");
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(
          `assets/images/${component.itemType}-vs-${component.opponentItemType}.png`
        )
      ).toBeTrue();
      expect(imgElement.getAttribute("data-played")).toEqual(
        `${component.played}`
      );
      expect(imgElement.getAttribute("data-orientation")).toEqual(
        `${component.orientation}`
      );

      done();
    });
  });
});

@Component({
  template:
    '<app-game-item [itemType]="itemType" [played]="played"  [orientation]="orientation" [opponentItemType]="opponentItemType" [goreEnabled]="goreEnabled" (onClick)="onClick($event)"></app-game-item>',
})
class TestGameItemComponent {
  itemType?: GameItemType;
  opponentItemType?: GameItemType;

  played: boolean = false;
  orientation: GameItemOrientation = GameItemOrientation.UP;

  goreEnabled: boolean = false;

  onClick?: Function;
}
