import { HttpClientModule} from '@angular/common/http'
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID,} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ModelComponent } from './model/model.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { OrderModule } from 'ngx-order-pipe';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HomeComponent,
    MenuComponent,
    EntrarComponent,
    RodapeComponent,
    ModelComponent,
    InicioComponent,
    EditUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
  ],
  providers: [{
    provide: LocationStrategy, 
    useClass: HashLocationStrategy
  },
  { provide: LOCALE_ID,
    useValue: 'pt'
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
