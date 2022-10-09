import path from 'path';
import fs from 'fs';

type db = {
    id: string;
    player: string[];
};

export default function handler(req, res) {
    if (req.method === 'GET') {
        const filePath = path.join(process.cwd(), 'data', 'database.json');
        const fileData = fs.readFileSync(filePath);

        try {
            let userList: string[] = [];
            const json = JSON.parse(fileData.toString());
            json.forEach((data: db) => {
                userList.push(data.id);
            });
            return res.status(200).json({data: userList});
        } catch {
            return res.status(500).json({message: '예상치 못한 오류입니다.'});
        }
    } else {
        return res.status(404).json({message: 'Not allowed API'});
    }
}
