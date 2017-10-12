/*
 * Supermercado <https://github.com/ripe3/Supermercado>
 * 
 * Copyright (C) 2016-2017 - Luis Filipe <https://github.com/ripe3>
 * 
 * This program is free software under the terms of the 
 * GNU General Public License 3 (GPLv3) as published by
 * the Free Software Foundation.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 */

import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { routing }               from './app.routing';

import { EditarComponent      } from "./editar.component";
import { AddComponent         } from "./add.component";
import { ExibirComponent      } from "./exibir.component";
import { ProdutoSvc           } from "./objs/produto.svc";
import { ValorPipe            } from "./objs/valor.pipe";

import { InMemoryWebApiModule }  from 'angular2-in-memory-web-api';
import { InMemoryDataService }   from './objs/memory.svc';

import { AppComponent }          from './app.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing, InMemoryWebApiModule.forRoot(InMemoryDataService) ],
    declarations: [ AppComponent, EditarComponent, AddComponent, ExibirComponent, ValorPipe ],
    providers:    [ ProdutoSvc ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
