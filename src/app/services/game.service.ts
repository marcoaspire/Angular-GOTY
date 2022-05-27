import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class GameService {

  private games:Game[]=[];

  constructor(private http:HttpClient) { }


  getNominees(flag:boolean){

    if (this.games.length > 0 && !flag){
      console.log("cache");
      
      return of(this.games);
    }
    else{
      console.log("api");
      
      return this.http.get<Game[]>(`${environment.url}/api/game`)
        .pipe(
          tap(games=> this.games=games)
        );
    }
  }

  voteGame(game:Game){
    return this.http.put(`${environment.url}/api/game/${game.gameID}`,game);
  }


}
