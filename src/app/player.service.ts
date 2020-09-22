import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Player } from "./game.model";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  playersUrl = "api/players"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  addPlayer(player: Player): Observable<Player> {
    return this.http
      .post<Player>(this.playersUrl, player, this.httpOptions)
      .pipe(catchError(this.handleError<Player>("addPlayer")));
  }

  getPlayer(playerName: string): Observable<Player | undefined> {
    const url = `${this.playersUrl}/${playerName}`;
    return this.http
      .get<Player | undefined>(url)
      .pipe(
        catchError(this.handleError<Player>(`getPlayer name=${playerName}`))
      );
  }

  getPlayers(): Observable<Player[]> {
    return this.http
      .get<Player[]>(this.playersUrl)
      .pipe(catchError(this.handleError<Player[]>(`getPlayers`)));
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http
      .put(this.playersUrl, player, this.httpOptions)
      .pipe(catchError(this.handleError<any>("updatePlayer")));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
