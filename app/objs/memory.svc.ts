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

import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let produtos = [
            { id: "7896205772735", nome: 'Pão de Queijo Recheado 390g',        preco: 13.90, desconto: 0,  precoDescontado: 0,    promo: false, imagem: "http://www.deliveryextra.com.br/img/uploads/1/110/481110x200x200.jpg" },
            { id: "7898230810116", nome: 'Guaraná Antarctica Black 350ml',     preco: 2.89,  desconto: 0,  precoDescontado: 0,    promo: false, imagem: "http://www.deliveryextra.com.br/img/uploads/1/958/484958x200x200.jpg" },
            { id: "7896493140513", nome: 'Toalha de Papel Qualitá 2 Unidades', preco: 3.49,  desconto: 20, precoDescontado: 2.79, promo: true,  imagem: "http://www.deliveryextra.com.br/img/uploads/1/149/523149x200x200.jpg" },
            { id: "7891021002127", nome: 'Filtro de papel Brigitta 103',       preco: 3.49,  desconto: 0,  precoDescontado: 0,    promo: false, imagem: "http://www.concordepr.com.br/shop/media/catalog/product/cache/1/image/800x800/e55b6bc748e08d98853cdb0297a71fbc/7/6/7613_1.jpg" }
        ];
        return { produtos };
    }
}
