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
