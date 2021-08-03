import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

import {
    DirectoryStructure,
    readFile,
    convertMarkdownToHTML,
    convertDirectoryTreeToObject,
    getFileType,
    getFileName,
} from '../readFiles.ts'

Deno.test("can read file", async () => {
    const file = await readFile('./tests/data/test.md')
    assertEquals(file, '# cool')
})

Deno.test("can convert markdown to html", () => {
    assertEquals(convertMarkdownToHTML('# cool'), '<h1 id="cool">cool</h1>\n')
})

Deno.test("can get type of file", () => {
    assertEquals(getFileType('/ok/markdown-text.md'), 'md')
    assertEquals(getFileType('/ok/markdown-text.txt'), 'txt')
})

Deno.test('can get filename without extension', () => {
    assertEquals(getFileName('/ok/markdown-text.md'), 'markdown-text')
    assertEquals(getFileName('/ok/text-one.txt'), 'text-one')
    assertEquals(getFileName('/folder/text-one.txt'), 'text-one')
})

Deno.test('can create file directory object', () => {
    assertEquals(convertDirectoryTreeToObject(''), <DirectoryStructure> {
        name: '',
        path: '',
        type: '',
        markdown: '',
        html: '',
    })
})