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

import { ProdutoSvc } from './produto.svc';

export class ValidationSvc {

    static id(control): any {
        if(!ValidationSvc.validaId(control.value))
            return { 'invalid': true };
        return false;
    }

    static nome(control): any {
        if(!ValidationSvc.validaNome(control.value))
            return { 'invalid': true };
        return false;
    }

    static imagem(control): any {
        if(!ValidationSvc.validaImagem(control.value))
            return { 'invalid': true };
        return false;
    }

    static preco(control): any {
        if(!ValidationSvc.validaPreco(control.value))
            return { 'invalid': true };
        return false;
    }

    static desconto(control): any {
        if(!ValidationSvc.validaDesconto(control.value))
            return { 'invalid': true };
        return false;
    }

    /****/

    static validaId(id: number): boolean {
        
        if(id.toString().length == 13){

            let tt = id.toString();

            let impar = Number(tt.charAt(0)) + Number(tt.charAt(2)) + 
                        Number(tt.charAt(4)) + Number(tt.charAt(6)) + 
                        Number(tt.charAt(8)) + Number(tt.charAt(10));

            let par   = Number(tt.charAt(1)) + Number(tt.charAt(3)) + 
                        Number(tt.charAt(5)) + Number(tt.charAt(7)) + 
                        Number(tt.charAt(9)) + Number(tt.charAt(11));
                        
            let total = (par * 3) + impar;

            console.log((10 - (total % 10)));

            return  ((10 - (total % 10)) == Number(tt.charAt(12)) ||
                    (10 - (total % 10)) == 10 && 0 == Number(tt.charAt(12)));

        }
        
        return false;
    }

    static validaNome(nome: string): boolean {
        if(nome == null || nome == "" || nome == 'undefined' || nome.match(/^[A-Za-z\u00C0-\u017F ]+/)) 
            return true;
        return false;
    }

    static validaImagem(url: string): boolean {
        if(url.match(/^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/))
            return true;
        return false;
    }

    static validaPreco(preco: number): boolean {
        if(preco > 0) 
            return true;
        return false;
    }

    static validaDesconto(desc: number): boolean {
        if(desc == 0 || desc > 0 && desc < 100) 
            return true;
        return false;
    }


    /*****/

    static messages = {
        "id": {
            'required': 'Campo de preenchimento obrigatório',
            'invalid':  'ID inválido'
        },
        "nome": {
            'required': 'Campo de preenchimento obrigatório',
            'invalid':  'Nome inválido'
        },
        "imagem": {
            'required': 'Campo de preenchimento obrigatório',
            'invalid':  'Imagem inválida'
        },
        "preco": {
            'required': 'Campo de preenchimento obrigatório',
            'invalid':  'Preço inválido'
        },
        "desconto": {
            'required': 'Campo de preenchimento obrigatório',
            'invalid':  'Desconto inválido'
        }
    }

}
