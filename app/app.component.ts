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

import { Component }  from '@angular/core';
import { ProdutoSvc } from "./objs/produto.svc";
import { Produto }    from "./objs/produto";
import { Router }     from '@angular/router';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

@Component({
   selector: 'angular-app',
   templateUrl: 'app/partials/app.component.html'
})

export class AppComponent {

    editable: boolean;
    id: string;
    results: Observable<Produto[]>;
    private searchTerms = new Subject<string>();

    constructor(private router: Router, private produtoSvc: ProdutoSvc){
        router.events.subscribe(n => { 
            this.editable = this.router.url.includes("/produtos/") && !this.router.url.includes("/produtos/add") && !this.router.url.includes("/produtos/edit"); 
            if(this.editable) { this.id = this.router.url.replace("/produtos/", ""); }
    
        });
     }

     search(query:string) {
         this.searchTerms.next(query); 
     }

     ngOnInit() {
         this.results = this.searchTerms
            .debounceTime(0)       
            .distinctUntilChanged()   
            .switchMap(termo => termo ? this.produtoSvc.getProdutosByName(termo) : Observable.of<Produto[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Produto[]>([]);
            });
     }
    
}
