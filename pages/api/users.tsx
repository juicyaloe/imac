import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const filePath = path.join(process.cwd(), 'testdata', 'users.json');
        const fileData = fs.readFileSync(filePath);

        try {
            const data = JSON.parse(fileData.toString());
            return res.status(200).json(data);
        } catch {
            return res.status(500).json({message: '예상치 못한 오류입니다.'});
        }
    } else {
        return res.status(404).json({message: 'Not allowed API'});
    }
}
