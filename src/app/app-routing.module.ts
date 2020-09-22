import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameBoardComponent } from "./game-board/game-board.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "game-board", component: GameBoardComponent },
  { path: "**", redirectTo: "/welcome", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
