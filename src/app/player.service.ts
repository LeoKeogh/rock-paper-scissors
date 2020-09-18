import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Player } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl = 'api/players';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      tap((newPlayer: Player) => console.log(`added player`, newPlayer)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  getPlayer(playerName: string): Observable<Player | undefined> {
    const url = `${this.playersUrl}/${playerName}`;
    return this.http.get<Player | undefined>(url).pipe(
      tap(player => console.log(`fetched player`, player)),
      catchError(this.handleError<Player>(`getPlayer name=${playerName}`))
    );
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl).pipe(
      tap(players => console.log(`fetched players`, players)),
      catchError(this.handleError<Player[]>(`getPlayers`))
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

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
