import path from 'path';
import fs from 'fs';

type db = {
    id: string;
    player: string[];
};

export default function handler(req, res) {
    if (req.method === 'GET') {
        const id = req.query.id;

        const filePath = path.join(process.cwd(), 'data', 'users.json');
        const fileData = fs.readFileSync(filePath);

        try {
            const playerList: string[] = [];
            const json = JSON.parse(fileData.toString());
            json.forEach((data: db) => {
                if (data.id === id) {
                    playerList.push(...data.player);
                }
            });

            if (playerList.length !== 0) {
                return res.status(200).json({data: playerList});
            } else {
                return res
                    .status(404)
                    .json({message: '해당 유저는 찾지 못했습니다.'});
            }
        } catch {
            return res.status(500).json({message: '예상치 못한 오류입니다.'});
        }
    } else {
        return res.status(404).json({message: 'Not allowed API'});
    }
}
