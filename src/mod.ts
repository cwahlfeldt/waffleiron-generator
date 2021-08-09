import {
    createDirBuildPaths,
    createFileBuildPaths,
    createDirectories,
    createFiles,
} from "./waffleiron.ts";

if (Deno.args.length) {
    const path = Deno.args[0]
    // const outPath = Deno.args[1]
    const dirBuildPaths = await createDirBuildPaths(path)
    const fileBuildPaths = await createFileBuildPaths(path)

    await createDirectories(dirBuildPaths)
        .then(() => console.log('directories built'))

    await createFiles(fileBuildPaths)
        .then(() => console.log('files built :)'))

} else {
    console.log('provide directory')
}

