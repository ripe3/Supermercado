/*
 * Copyright 2016 ripe3 - https://github.com/ripe3
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
