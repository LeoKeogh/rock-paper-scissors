import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameItemComponent } from './game-item/game-item.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayerScoreComponent } from './player-score/player-score.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InLocalStorageDataService } from './in-local-storage-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { GameItemsComponent } from './game-items/game-items.component';
import { GameItemsPlayedComponent } from './game-items-played/game-items-played.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GameBoardComponent,
    GameItemComponent,
    PlayerScoreComponent,
    HallOfFameComponent,
    GameItemsComponent,
    GameItemsPlayedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InLocalStorageDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
