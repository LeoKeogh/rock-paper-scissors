import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { GameItemOrientation, GameItemType } from '../game.model';

import { GameItemComponent } from './game-item.component';

fdescribe('GameItemComponent', () => {
  let component: GameItemComponent;
  let fixture: ComponentFixture<GameItemComponent>;

  let imgElement: HTMLImageElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameItemComponent ],
      imports: [MatInputModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    imgElement = fixture.nativeElement.querySelector('img');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a upward facing game item', () => {
    expect(component).toBeTruthy();
    component.itemType = GameItemType.ROCK;
    component.orientation = GameItemOrientation.UP;
    component.ngOnChanges()

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(imgElement.src.endsWith(`assets/images/${component.itemType}.png`)).toBeTrue()
      expect(imgElement.getAttribute("data-played")).toEqual(`${component.played}`);
      expect(imgElement.getAttribute("data-orientation")).toEqual(`${component.orientation}`);
    })
  })
});
