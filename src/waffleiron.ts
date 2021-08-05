import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'
import { walk, walkSync } from "https://deno.land/std@/fs/mod.ts";
import { basename, dirname } from "https://deno.land/std/path/mod.ts";

const slugify = (text: string) => text.toLowerCase()
    .replace(/.md/g, '.html')
    .replace(/ /g, '-')

const convertDirectoryToArray = async (dirName: string) => {
    let objects = []
    let directoryArray = []
    let pathsArray = []
    let sourcePathsArray = []

    for await (const entry of walk(dirName, {
        skip: [
            /.git/,
            /.idea/,
            /.DS_Store/,
            /\/.obsidian/
        ]
    })) {
        const newPath = './build'+slugify(entry.path.split(dirName).pop() ?? '').toLowerCase()
        if (entry.isDirectory) {
            directoryArray.push(newPath)
        } else {
            sourcePathsArray.push(entry.path)
            pathsArray.push({
                source: entry.path,
                out: newPath,
            })
        }
    }
    directoryArray.shift()
    return {
        buildDirectories: directoryArray,
        filePaths: pathsArray,
    }
}
const {buildDirectories, filePaths} = await convertDirectoryToArray('/Users/waffles/Library/Mobile Documents/iCloud~md~obsidian/Documents/Website')

export const createDirectories = async (directoryPaths: any) => {
    await Deno.remove('build', { recursive: true })
    await Deno.mkdir('build')
    for (let i = 0; i < directoryPaths.length; i++)
        await Deno.mkdir(directoryPaths[i])
}

export const createFiles = async (filePaths: any) => {
    for (let i = 0; i < filePaths.length; i++) {
        const content = Marked.parse(Deno.readTextFileSync(filePaths[i].source)).content
        Deno.writeTextFileSync(filePaths[i].out, content)
    }
}

console.log(await createDirectories(buildDirectories))
console.log(await createFiles(filePaths))


export type DirectoryStructure = {
    name: string,
    path: string,
    type: string,
    markdown: string,
    html: string
}

export const readFile = (filePath: string) => Deno.readTextFile(filePath)

export const convertMarkdownToHTML = (markdown: string) => Marked.parse(markdown).content

export const getFileType = (filePath: string) => filePath.split('.').pop()

export const getFileName = (filePath: string) => {
    let path = filePath.split('.').shift()
    const lastSlash = path!.lastIndexOf('/')
    return path?.substr(lastSlash + 1 ?? 0, path.length)
}

export const convertDirectoryTreeToObject = (dirPath: string) => {
    return <DirectoryStructure> {
        name: '',
        path: '',
        type: '',
        markdown: '',
        html: '',
    }
}