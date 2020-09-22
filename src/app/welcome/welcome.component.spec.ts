import { HttpClientModule } from "@angular/common/http";
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { of } from "rxjs/internal/observable/of";
import { AppRoutingModule } from "../app-routing.module";
import { Player, PlayerType } from "../game.model";
import { PlayerService } from "../player.service";

import { WelcomeComponent } from "./welcome.component";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj("router", [
    "navigate",
  ]);
  const playerServiceSpy: jasmine.SpyObj<PlayerService> = jasmine.createSpyObj(
    "playerService",
    ["getPlayer", "addPlayer"]
  );
  playerServiceSpy.addPlayer.and.returnValue(of(undefined));

  let titleDiv: HTMLDivElement;
  let nameInput: HTMLInputElement;
  let startButton: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatTooltipModule,
      ],
      declarations: [WelcomeComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: PlayerService, useValue: playerServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    titleDiv = fixture.nativeElement.getElementsByClassName("title")[0];
    nameInput = fixture.nativeElement.querySelector("input");
    startButton = fixture.nativeElement.getElementsByClassName("button")[0];
  });

  const existingPlayer: Player = {
    name: "beavis",
    type: PlayerType.HUMAN,
    totalScore: {
      won: 0,
      draw: 0,
      lost: 0,
      winRatio: 0,
    },
  };

  const expectedNewPlayer: Player = {
    ...existingPlayer,
    name: "butthead",
  };

  const expectInputToHaveValue = (value: string, buttonDisabled: boolean) => {
    expect(nameInput.value).toEqual(value);
    expect(startButton.getAttribute("data-disabled")).toEqual(
      `${buttonDisabled}`
    );
  };

  it("should create with empty player name and disabled start button", () => {
    expect(component).toBeTruthy();
    expect(titleDiv).toBeTruthy();
    expect(component.playerName).toBeUndefined();

    expectInputToHaveValue("", true);
  });

  it("should create activate start button when player name entered", (done) => {
    expect(component).toBeTruthy();
    expect(titleDiv).toBeTruthy();
    expect(component.playerName).toBeUndefined();

    expectInputToHaveValue("", true);

    component.playerName = "Test user";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectInputToHaveValue(component.playerName, false);

      done();
    });
  });

  it("should add player and navigate to /game-board after new user clicks start", (done) => {
    playerServiceSpy.getPlayer.and.returnValue(of(undefined));

    expect(component).toBeTruthy();
    expect(titleDiv).toBeTruthy();
    expect(component.playerName).toBeUndefined();

    expectInputToHaveValue("", true);

    component.playerName = "Butthead";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectInputToHaveValue(component.playerName, false);
      startButton.click();
      expect(playerServiceSpy.addPlayer).toHaveBeenCalledWith(
        expectedNewPlayer
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(["/game-board"], {
        queryParams: { playerName: expectedNewPlayer.name },
      });

      done();
    });
  });

  it("should navigate to /game-board after existing user clicks start", (done) => {
    playerServiceSpy.getPlayer.and.returnValue(of(existingPlayer));

    expect(component).toBeTruthy();
    expect(titleDiv).toBeTruthy();
    expect(component.playerName).toBeUndefined();

    expectInputToHaveValue("", true);

    component.playerName = "Beavis";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectInputToHaveValue(component.playerName, false);
      startButton.click();
      expect(playerServiceSpy.addPlayer).not.toHaveBeenCalledWith(
        existingPlayer
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(["/game-board"], {
        queryParams: { playerName: existingPlayer.name },
      });

      done();
    });
  });
});
