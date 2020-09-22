import { TestBed } from "@angular/core/testing";
import _cloneDeep from "lodash/cloneDeep";
import {
  GameItemType,
  GameResult,
  NewPlayer,
  Player,
  PlayerType,
} from "./game.model";
import { GameService } from "./game.service";

describe("GameService", () => {
  let service: GameService;

  const humanInit: Player = {
    ..._cloneDeep(NewPlayer),
    name: "Beavis",
    currentScore: {
      won: 1,
      draw: 0,
      lost: 2,
      winRatio: 33,
    },
    totalScore: {
      won: 1,
      draw: 0,
      lost: 3,
      winRatio: 25,
    },
  };

  const computerInit: Player = {
    ..._cloneDeep(NewPlayer),
    name: "HAL",
    type: PlayerType.COMPUTER,
    currentScore: {
      won: 2,
      draw: 0,
      lost: 1,
      winRatio: 67,
    },
    totalScore: {
      won: 3,
      draw: 0,
      lost: 1,
      winRatio: 75,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  const expectHumanWon = (human) => {
    expect(human).toEqual({
      ..._cloneDeep(humanInit),
      playedItem: human.playedItem,
      currentScore: {
        won: 2,
        draw: 0,
        lost: 2,
        winRatio: 50,
      },
      totalScore: {
        won: 2,
        draw: 0,
        lost: 3,
        winRatio: 40,
      },
    });
  };

  const expectHumanDraw = (human) => {
    expect(human).toEqual({
      ..._cloneDeep(humanInit),
      playedItem: human.playedItem,
      currentScore: {
        won: 1,
        draw: 1,
        lost: 2,
        winRatio: 33,
      },
      totalScore: {
        won: 1,
        draw: 1,
        lost: 3,
        winRatio: 25,
      },
    });
  };

  const expectHumanLost = (human) => {
    expect(human).toEqual({
      ..._cloneDeep(humanInit),
      playedItem: human.playedItem,
      currentScore: {
        won: 1,
        draw: 0,
        lost: 3,
        winRatio: 25,
      },
      totalScore: {
        won: 1,
        draw: 0,
        lost: 4,
        winRatio: 20,
      },
    });
  };

  const expectComputerWon = (computer) => {
    expect(computer).toEqual({
      ..._cloneDeep(computerInit),
      playedItem: computer.playedItem,
      currentScore: {
        won: 3,
        draw: 0,
        lost: 1,
        winRatio: 75,
      },
      totalScore: {
        won: 4,
        draw: 0,
        lost: 1,
        winRatio: 80,
      },
    });
  };

  const expectComputerDraw = (computer) => {
    expect(computer).toEqual({
      ..._cloneDeep(computerInit),
      playedItem: computer.playedItem,
      currentScore: {
        won: 2,
        draw: 1,
        lost: 1,
        winRatio: 67,
      },
      totalScore: {
        won: 3,
        draw: 1,
        lost: 1,
        winRatio: 75,
      },
    });
  };

  const expectComputerLost = (computer) => {
    expect(computer).toEqual({
      ..._cloneDeep(computerInit),
      playedItem: computer.playedItem,
      currentScore: {
        won: 2,
        draw: 0,
        lost: 2,
        winRatio: 50,
      },
      totalScore: {
        won: 3,
        draw: 0,
        lost: 2,
        winRatio: 60,
      },
    });
  };

  it("should determine that human has won with paper vs rock and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.PAPER;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.ROCK;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.WIN);
    expectHumanWon(human);
    expectComputerLost(computer);
  });

  it("should determine that human has won with scissors vs paper and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.SCISSORS;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.PAPER;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.WIN);
    expectHumanWon(human);
    expectComputerLost(computer);
  });

  it("should determine that human has won with rock vs scissors and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.ROCK;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.SCISSORS;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.WIN);
    expectHumanWon(human);
    expectComputerLost(computer);
  });

  it("should determine that human has lost with paper vs scissors and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.PAPER;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.SCISSORS;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.LOSE);
    expectHumanLost(human);
    expectComputerWon(computer);
  });

  it("should determine that human has lost with scissors vs rock and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.SCISSORS;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.ROCK;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.LOSE);
    expectHumanLost(human);
    expectComputerWon(computer);
  });

  it("should determine that human has lost with rock vs paper and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.ROCK;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.PAPER;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.LOSE);
    expectHumanLost(human);
    expectComputerWon(computer);
  });

  it("should determine a draw with rocks and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.ROCK;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.ROCK;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.DRAW);
    expectHumanDraw(human);
    expectComputerDraw(computer);
  });

  it("should determine a draw with papers and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.PAPER;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.PAPER;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.DRAW);
    expectHumanDraw(human);
    expectComputerDraw(computer);
  });

  it("should determine a draw with scissors and update scores accordingly", () => {
    const human: Player = _cloneDeep(humanInit);
    human.playedItem = GameItemType.SCISSORS;
    const computer: Player = _cloneDeep(computerInit);
    computer.playedItem = GameItemType.SCISSORS;

    const humanResult = service.determineResultAndRefreshScores(
      human,
      computer
    );

    expect(humanResult).toEqual(GameResult.DRAW);
    expectHumanDraw(human);
    expectComputerDraw(computer);
  });

  it("should get a game item type", () => {
    const itemType = service.getRandomItemType();

    expect(
      [GameItemType.ROCK, GameItemType.PAPER, GameItemType.SCISSORS].includes(
        itemType
      )
    ).toBeTrue();
  });
});
