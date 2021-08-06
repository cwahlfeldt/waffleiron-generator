import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";
import { changeMarkdownExtensionToHTML } from "../src/utilities.ts";

Deno.test('can change .md to .html', () => {
    assertEquals(changeMarkdownExtensionToHTML('/cool/dope.md'), '/cool/dope.html')
    assertEquals(changeMarkdownExtensionToHTML('/cool-ok--ok/dope-ness.ok.md'), '/cool-ok--ok/dope-ness.ok.html')
})