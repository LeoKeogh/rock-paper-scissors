import { TestBed } from "@angular/core/testing";
import {
  GameItemType,
  GameResult,
  Player,
  PlayerImpl,
  PlayerType,
  ScoreImpl
} from "./game.model";
import { GameService } from "./game.service";

describe("GameService", () => {
  let service: GameService;

  const humanInit = new PlayerImpl(
    "beavis",
    PlayerType.HUMAN,
    /*currentScore*/ new ScoreImpl(1, 0, 2, 33),
    /*totalScore*/ new ScoreImpl(1, 0, 3, 25)
  );
  const computerInit = new PlayerImpl(
    "HAL",
    PlayerType.COMPUTER,
    /*currentScore*/ new ScoreImpl(2, 0, 1, 67),
    /*totalScore*/ new ScoreImpl(3, 0, 1, 75)
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  const expectHumanWon = (human: Player) => {
    let expectedHuman = PlayerImpl.from(humanInit);
    expectedHuman.currentScore.won++;
    expectedHuman.currentScore.winRatio = 50;
    expectedHuman.totalScore.won++;
    expectedHuman.totalScore.winRatio = 40;

    expect(human.currentScore).toEqual(expectedHuman.currentScore);
    expect(human.totalScore).toEqual(expectedHuman.totalScore);
  };

  const expectHumanDraw = (human: Player) => {
    let expectedHuman = PlayerImpl.from(humanInit);
    expectedHuman.currentScore.draw++;
    expectedHuman.currentScore.winRatio = 33;
    expectedHuman.totalScore.draw++;
    expectedHuman.totalScore.winRatio = 25;

    expect(human.currentScore).toEqual(expectedHuman.currentScore);
    expect(human.totalScore).toEqual(expectedHuman.totalScore);
  };

  const expectHumanLost = (human: Player) => {
    let expectedHuman = PlayerImpl.from(humanInit);
    expectedHuman.currentScore.lost++;
    expectedHuman.currentScore.winRatio = 25;
    expectedHuman.totalScore.lost++;
    expectedHuman.totalScore.winRatio = 20;

    expect(human.currentScore).toEqual(expectedHuman.currentScore);
    expect(human.totalScore).toEqual(expectedHuman.totalScore);
  };

  const expectComputerWon = (computer: Player) => {
    let expectedComputer = PlayerImpl.from(computerInit);
    expectedComputer.currentScore.won++;
    expectedComputer.currentScore.winRatio = 75;
    expectedComputer.totalScore.won++;
    expectedComputer.totalScore.winRatio = 80;

    expect(computer.currentScore).toEqual(expectedComputer.currentScore);
    expect(computer.totalScore).toEqual(expectedComputer.totalScore);
  };

  const expectComputerDraw = (computer: Player) => {
    let expectedComputer = PlayerImpl.from(computerInit);
    expectedComputer.currentScore.draw++;
    expectedComputer.currentScore.winRatio = 67;
    expectedComputer.totalScore.draw++;
    expectedComputer.totalScore.winRatio = 75;

    expect(computer.currentScore).toEqual(expectedComputer.currentScore);
    expect(computer.totalScore).toEqual(expectedComputer.totalScore);
  };

  const expectComputerLost = (computer: Player) => {
    let expectedComputer = PlayerImpl.from(computerInit);
    expectedComputer.currentScore.lost++;
    expectedComputer.currentScore.winRatio = 50;
    expectedComputer.totalScore.lost++;
    expectedComputer.totalScore.winRatio = 60;

    expect(computer.currentScore).toEqual(expectedComputer.currentScore);
    expect(computer.totalScore).toEqual(expectedComputer.totalScore);
  };

  it("should determine that human has won with paper vs rock and update scores accordingly", () => {
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.PAPER;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.SCISSORS;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.ROCK;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.PAPER;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.SCISSORS;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.ROCK;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.ROCK;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.PAPER;
    const computer = PlayerImpl.from(computerInit);
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
    const human = PlayerImpl.from(humanInit);
    human.playedItem = GameItemType.SCISSORS;
    const computer = PlayerImpl.from(computerInit);
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
