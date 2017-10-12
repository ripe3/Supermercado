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

export class Produto {
    id:              string;
    nome:            string;
    imagem:          string;
    preco:           number;
    desconto:        number;
    precoDescontado: number;
    promo:           boolean;

}
