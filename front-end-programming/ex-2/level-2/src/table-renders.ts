import { User, SortConfig, FilterConfig, TableConfig } from './types';

export class TableRenderer {
    private container: HTMLElement;
    private data: User[] = [];
    private config: TableConfig = {
        sort: { column: 'id', direction: 'asc' },
        filters: [],
        highlightRules: [
            { column: 'grade', value: 'A', color: '#e6ffe6' }
        ]
    };

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`Container element with id '${containerId}' not found`);
        }
        this.container = element;
    }

    public setData(data: User[]): void {
        this.data = data;
        this.render();
    }

    private filterData(): User[] {
        return this.data.filter(user => 
            this.config.filters.every(filter => {
                const value = user[filter.column].toString().toLowerCase();
                return value.includes(filter.value.toLowerCase());
            })
        );
    }

    private sortData(filteredData: User[]): User[] {
        return [...filteredData].sort((a, b) => {
            const aValue = a[this.config.sort.column];
            const bValue = b[this.config.sort.column];
            
            const modifier = this.config.sort.direction === 'asc' ? 1 : -1;
            
            if (aValue < bValue) return -1 * modifier;
            if (aValue > bValue) return 1 * modifier;
            return 0;
        });
    }

    private createFilterInput(column: keyof User): HTMLInputElement {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Filter ${column}...`;
        input.className = 'filter-input';
        
        input.addEventListener('input', (e) => {
            const value = (e.target as HTMLInputElement).value;
            this.updateFilter(column, value);
        });
        
        return input;
    }

    private updateFilter(column: keyof User, value: string): void {
        const existingFilterIndex = this.config.filters.findIndex(f => f.column === column);
        
        if (value === '') {
            if (existingFilterIndex !== -1) {
                this.config.filters.splice(existingFilterIndex, 1);
            }
        } else {
            if (existingFilterIndex !== -1) {
                this.config.filters[existingFilterIndex].value = value;
            } else {
                this.config.filters.push({ column, value });
            }
        }
        
        this.render();
    }

    private handleHeaderClick(column: keyof User): void {
        if (this.config.sort.column === column) {
            this.config.sort.direction = this.config.sort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.config.sort = { column, direction: 'asc' };
        }
        this.render();
    }

    private getHighlightStyle(user: User): string | null {
        const rule = this.config.highlightRules.find(r => 
            user[r.column].toString() === r.value
        );
        return rule ? rule.color : null;
    }

    private render(): void {
        const table = document.createElement('table');
        table.className = 'data-table';

        // Create header
        const thead = document.createElement('thead');
        const filterRow = document.createElement('tr');
        const headerRow = document.createElement('tr');
        const columns: (keyof User)[] = ['id', 'name', 'age', 'grade'];

        columns.forEach(column => {
            // Filter inputs
            const filterCell = document.createElement('th');
            filterCell.appendChild(this.createFilterInput(column));
            filterRow.appendChild(filterCell);

            // Column headers
            const th = document.createElement('th');
            th.textContent = column.charAt(0).toUpperCase() + column.slice(1);
            th.addEventListener('click', () => this.handleHeaderClick(column));
            
            if (this.config.sort.column === column) {
                th.classList.add('sorted', this.config.sort.direction);
            }
            
            headerRow.appendChild(th);
        });

        thead.appendChild(filterRow);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create body
        const tbody = document.createElement('tbody');
        const filteredData = this.filterData();
        const sortedData = this.sortData(filteredData);

        sortedData.forEach(user => {
            const row = document.createElement('tr');
            const highlightColor = this.getHighlightStyle(user);
            if (highlightColor) {
                row.style.backgroundColor = highlightColor;
            }

            columns.forEach(column => {
                const td = document.createElement('td');
                td.textContent = user[column].toString();
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Replace existing content
        this.container.innerHTML = '';
        this.container.appendChild(table);
    }
}