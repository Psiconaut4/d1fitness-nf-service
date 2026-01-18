import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('src/data/send-history.json');

export async function addSendHistory(entry) {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))

    data.push({
        ...entry,
        sentAt: new Date().toISOString(),
    })

    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function listSendHistory() {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}