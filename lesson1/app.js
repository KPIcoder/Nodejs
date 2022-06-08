const fs = require('fs/promises')
const path = require('path')

const sortUsersByGender = async (readFolderName, writeFolderName, sex) => {
    try {
        const files = await fs.readdir(path.join(__dirname, readFolderName));

        for (let file of files) {
            const filePath = path.join(__dirname, readFolderName, file)
            const data = await fs.readFile(filePath)
            const {gender} = JSON.parse(data.toString());

            if (gender === sex)
                await fs.rename(filePath, path.join(__dirname, writeFolderName, file))
        }
    } catch (e) {
        console.error(e);
    }
}

sortUsersByGender('users', 'boys', 'male').then();
sortUsersByGender('users', 'girls', 'female').then();

