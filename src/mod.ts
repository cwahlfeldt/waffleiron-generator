import {
    createDirectories,
    createFiles,
    createFileStructure
} from "./waffleiron.ts";

const {buildDirectories, filePaths} = await createFileStructure('/Users/waffles/Library/Mobile Documents/iCloud~md~obsidian/Documents/Website')

await createDirectories(buildDirectories).then(r => console.log(r))
await createFiles(filePaths).then(r => console.log(r))
