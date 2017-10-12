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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'valor'})
export class ValorPipe implements PipeTransform {
    transform(valor: string, args: string[]): any {
        if (!valor) return valor;

        if (isNaN(Number(valor))) {
            var n = Number(valor.replace(',','.'));
            var val = n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }
        else {
            var val = Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }

        return val;
    }
}
