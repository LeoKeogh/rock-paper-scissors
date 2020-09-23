import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Player, PlayerImpl, PlayerType, ScoreImpl } from "./game.model";
import { PlayerService } from "./player.service";

describe("PlayerService", () => {
  let service: PlayerService;

  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    "httpClient",
    ["get", "post", "put"]
  );

  const players: Player[] = [
    new PlayerImpl(
      "beavis",
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl(10, 20, 30, 10)
    ),
    new PlayerImpl(
      "butthead",
      PlayerType.HUMAN,
      /*currentScore*/ new ScoreImpl(),
      /*totalScore*/ new ScoreImpl()
    ),
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
