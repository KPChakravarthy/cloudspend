import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { LineComponent } from './components/charts/line/line.component';
import { DonutComponent } from './components/charts/donut/donut.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    CardComponent,
    LineComponent,
    DonutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
