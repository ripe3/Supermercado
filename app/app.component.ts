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
