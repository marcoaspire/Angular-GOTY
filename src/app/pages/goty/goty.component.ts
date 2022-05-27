import { Component, OnInit,ViewChild  } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styles:[]
})
export class GotyComponent implements OnInit {

  games:Game[]=[];

  constructor(private gameService:GameService){}

  ngOnInit(): void {

    this.gameService.getNominees(false).subscribe({
      next: (res:Game[]) => {
        console.log(res);
        this.games=res;
        
      },
      error: err => {

      }
      
    })

  }

  voteGame(game:Game){
    game.votes++;
    
    this.gameService.voteGame(game)
      .subscribe(
        {
          next: resp => {
            Swal.fire('Thank you','Vote' , 'success');
          },
          error: err => {
            Swal.fire('Oops',err.error.msg , 'error');
          }
        }
      )
    ;
  }
}
