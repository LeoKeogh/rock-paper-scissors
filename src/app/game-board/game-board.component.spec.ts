import { HttpClientModule } from "@angular/common/http";
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { AppRoutingModule } from "../app-routing.module";
import { GameItemComponent } from "../game-item/game-item.component";
import { GameItemsPlayedComponent } from "../game-items-played/game-items-played.component";
import { GameItemsComponent } from "../game-items/game-items.component";
import { Player, PlayerImpl, PlayerType, ScoreImpl } from "../game.model";
import { GameService } from "../game.service";
import { HallOfFameComponent } from "../hall-of-fame/hall-of-fame.component";
import { PlayerScoreComponent } from "../player-score/player-score.component";
import { PlayerService } from "../player.service";
import { GameBoardComponent } from "./game-board.component";

describe("GameBoardComponent", () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  const activatedRouteSpy: jasmine.SpyObj<ActivatedRoute> = jasmine.createSpyObj(
    "activatedRoute",
    ["snapshot"]
  );
  activatedRouteSpy.snapshot.queryParams = [];
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj("router", [
    "navigate",
  ]);
  const playerServiceSpy: jasmine.SpyObj<PlayerService> = jasmine.createSpyObj(
    "playerService",
    ["getPlayer", "getPlayers", "updatePlayer"]
  );
  playerServiceSpy.getPlayer.and.returnValue(of(undefined));
  playerServiceSpy.getPlayers.and.returnValue(of(undefined));
  playerServiceSpy.updatePlayer.and.returnValue(of(undefined));

  let appPlayerScoreComputer: HTMLElement;
  let appGameItemsPlayed: HTMLElement;
  let appGameItems: HTMLElement;
  let appPlayerScoreHuman: HTMLElement;
  let appHallOfFame: HTMLElement;

  let newGameButton: HTMLDivElement;
  let enableGoreButton: HTMLDivElement;

  const gameService = new GameService();

  const players: Player[] = [
    new PlayerImpl(
      "beavis",
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl(1, 2, 3, 25)
    ),
    new PlayerImpl("kenny"),
    new PlayerImpl(
      "butthead",
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl(1, 0, 0, 100)
    ),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        PlayerScoreComponent,
        GameItemsPlayedComponent,
        GameItemsComponent,
        GameItemComponent,
        HallOfFameComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatTableModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: PlayerService, useValue: playerServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to /welcome when playerName not in URL", () => {
    expect(component).toBeTruthy();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/welcome"]);
  });

  it("should navigate to /welcome when player does not exist", () => {
    expect(component).toBeTruthy();

    activatedRouteSpy.snapshot.queryParams["playerName"] = "kenny";
    component.ngOnInit();

    expect(playerServiceSpy.getPlayer).toHaveBeenCalledWith("kenny");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/welcome"]);
  });

  it("should init game board when player exists", (done) => {
    expect(component).toBeTruthy();
    activatedRouteSpy.snapshot.queryParams["playerName"] = "kenny";
    playerServiceSpy.getPlayer.and.returnValue(
      of(players.filter((p) => p.name === "kenny")[0])
    );
    playerServiceSpy.getPlayers.and.returnValue(of(players));
    component.ngOnInit();

    component.goreEnabled = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      newGameButton = fixture.nativeElement.getElementsByClassName(
        "new-game-button"
      )[0];
      expect(newGameButton).toBeTruthy();
      expect(newGameButton.textContent.trim()).toEqual("New Game");

      enableGoreButton = fixture.nativeElement.getElementsByClassName(
        "enable-gore-button"
      )[0];
      expect(enableGoreButton).toBeTruthy();
      expect(enableGoreButton.textContent.trim()).toEqual("Disable Gore");

      appPlayerScoreComputer = fixture.nativeElement.querySelector(
        "app-player-score"
      );
      appGameItemsPlayed = fixture.nativeElement.querySelector(
        "app-game-items-played"
      );
      appGameItems = fixture.nativeElement.querySelector("app-game-items");
      appPlayerScoreHuman = fixture.nativeElement.querySelectorAll(
        "app-player-score"
      )[1];
      appHallOfFame = fixture.nativeElement.querySelector("app-hall-of-fame");

      expect(appPlayerScoreComputer).toBeTruthy();
      expect(appGameItemsPlayed).toBeTruthy();
      expect(appGameItems).toBeTruthy();
      expect(appPlayerScoreHuman).toBeTruthy();
      expect(appHallOfFame).toBeTruthy();

      done();
    });
  });
});
