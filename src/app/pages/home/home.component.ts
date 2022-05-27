import { Component, OnInit } from '@angular/core';
import { map,delay } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';
import * as signalR from '@microsoft/signalr'; 
import { environment } from 'src/environments/environment';
import { ChartData } from 'chart.js';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games:any[]=[];
  votes:any[]=[];
  public loading: boolean=true;

      
  productoData: ChartData<'bar'> = {
    labels: this.games,
    datasets:[
      { data: this.votes }
    ]
  }

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.loadGames()
    .subscribe({
      next: () => {
        this.loading=false;  
        this.productoData={
          labels: this.games,
          datasets:[
            { data: this.votes,label: 'Votes' }
          ]
        }
     },
      error: err => {
        console.log(err);
        
      }
    });
    
    const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(environment.url + '/notify')  
    .build(); 

    connection.start().then(function () {  
      console.log('SignalR Connected!'); 
      
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
    
    connection.on("BroadcastMessage", () => { 
      this.loading=true;  
      this.loadGames()
      .subscribe({
        next: () => {
          this.loading=false;             
          this.productoData={
            labels: this.games,
            datasets:[
              { data: this.votes,label: 'Votes' }
            ]
          }
        },
        error: err => {
          console.log(err);
        }          
      });
    });    
  }

  loadGames():Observable<any>{
    return this.gameService.getNominees(true)
      .pipe(
        map((resp:Game[])=> {

          if (this.games.length>0){
            this.votes=[];
            resp.map(({votes}) => {
              this.votes.push(votes);
            });
          }
          else{
            resp.map(({name,votes}) => {
              this.games.push(name);
              this.votes.push(votes);
            });
          }
          
        })
      )
  }

}
