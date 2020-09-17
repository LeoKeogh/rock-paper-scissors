import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Player } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersUrl = 'api/players';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addPlayer(player: Player): Observable<Player> {
    console.log("addPlayer", player);

    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      tap((newPlayer: Player) => console.log(`added player`, newPlayer)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  getPlayer(playerName: string): Observable<Player> {
    const url = `${this.playersUrl}/${playerName}`;
    return this.http.get<Player>(url).pipe(
      tap(player => console.log(`fetched player`, player)),
      catchError(this.handleError<Player>(`getPlayer name=${playerName}`))
    );
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put(this.playersUrl, player, this.httpOptions).pipe(
      tap(_ => console.log(`updated player`,  player)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
