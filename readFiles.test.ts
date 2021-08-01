import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";
import { readFile, convertMarkdownToHTML } from './readFiles.ts'

Deno.test("can read file", async () => {
    const file = await readFile('./test.md')
    assertEquals(file, '# cool')
})

Deno.test("can convert markdown to html", async () => {
    assertEquals(convertMarkdownToHTML('# cool'), '<h1>cool</h1>')
})