import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'
import { renderMarkup } from "./templates/render.ts";
import { changeMarkdownExtensionToHTML, walkDirectory } from "./utilities.ts";

export const createDirBuildPaths = async (dirName: string) => {
    let directoryArray: string[] = []
    await walkDirectory(dirName, async (entry) => {
        const newPath = './build' + changeMarkdownExtensionToHTML(entry.path.split(dirName).pop() ?? '').toLowerCase()
        if (entry.isDirectory) {
            directoryArray.push(newPath)
        }
    })
    directoryArray.shift() // first entry is always the . path, so remove that ish
    return directoryArray
}

export const createFileBuildPaths = async (dirName: string) => {
    let pathsArray: { source: string; out: string; }[] = []
    await walkDirectory(dirName, (entry) => {
        const newPath = './build' + changeMarkdownExtensionToHTML(entry.path.split(dirName).pop() ?? '').toLowerCase()
        if (entry.isFile) {
            pathsArray.push({
                source: entry.path,
                out: newPath,
            })
        }
    })
    return pathsArray
}

export const createDirectories = async (directoryPaths: any) => {
    await Deno.remove('build', { recursive: true })
    await Deno.mkdir('build')
    for (let i = 0; i < directoryPaths.length; i++) {
        await Deno.mkdir(directoryPaths[i])
    }
}

export const createFiles = async (filePaths: any) => {
    for (let i = 0; i < filePaths.length; i++) {
        const markup = Marked.parse(Deno.readTextFileSync(filePaths[i].source)).content
        Deno.writeTextFileSync(filePaths[i].out, renderMarkup(markup))
    }
}
