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
