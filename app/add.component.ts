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

import { Component }    from '@angular/core';
import { Router }       from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Produto }       from './objs/produto';
import { ProdutoSvc }    from './objs/produto.svc';
import { ValidationSvc } from './objs/validn.svc';

declare var $:any;

@Component({
   selector: 'add',
   templateUrl: 'app/partials/add.component.html'
})

export class AddComponent {

    form: Produto = { id: "", nome: "", preco: 0,  desconto: 0, precoDescontado: 0, promo: false,  imagem: "" };
    produtoGroup: FormGroup;

    erro: string;
    

    constructor(private produtoSvc: ProdutoSvc, private fb: FormBuilder, private router: Router) { }

    ngAfterViewInit() {
      //$("#loader").hide();
      document.getElementById("loader").style.visibility = "hidden";
    } 

    ngOnDestroy(): void {
        //$("#loader").show();
        document.getElementById("loader").style.visibility = "visible";
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.produtoGroup = this.fb.group({
            'id':       [this.form.id,       [Validators.required, ValidationSvc.id]],
            'nome':     [this.form.nome,     [Validators.required, ValidationSvc.nome]],
            'preco':    [this.form.preco,    [Validators.required, ValidationSvc.preco]],
            'imagem':   [this.form.imagem,   [Validators.required, ValidationSvc.imagem]],
            'desconto': [this.form.desconto, [Validators.required, ValidationSvc.desconto]],
            'promo':    false
        });
        this.produtoGroup.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); 
    }

    formErrors = {
        'id':       '',
        'nome':     '',
        'preco':    '',
        'imagem':   '',
        'desconto': ''
    };

    onValueChanged(data?: any) {
        var form = this.produtoGroup;
        for (var field in this.formErrors) {    // field irá valer: nome, cpf, dataNasc e salario
            this.formErrors[field] = ''; 
            var control = form.get(field);
            if (control && !control.valid) {
                var messages = ValidationSvc.messages[field];
                for (var key in control.errors) this.formErrors[field] = messages[key] + ' ';                
            }
        }
    }

    submitted: boolean;

    mp: Produto;

    onSubmit() {
        this.submitted = true;

        if(!this.produtoGroup.valid)
            return;

        if(this.produtoGroup.value.desconto != 0){
            this.produtoGroup.value.promo = true;
        } else {
            this.produtoGroup.value.promo = false;
        }

        //this.produtoGroup.value.preco = this.produtoGroup.value.preco.replace(",",".");

        this.mp = { id: this.produtoGroup.value.id,
                    nome: this.produtoGroup.value.nome,
                    imagem: this.produtoGroup.value.imagem,
                    preco: this.produtoGroup.value.preco,
                    desconto: this.produtoGroup.value.desconto,
                    precoDescontado: this.produtoGroup.value.preco - (this.produtoGroup.value.preco/100)*this.produtoGroup.value.desconto,
                    promo: this.produtoGroup.value.promo};

        this.cadastrar(this.mp);

    }

    cadastrar(produto: Produto) {
        
        this.produtoSvc.getProduto(produto.id).subscribe(
            r => {

                console.log(r);

                if(r == null) {

                    this.produtoSvc​​.cadastrar(produto)
                    .subscribe(
                        r => {
                            console.log ("recebido");

                            if(r != null) {
                                let link = ['/produtos/' + produto.id];
                                this.router.navigate(link);
                            } else {
                                this.erro = "Este ID já está cadastrado";
                                $('#myModal').modal('show'); 
                            }
                        },
                        e => {
                            console.log(e);
                        }
                    )

                } else {
                    this.erro = "Já existe um produto cadastrado com este mesmo ID.";
                    $('#myModal').modal('show'); 
                }

            },
            e => { }
        )

        
    }

}
