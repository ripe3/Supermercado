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
