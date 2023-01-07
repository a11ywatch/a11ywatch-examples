import { a11yLint } from "a11y-js"

// single page scan
const scanUrl =  (url: string) => {
  return new Promise (async( resolve) => {
    const audit = await a11yLint(url);
    console.log(audit);
    resolve(audit)
  })
}


scanUrl("https://a11ywatch.com")