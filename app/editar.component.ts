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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Produto } from './objs/produto';
import { ProdutoSvc } from './objs/produto.svc';
import { ValidationSvc } from './objs/validn.svc';


@Component({
    selector: 'edit',
    templateUrl: 'app/partials/editar.component.html'
})

export class EditarComponent {

    form: Produto = { id: "", nome: "", preco: 0, desconto: 0, precoDescontado: 0, promo: false, imagem: "" };
    produtoGroup: FormGroup;

    erro: string;
    produto: Produto;

    constructor(private produtoSvc: ProdutoSvc, private fb: FormBuilder, private router: Router) { }

    ngAfterViewInit() {
        //$("#loader").hide();
        document.getElementById("loader").style.visibility = "hidden";
    }

    ngOnDestroy(): void {
        //$("#loader").show();
        document.getElementById("loader").style.visibility = "visible";
    }

    promo: boolean;

    ngOnInit(): void {

        this.produtoSvc.getProduto(this.router.url.replace("/produtos/edit/", ""))
            .subscribe(
            r => {

                if(r == null || r == undefined) {
                    let link = ['/produtos'];
                    this.router.navigate(link);
                    return;
                }

                this.produtoGroup.get("id").setValue(r.id);
                this.produtoGroup.get("nome").setValue(r.nome);
                this.produtoGroup.get("preco").setValue(r.preco);
                this.produtoGroup.get("imagem").setValue(r.imagem);
                this.produtoGroup.get("desconto").setValue(r.desconto);
                this.produtoGroup.get("promo").setValue(r.promo);

                this.produto = r;


            },
            e => { this.erro = e; }
            );

        this.buildForm();

    }

    buildForm(): void {
        this.produtoGroup = this.fb.group({
            'id': [this.form.id, [Validators.required, ValidationSvc.id]],
            'nome': [this.form.nome, [Validators.required, ValidationSvc.nome]],
            'preco': [this.form.preco, [Validators.required, ValidationSvc.preco]],
            'imagem': [this.form.imagem, [Validators.required, ValidationSvc.imagem]],
            'desconto': [this.form.desconto, [Validators.required, ValidationSvc.desconto]],
            'promo': this.promo
        });
        this.produtoGroup.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    formErrors = {
        'id': '',
        'nome': '',
        'preco': '',
        'imagem': '',
        'desconto': ''
    };

    onValueChanged(data?: any) {
        var form = this.produtoGroup;
        for (var field in this.formErrors) {   
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && !control.valid) {
                var messages = ValidationSvc.messages[field];
                for (var key in control.errors) this.formErrors[field] += messages[key] + ' ';
            }
        }
    }

    submitted: boolean;
    mp: Produto;

    onSubmit() {
        this.submitted = true;

        if (!this.produtoGroup.valid)
            return;

        if (this.produtoGroup.value.desconto != 0) {
            this.produtoGroup.value.promo = true;
        } else {
            this.produtoGroup.value.promo = false;
        }

        this.mp = {
            id: this.produtoGroup.value.id,
            nome: this.produtoGroup.value.nome,
            imagem: this.produtoGroup.value.imagem,
            preco: this.produtoGroup.value.preco,
            desconto: this.produtoGroup.value.desconto,
            precoDescontado: this.produtoGroup.value.preco - (this.produtoGroup.value.preco / 100) * this.produtoGroup.value.desconto,
            promo: this.produtoGroup.value.promo
        };

        this.atualizar(this.mp);

    }

    atualizar(produto: Produto) {

        this.produtoSvc​​.atualizar(produto)
            .subscribe(
            r => {
                console.log(r);

                let link = ['/produtos/' + produto.id];
                this.router.navigate(link);
            },
            e => {
                this.erro = e;
                console.log(e);
            })
    }

    remover(): void {
        this.produtoSvc.remover(this.produto.id)
            .subscribe(
            r => {
                let link = ['/produtos'];
                this.router.navigate(link);
            },
            e => { console.log(e); }
            );
    }
}
