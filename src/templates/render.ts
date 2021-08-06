import { header } from './header.ts'
import { footer } from "./footer.ts";

export const renderMarkup = (markup: string): string => `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>site</title>
    </head>
    <body>
        ${ header('yo its the header') }
        
        <main id="main" class="main-content">
            ${ markup }
        </main>
        
        ${ footer('yo its the footer') }
    </body>
    </html>
`;