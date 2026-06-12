This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Product catalog

The catalog (`data/products.json`, `lib/categories.ts`) is generated from the
original Ukrainian site `https://rikomarket.com.ua` and translated to Lithuanian.
The pipeline lives in `scripts/` and is re-runnable (the HTML cache under
`scripts/.scrape-cache/` is git-ignored):

```bash
node scripts/scrape-fetch.mjs            # 1. cache all product + category pages
node scripts/scrape-parse-categories.mjs # 2. categories-raw.json (UA hierarchy)
node scripts/scrape-parse-products.mjs   # 3. products-raw.json (UA, structured)
node scripts/scrape-inventory.mjs        # 4. (optional) list strings to translate
node scripts/scrape-generate.mjs         # 5. write data/products.json + lib/categories.ts
node scripts/scrape-images.mjs           # 6. download images to public/products/orig/
```

Step 5 applies the `scripts/translations-*.json` dictionaries (UA → LT) by exact
match and prints any untranslated strings. `lib/products.ts` reads the generated
JSON; `lib/categories.ts` is generated and should not be hand-edited.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
