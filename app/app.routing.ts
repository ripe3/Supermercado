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

import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarComponent      } from "./editar.component";
import { AddComponent         } from "./add.component";
import { ExibirComponent      } from "./exibir.component";

const appRoutes: Routes = [
    { path: '',                  redirectTo: '/home', pathMatch: 'full'  },
    { path: 'produtos/edit',     redirectTo: '/home', pathMatch: 'full'  },
    { path: 'home',              component: ExibirComponent },
    { path: 'produtos/edit/:id', component: EditarComponent },
    { path: 'produtos/add',      component: AddComponent    },
    { path: 'produtos/:id',      component: ExibirComponent },
    { path: 'produtos',          component: ExibirComponent },
    { path: 'promocoes',         component: ExibirComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
