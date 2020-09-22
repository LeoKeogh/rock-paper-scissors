import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ComponentFixtureAutoDetect, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Player, PlayerType } from "./game.model";

import { PlayerService } from "./player.service";

describe("PlayerService", () => {
  let service: PlayerService;

  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    "httpClient",
    ["get", "post", "put"]
  );

  const players: Player[] = [
    {
      name: "beavis",
      type: PlayerType.HUMAN,
      totalScore: {
        won: 10,
        draw: 20,
        lost: 30,
        winRatio: 10,
      },
    },
    {
      name: "butthead",
      type: PlayerType.HUMAN,
      totalScore: {
        won: 0,
        draw: 0,
        lost: 0,
        winRatio: 0,
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(PlayerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should add a player", () => {
    httpClientSpy.post.and.returnValue(of(players[0]));

    service.addPlayer(players[0]).subscribe((result) => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        service.playersUrl,
        players[0],
        service.httpOptions
      );
      expect(result).toEqual(players[0]);
    });
  });

  it("should get a player", () => {
    httpClientSpy.get.and.returnValue(of(players[1]));

    service.getPlayer(players[1].name).subscribe((result) => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        service.playersUrl + "/" + players[1].name
      );
      expect(result).toEqual(players[1]);
    });
  });

  it("should get players", () => {
    httpClientSpy.get.and.returnValue(of(players));

    service.getPlayers().subscribe((result) => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(service.playersUrl);
      expect(result).toEqual(players);
    });
  });

  it("should update a player", () => {
    httpClientSpy.put.and.returnValue(of(players[0]));

    service.updatePlayer(players[0]).subscribe((result) => {
      expect(httpClientSpy.put).toHaveBeenCalledWith(
        service.playersUrl,
        players[0],
        service.httpOptions
      );
      expect(result).toEqual(players[0]);
    });
  });
});
