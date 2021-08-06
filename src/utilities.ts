import { walk, WalkEntry } from "https://deno.land/std@/fs/mod.ts";

export const changeMarkdownExtensionToHTML = (text: string) => (
    text.toLowerCase()
        .replace(/.md/g, '.html')
        .replace(/ /g, '-')
)

export const walkDirectory = async (dirName: string, callback: (arg0: WalkEntry) => void) => {
    for await (const entry of walk(dirName, {
        skip: [
            /.git/,
            /.idea/,
            /.DS_Store/,
            /\/.obsidian/
        ]
    })) {
        callback(entry)
    }
}