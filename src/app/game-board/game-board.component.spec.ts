import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { EggComponent } from '../egg/egg.component';
import { GameItemComponent } from '../game-item/game-item.component';
import { GameItemsPlayedComponent } from '../game-items-played/game-items-played.component';
import { GameItemsComponent } from '../game-items/game-items.component';
import { Player, PlayerImpl, PlayerType, ScoreImpl } from '../game.model';
import { GameService } from '../game.service';
import { HallOfFameComponent } from '../hall-of-fame/hall-of-fame.component';
import { PlayerScoreComponent } from '../player-score/player-score.component';
import { PlayerService } from '../player.service';
import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  const activatedRouteSpy: jasmine.SpyObj<ActivatedRoute> = jasmine.createSpyObj(
    'activatedRoute',
    ['snapshot']
  );
  activatedRouteSpy.snapshot.queryParams = [];
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('router', [
    'navigate',
  ]);
  const playerServiceSpy: jasmine.SpyObj<PlayerService> = jasmine.createSpyObj(
    'playerService',
    ['getPlayer', 'getPlayers', 'updatePlayer']
  );
  playerServiceSpy.getPlayer.and.returnValue(of(undefined));
  playerServiceSpy.getPlayers.and.returnValue(of(undefined));
  playerServiceSpy.updatePlayer.and.returnValue(of(undefined));

  let appPlayerScoreComputer: HTMLElement;
  let appGameItemsPlayed: HTMLElement;
  let appGameItems: HTMLElement;
  let appPlayerScoreHuman: HTMLElement;
  let appHallOfFame: HTMLElement;
  let appEgg: HTMLElement;

  let titleSpan: HTMLSpanElement;
  let newGameButton: HTMLDivElement;
  let enableGoreButton: HTMLDivElement;

  let gameItem: HTMLImageElement;

  const gameService = new GameService();

  const players: Player[] = [
    new PlayerImpl(
      'beavis',
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl(1, 2, 3, 25)
    ),
    new PlayerImpl('kenny'),
    new PlayerImpl(
      'butthead',
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
        EggComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatRippleModule
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to / when playerName not in URL', () => {
    expect(component).toBeTruthy();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to / when player does not exist', () => {
    expect(component).toBeTruthy();

    activatedRouteSpy.snapshot.queryParams.playerName = 'kenny';
    component.ngOnInit();

    expect(playerServiceSpy.getPlayer).toHaveBeenCalledWith('kenny');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should init game board when player exists', (done) => {
    expect(component).toBeTruthy();
    activatedRouteSpy.snapshot.queryParams.playerName = 'kenny';
    playerServiceSpy.getPlayer.and.returnValue(
      of(players.filter((p) => p.name === 'kenny')[0])
    );
    playerServiceSpy.getPlayers.and.returnValue(of(players));

    // all stored booleans true (gore and easter egg mode activated)
    spyOn(localStorage, 'getItem').and.returnValue("true");

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      titleSpan = fixture.nativeElement.getElementsByClassName(
        'game-board-title'
      )[0]
      expect(titleSpan).toBeTruthy();
      expect(titleSpan.textContent.trim()).toEqual('Rock Paper Shotgun™');

      newGameButton = fixture.nativeElement.getElementsByClassName(
        'new-game-button'
      )[0];
      expect(newGameButton).toBeTruthy();
      expect(newGameButton.textContent.trim()).toEqual('New Game');

      enableGoreButton = fixture.nativeElement.getElementsByClassName(
        'enable-gore-button'
      )[0];
      expect(enableGoreButton).toBeTruthy();
      expect(enableGoreButton.textContent.trim()).toEqual('Disable Gore');

      appPlayerScoreComputer = fixture.nativeElement.querySelector(
        'app-player-score'
      );
      appGameItemsPlayed = fixture.nativeElement.querySelector(
        'app-game-items-played'
      );
      appGameItems = fixture.nativeElement.querySelector('app-game-items');
      appPlayerScoreHuman = fixture.nativeElement.querySelectorAll(
        'app-player-score'
      )[1];
      appHallOfFame = fixture.nativeElement.querySelector('app-hall-of-fame');
      appEgg = fixture.nativeElement.querySelector('app-egg');

      expect(appPlayerScoreComputer).toBeTruthy();
      expect(appGameItemsPlayed).toBeTruthy();
      expect(appGameItems).toBeTruthy();
      expect(appPlayerScoreHuman).toBeTruthy();
      expect(appHallOfFame).toBeTruthy();
      expect(appEgg).toBeTruthy();

      done();
    });
  });

  it('should handle item click', (done) => {
    expect(component).toBeTruthy();
    activatedRouteSpy.snapshot.queryParams.playerName = 'kenny';
    playerServiceSpy.getPlayer.and.returnValue(
      of(players.filter((p) => p.name === 'kenny')[0])
    );
    playerServiceSpy.getPlayers.and.returnValue(of(players));
    playerServiceSpy.getPlayers.and.returnValue(of(players));

    // all stored booleans true (gore and easter egg mode activated)
    spyOn(localStorage, 'getItem').and.returnValue("true");

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      gameItem = fixture.nativeElement.getElementsByClassName('rock')[0];
      expect(gameItem).toBeTruthy();
      expect(gameItem.src.endsWith('assets/images/rock-egged.png')).toBeTrue();

      gameItem.click()

      done();
    });
  })


  it('should navigate to / on new game click', (done) => {
    expect(component).toBeTruthy();
    activatedRouteSpy.snapshot.queryParams.playerName = 'kenny';
    playerServiceSpy.getPlayer.and.returnValue(
      of(players.filter((p) => p.name === 'kenny')[0])
    );
    playerServiceSpy.getPlayers.and.returnValue(of(players));

    // all stored booleans true (gore and easter egg mode activated)
    spyOn(localStorage, 'getItem').and.returnValue("true");

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      newGameButton = fixture.nativeElement.getElementsByClassName(
        'new-game-button'
      )[0];
      expect(newGameButton).toBeTruthy();
      expect(newGameButton.textContent.trim()).toEqual('New Game');

      newGameButton.click();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);

      done();
    });
  });

  it('should disable gore mode on button click', (done) => {
    expect(component).toBeTruthy();
    activatedRouteSpy.snapshot.queryParams.playerName = 'kenny';
    playerServiceSpy.getPlayer.and.returnValue(
      of(players.filter((p) => p.name === 'kenny')[0])
    );
    playerServiceSpy.getPlayers.and.returnValue(of(players));

    // all stored booleans true (gore and easter egg mode activated)
    spyOn(localStorage, 'getItem').and.returnValue("true");

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      enableGoreButton = fixture.nativeElement.getElementsByClassName(
        'enable-gore-button'
      )[0];
      expect(enableGoreButton).toBeTruthy();
      expect(enableGoreButton.textContent.trim()).toEqual('Disable Gore');
      expect(component.goreEnabled).toBeTrue();

      enableGoreButton.click();

      expect(component.goreEnabled).toBeFalse();

      done();
    });
  });

  it('should disable easter mode on egg click', (done) => {
    expect(component).toBeTruthy();
    activatedRouteSpy.snapshot.queryParams.playerName = 'kenny';
    playerServiceSpy.getPlayer.and.returnValue(
      of(players.filter((p) => p.name === 'kenny')[0])
    );
    playerServiceSpy.getPlayers.and.returnValue(of(players));

    // all stored booleans true (gore and easter egg mode activated)
    spyOn(localStorage, 'getItem').and.returnValue("true");

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      appEgg = fixture.nativeElement.querySelector('app-egg');
      expect(appEgg).toBeTruthy();
      const imgEgg = appEgg.querySelector('img');
      expect(imgEgg).toBeTruthy();
      expect(component.easterEnabled).toBeTrue();

      titleSpan = fixture.nativeElement.getElementsByClassName(
        'game-board-title'
      )[0]
      expect(titleSpan).toBeTruthy();
      expect(titleSpan.textContent.trim()).toEqual('Rock Paper Shotgun™');

      imgEgg.click();

      expect(component.easterEnabled).toBeFalse();

      expect(titleSpan.textContent.trim()).toEqual('Rock Paper Scissors');

      done();
    });
  });
});
