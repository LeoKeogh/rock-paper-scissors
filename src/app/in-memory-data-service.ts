import { Injectable } from '@angular/core';
import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { Player } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  localStorageDbKey = "playerDb"

  players: Player[]

  createDb() {
    // create db from local storage for now
    const playerDbJson = localStorage.getItem(this.localStorageDbKey) || "[]"
    this.players = JSON.parse(playerDbJson);

    console.log("createDb", this.players);

    return {players: this.players};
  }

  get(requestInfo: RequestInfo): Observable<Player> {
    return requestInfo.utils.createResponse$(() => {
      console.log('HTTP GET override');

      const playerName = requestInfo.id;

      const data = !playerName ? this.players : this.players.filter(p => p.name === playerName)[0]

      const options: ResponseOptions = data ?
        {
          body: data,
          status: STATUS.OK
        } :
        {
          body: { error: `Player with name='${playerName}' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, requestInfo);
    });
  }

  post(requestInfo: RequestInfo ): Observable<Player> {
    return requestInfo.utils.createResponse$(() => {
      console.log('HTTP POST override');
      const player = requestInfo.utils.getJsonBody(requestInfo.req)
      this.players.push(player);
      this.persistToLocalStorage();

      const options: ResponseOptions =
        {
          body: player,
          status: STATUS.OK
        };
      return this.finishOptions(options, requestInfo);
    });
  }

  put(requestInfo: RequestInfo ): Observable<Player> {
    return requestInfo.utils.createResponse$(() => {
      console.log('HTTP PUT override');
      const player = requestInfo.utils.getJsonBody(requestInfo.req)
      const index = this.players.findIndex(p => p.name === player.name);
      if (index < 0) {
        return this.finishOptions( {
          body: { error: `Player with name ${player.name} does not exist`},
          status: STATUS.BAD_REQUEST
        }, requestInfo);
      }

      this.players[index] = player;
      this.persistToLocalStorage();

      const options: ResponseOptions =
        {
          status: STATUS.NO_CONTENT
        };
      return this.finishOptions(options, requestInfo);
    });
  }

  private persistToLocalStorage() {
    localStorage.setItem(this.localStorageDbKey, JSON.stringify(this.players));
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }}
