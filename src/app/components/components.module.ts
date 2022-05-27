import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//
import { NavbarComponent } from './navbar/navbar.component';
import { HorizontalBarGraphComponent } from './horizontal-bar-graph/horizontal-bar-graph.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    HorizontalBarGraphComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgChartsModule  
  ],
  exports:[
    NavbarComponent,
    HorizontalBarGraphComponent
  ]
})
export class ComponentsModule { }
