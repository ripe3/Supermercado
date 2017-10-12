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

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Produto } from './produto';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProdutoSvc {

    constructor(private http: Http) { }

    private totalProdutos = 3;
    private url = 'app/produtos';  // URL to web api


    getProduto(id: string): Observable<Produto> {
        return this.http.get(this.url + `/?id=${id}`)
            .map(response => {
                console.log(response.json());
                console.log(response.json().data);
                var Produtos: Produto[] = response.json().data as Produto[];
                return Produtos[0];
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })
    }

    getProdutos(): Observable<Produto[]> {
        return this.http.get(this.url)
            .map(response => {
                console.log(response.json());
                console.log(response.json().data);
                return response.json().data as Produto[];
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })
    }

    getPromocoes(): Observable<Produto[]> {
        return this.http.get(this.url + "/?promo=true")
            .map(response => {
                console.log(response.json());
                console.log(response.json().data);
                return response.json().data as Produto[];
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })
    }

    getProdutosByName(query:string): Observable<Produto[]> {
              
         console.log(query);
        return this.http.get(this.url + `/?nome=${query}`)
            .map(response => {
                console.log(response.json());
                console.log(response.json().data);
                return response.json().data as Produto[];
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    atualizar(Produto: Produto): Observable<Produto> {
        const url = `${this.url}/` + Produto.id;
        return this.http.put(url, JSON.stringify(Produto), { headers: this.headers })
            .map(() => {
                console.log(url);
                return Produto;
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })
    }

    cadastrar(Produto: Produto): Observable<Produto> {

        const url = `${this.url}/` + Produto.id;
        return this.http.post(url, JSON.stringify(Produto), { headers: this.headers })
            .map(() => {
                console.log(url);
                return Produto;
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })

    }

    remover(id: string): Observable<void> {
        const url = `${this.url}/` + id;
        return this.http.delete(url, { headers: this.headers })
            .map(r => {
                console.log(r);
            })
            .catch(erro => {
                return Observable.throw('status - ' + (erro.status) + ' '
                    + (erro.statusText) + ' - '
                    + (erro._body));
            })
    }
}
