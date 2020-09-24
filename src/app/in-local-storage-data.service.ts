import { Injectable } from '@angular/core';
import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Player } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class InLocalStorageDataService implements InMemoryDbService {
  localStorageDbKey = 'rps-playerDb';

  players: Player[];

  private static finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

  createDb() {
    // create db from local storage
    this.retrieveFromLocalStorage();
    return { players: this.players };
  }

  get(requestInfo: RequestInfo): Observable<Player> {
    return requestInfo.utils.createResponse$(() => {
      const playerName = requestInfo.id;

      const data = !playerName
        ? this.players
        : this.players.filter((p) => p.name === playerName)[0];

      const options: ResponseOptions = {
        body: data,
        status: STATUS.OK,
      };
      return InLocalStorageDataService.finishOptions(options, requestInfo);
    });
  }

  post(requestInfo: RequestInfo): Observable<Player> {
    return requestInfo.utils.createResponse$(() => {
      const player = requestInfo.utils.getJsonBody(requestInfo.req);
      this.players.push(player);
      this.persistToLocalStorage();

      const options: ResponseOptions = {
        body: player,
        status: STATUS.OK,
      };
      return InLocalStorageDataService.finishOptions(options, requestInfo);
    });
  }

  put(requestInfo: RequestInfo): Observable<Player> {
    return requestInfo.utils.createResponse$(() => {
      const player = requestInfo.utils.getJsonBody(requestInfo.req);
      const index = this.players.findIndex((p) => p.name === player.name);
      if (index < 0) {
        return InLocalStorageDataService.finishOptions(
          {
            body: { error: `Player with name ${player.name} does not exist` },
            status: STATUS.BAD_REQUEST,
          },
          requestInfo
        );
      }

      this.players[index] = player;
      this.persistToLocalStorage();

      const options: ResponseOptions = {
        status: STATUS.NO_CONTENT,
      };
      return InLocalStorageDataService.finishOptions(options, requestInfo);
    });
  }

  private retrieveFromLocalStorage() {
    try {
      const localStorageValue = localStorage.getItem(this.localStorageDbKey);
      // decode from base64 (to confuse cheaters ;))
      const playerDbJson = localStorageValue
        ? atob(localStorage.getItem(this.localStorageDbKey))
        : '[]';
      // const playerDbJson = localStorageValue || "[]"
      this.players = JSON.parse(playerDbJson);
    } catch (e) {
      console.error('Failed to retrieve local storage data (data corrupted?)');
      this.players = [];
    }
  }

  private persistToLocalStorage() {
    // encode in base64 to confuse cheaters ;)
    const localStorageValue = btoa(JSON.stringify(this.players));
    // const localStorageValue = JSON.stringify(this.players);
    localStorage.setItem(this.localStorageDbKey, localStorageValue);
  }
}
