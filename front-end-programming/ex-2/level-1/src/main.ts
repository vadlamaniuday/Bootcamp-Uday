import { loadJsonData } from './data-loader';
import { TableRenderer } from './table-renders';

async function initializeApp() {
    try {
        const tableRenderer = new TableRenderer('app');
        const data = await loadJsonData();
        tableRenderer.setData(data);
    } catch (error) {
        console.error('Failed to initialize app:', error);
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = 'Failed to load data. Please try again later.';
        document.getElementById('app')?.appendChild(errorElement);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);