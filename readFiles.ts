import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'

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