import Papa from 'papaparse';
import { User } from './types';

export async function loadCsvData(filePath: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            download: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                const users = results.data.map((row: any) => ({
                    id: Number(row.id),
                    name: String(row.name),
                    age: Number(row.age),
                    grade: String(row.grade)
                }));
                resolve(users as User[]);
            },
            error: (error) => {
                reject(new Error(`CSV parsing error: ${error}`));
            }
        });
    });
}



