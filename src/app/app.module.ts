import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PagesModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
