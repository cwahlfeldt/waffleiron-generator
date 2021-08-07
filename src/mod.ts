import {
    createDirBuildPaths,
    createFileBuildPaths,
    createDirectories,
    createFiles,
} from "./waffleiron.ts";

const path = '/Users/waffles/Library/Mobile Documents/iCloud~md~obsidian/Documents/Website'
const dirBuildPaths = await createDirBuildPaths(path)
const fileBuildPaths = await createFileBuildPaths(path)

await createDirectories(dirBuildPaths).then(r => console.log('all directories built'))
await createFiles(fileBuildPaths).then(r => console.log('all files built :)'))
