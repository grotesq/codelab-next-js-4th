import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const file = fs.readFileSync(path.resolve('./assets/menu.csv'), 'utf-8');
    const rows = file.split('\n');
    const json = [];
    rows.forEach(row => {
        if (row === '') return;
        const item = row.split(',')
        json.push({
            name: item[0],
            price: parseInt(item[1], 10),
        });
    });
    res.status(200).json(json);
}
