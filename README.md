# RCCG Agape House — Nashville

Website for RCCG Agape House, a parish of the Redeemed Christian Church of God at 2128 Murfreesboro Pike, Nashville, TN.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 3 and lucide icons.

## Running locally

```bash
npm install
npm run dev -- -p 3100 --webpack
```

Then open http://localhost:3100. Use `npm run build && npm start` for a production build, and `npx eslint .` to lint.

## Editing content

Almost everything lives in two files. You don't need to touch the page code to update content.

| File | What's in it |
| --- | --- |
| `lib/church.ts` | Name, address, phone, email, social links, live-stream/Zoom links, **service times**, navigation, ministries, beliefs, pastors & leaders, giving methods, FAQs |
| `lib/content.ts` | Events, testimonies, verses of the day, gallery photos, blog posts |

**Sermons are automatic.** They're read from the church's YouTube channel feed (`church.youtubeChannelId`) and refreshed every hour, so new services appear on the site with no editing. During service times the Watch Live page plays the channel's live stream directly. See `lib/youtube.ts`.

Images go in `public/`. When you add one, also add its pixel size to `lib/imageSizes.ts`.

The countdown, the "LIVE NOW" banner and the Watch Live page all work automatically from `services` in `lib/church.ts`, in Central time. Events drop off the site on their own once they've passed.

### Before launch: replace the placeholders

Anything marked `PLACEHOLDER` in the two data files is sample content:

- [ ] Pastor bios and photos (`leadPastors`), and minister names (`leadershipTeam`)
- [ ] Ministry meeting times and highlights (`ministries`, `ministryDetails`)
- [x] Giving details: Givelify, Zelle and checks (`givingMethods`)
- [ ] The Wednesday Zoom link (`church.zoomUrl`)
- [ ] Events, testimonies and blog posts (`lib/content.ts`)
- [ ] The church history on the About page (`app/about/page.tsx`)

### Forms

The contact, prayer, counselling, plan-a-visit, ministry and newsletter forms are **front-end only**. They validate and show a thank-you message, but don't send anything yet. To connect them, pass an `onSubmit` handler to `components/forms/FormShell.tsx` that posts to an API route or a form service.

## Deployment

- Set `NEXT_PUBLIC_SITE_URL` if the site won't live at `https://www.rccgahn.org`. Canonical URLs, the sitemap and social share links all use it.
- The site uses Next.js image optimisation, so host it on a platform that runs Next.js (such as Vercel, Netlify or a Node server), not as a static export.
- The site provides `/sitemap.xml`, `/robots.txt`, a web-app manifest, a generated social share image, and schema.org `Church` and `Event` data for search engines.
