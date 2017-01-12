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
