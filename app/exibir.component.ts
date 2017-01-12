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

import { Component, OnInit        } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router   } from '@angular/router';
import { Produto                  } from './objs/produto';
import { ProdutoSvc               } from './objs/produto.svc';

@Component({
   selector: 'exibir',
   templateUrl: 'app/partials/exibir.component.html'
})

export class ExibirComponent implements OnInit, OnDestroy  {

    produtos: Produto[] = [];
    produto: Produto;
    erro: string;

    isLoaded: boolean = false;

    constructor(private prodSvc: ProdutoSvc, private router: Router, private route:ActivatedRoute) {
        router.events.subscribe(n => { 
            if(this.router.url.includes("/produtos/") && this.isLoaded) { 
                this.ngOnInit();
            }    
        });
    }

    ngAfterViewInit() {
      //$("#loader").hide();
      document.getElementById("loader").style.visibility = "hidden";
    } 

    ngOnDestroy(): void {
        //$("#loader").show();
        document.getElementById("loader").style.visibility = "visible";
    }

    ngOnInit(): void {
        this.isLoaded = false;
        switch(this.router.url) {
            case "/promocoes":
                this.getPromocoes();
                break;
            case "/produtos":
                this.isLoaded = true;
            case "/home":
                this.getProdutos();
                break;
            default:
                this.getProduto();
                break;
        }

    }

    getProdutos(): void {

        this.prodSvc.getProdutos().subscribe(
            r => {
                this.produtos = r;
            },
            e => {
                this.erro = e;
            }
        );

    }

    getProduto(): void {
	console.log("loading");
        let id = this.route.snapshot.params['id'];

        if (isNaN(Number(id))) {
            this.getProdutos();
        } else {

            this.prodSvc.getProduto(id).subscribe(
                r => {
                    if(r == null || r == undefined) {
                        let link = ['/produtos'];
                        this.router.navigate(link);
                        return;
                    }

                    this.produto = r;
                },
                e => {
                    this.erro = e;
                }
            );

        }
    }

    getPromocoes(): void {

        this.prodSvc.getPromocoes().subscribe(
            r => {
                this.produtos = r;
            },
            e => {
                this.erro = e;
            }
        );

    }

}
