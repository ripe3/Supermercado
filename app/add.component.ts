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
        for (var field in this.formErrors) {    
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
