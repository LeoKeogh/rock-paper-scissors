import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';

import { EggComponent } from './egg.component';

describe('EggComponent', () => {
  let component: TestEggComponent;
  let fixture: ComponentFixture<TestEggComponent>;

  let imgElement: HTMLImageElement;
  const mockOnClick: jasmine.Spy = jasmine.createSpy('clicksOnEgg');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EggComponent, TestEggComponent],
      imports: [MatRippleModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestEggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display closed egg (init) and call click on user click', (done) => {
    expect(component).toBeTruthy();
    component.clicksOnEgg = mockOnClick;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(`assets/images/egg.png`)
      ).toBeTrue();

      imgElement.click();
      expect(mockOnClick).toHaveBeenCalled();

      done();
    });
  });

  it('should display open egg and call click on user click', (done) => {
    expect(component).toBeTruthy();
    component.clicksOnEgg = mockOnClick;
    component.easterEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      imgElement = fixture.nativeElement.querySelector('img');
      expect(imgElement).toBeTruthy();
      expect(
        imgElement.src.endsWith(`assets/images/egg-open.png`)
      ).toBeTrue();

      done();
    });
  });
});

@Component({
  template:
    '<app-egg [easterEnabled]="easterEnabled" (clicksOnEgg)="clicksOnEgg($event)"></app-egg>',
})
class TestEggComponent {
  easterEnabled: boolean;

  clicksOnEgg?: () => void;
}

