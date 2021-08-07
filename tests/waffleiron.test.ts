import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";
import { changeMarkdownExtensionToHTML } from "../src/utilities.ts";
import { createDirBuildPaths, createFileBuildPaths } from "../src/waffleiron.ts";

Deno.test('can change .md to .html', () => {
    assertEquals(changeMarkdownExtensionToHTML('/cool/dope.md'), '/cool/dope.html')
    assertEquals(changeMarkdownExtensionToHTML('/cool-ok--ok/dope-ness.ok.md'), '/cool-ok--ok/dope-ness.ok.html')
})

Deno.test('can create an array of build directory paths', async () => {
    assertEquals(await createDirBuildPaths('tests/data'), ['./build/posts'])
})

Deno.test('can create an array of build file paths', async () => {
    assertEquals(await createFileBuildPaths('tests/data'), [
        {
            source: 'tests/data/posts/index.md',
            out: './build/posts/index.html'
        },
        {
            source: 'tests/data/posts/post-one.md',
            out: './build/posts/post-one.html'
        },
        {
            source: 'tests/data/index.md',
            out: './build/index.html'
        },
        {
            source: 'tests/data/test.md',
            out: './build/test.html'
        },
    ])
})
