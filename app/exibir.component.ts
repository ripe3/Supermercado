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
