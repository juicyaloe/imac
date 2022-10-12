import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const filePath = path.join(process.cwd(), 'data', 'trades.json');
        const fileData = fs.readFileSync(filePath);
        const json = JSON.parse(fileData.toString());
        json.push(req.body);
        fs.writeFileSync(filePath, JSON.stringify(json));
        return res.status(201).json({message: '정상적으로 등록되었습니다.'});
    } else if (req.method === 'GET') {
        const filePath = path.join(process.cwd(), 'data', 'trades.json');
        const fileData = fs.readFileSync(filePath);
        const json = JSON.parse(fileData.toString());
        return res.status(200).json({data: json});
    } else {
        return res.status(404).json({message: 'Not allowed API'});
    }
}
