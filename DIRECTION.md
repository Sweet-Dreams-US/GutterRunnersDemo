# DIRECTION, Gutter Runners

Cole's creative direction for this rebuild. It outranks everything in this folder except Zachary's own words.

## Start here: why this is a rebuild

The current demo is a Next.js app that says "Sweet Dreams demo" and "Open Estimate Desk" on the public page, numbers its services 01, 02, 03, and prints Zachary's personal Yahoo email and a street address from a listing. None of that can stay. It also gives him nowhere to show his work, which is half of what he asked for.

Remove the Next.js app (`app/`, `public/`, `package.json`, `package-lock.json`, the Next, ESLint, PostCSS and TypeScript config files, `next-env.d.ts`) and `CLAUDE.md` with `git rm`, keep the history, and build a static site from nothing. The Vercel project and URL stay the same.

## What this business is

**Gutter Runners**, Fort Wayne, Indiana and surrounding areas. Owner Zachary Hughes. Locally owned and operated, not a franchise.

**Services, in this order:** seamless metal gutters, gutter installation, gutter repair.

**Facts from his public listing, usable:** free estimates, accepts credit cards, locally owned and operated, serves Fort Wayne and surrounding areas.

**What he wants the site to do,** in his words: "Take in leads and give a space for potential customers to see our work." So the site has two jobs: the estimate request, and a work gallery he fills himself from the admin.

Do not print: his phone number, his email, any street address, his last name, hours, prices, years in business, license or insurance, warranties, reviews, gutter guards, cleaning, or any service not on the list above. The number and email on his form are his personal ones; they stay out of the site and out of the admin until he gives a public one.

## The look

**Archetype: one seamless run.** The page is built along a single continuous gutter. It starts as a flat coil of metal in the hero and forms into a gutter as the visitor scrolls, runs across the page carrying each section, turns down into a downspout, and the downspout empties into the estimate form at the bottom. One piece from top to bottom, no joints, because seamless is what he sells.

**Fonts.**
- Display: **Big Shoulders Display**, 800 and 900. Headlines and the service names.
- Body and interface: **Schibsted Grotesk**, 400, 500, 700. Body 18 px desktop, 16 px phone.

**Palette.**
- Rain wash `#F3F5F6`: main ground.
- Storm slate `#26323D`: text and the dark sections.
- Copper `#B8733A`: the one accent. Buttons, links, focus rings, the formed gutter's edge highlight.
- Aluminum `#C9CED3`: the gutter itself and its cross sections.
- Galvanized `#9AA3AB`: rules, borders, quiet text on slate.
- Rain blue `#5D8FB8`: water only. Never text, never a button.

**Signature interaction: the forming.** In a pinned section right after the hero, a flat strip of aluminum feeds in from the left and bends, fold by fold, into a K style gutter profile as the visitor scrolls: flat, first bend, second bend, the curved face, the lip. Draw it in SVG from one path that morphs between five states, with a brushed metal fill from the Higgsfield texture. When the profile is complete, the one line beside it reads "Seamless metal gutters. One continuous run, with no seams along its length." On a phone the same forming plays once when the section enters view, not pinned.

**Seam treatment: the K profile.** Sections meet along an edge cut in the silhouette of a K style gutter face, the ogee curve, in aluminum on the lighter side. Same edge at every seam.

## Higgsfield assets for this build

1. **Hero loop.** `gpt_image_2_5` still, 16:9: "Heavy rain sheeting down dark slate grey roof shingles toward the roof edge, close macro, water beads and streams, overcast light, storm slate #26323D and rain blue #5D8FB8 tones, no gutter, no house, no people, no text." Then `seedance_2_0 --start-image`: rain runs down the shingles, 6 seconds. It shows the problem, never the work.
2. **Brushed aluminum texture**, seamless, `#C9CED3`, fine horizontal brushing, for the forming strip and the gutter run.
3. **Copper texture**, seamless, `#B8733A`, light patina at the edges, for buttons' hover state and the accent rule.
4. **K profile technical drawing**, storm slate line on transparent, a cross section of a K style gutter with dimension ticks and no numbers, no letters. Section art for the services.
5. **Rain ground**, seamless, faint diagonal rain streaks on rain wash, very low contrast, for the estimate section.
6. **Service icons**, one hand, storm slate line with a copper detail, transparent: a long seamless gutter run (seamless), a gutter hanger bracket and a drill (installation), a sealant gun at a joint (repair), a downspout elbow (the estimate band).
7. **Storm cloud**, soft illustrated, slate and rain blue, transparent, section art beside the hero headline on wide screens.
8. **K profile edge strips**, transparent, one per ground colour.

Never generate a gutter on a house, a finished job, a crew, a truck, a ladder with a person, or a before and after.

## The logo

There is no logo. Set "GUTTER RUNNERS" in Big Shoulders Display 900 in the nav, with a thin copper rule under it the length of the word. Do not generate a mark.

## Sections

1. **Hero.** Storm slate ground with the rain loop. "Seamless metal gutters in Fort Wayne." in Big Shoulders Display. Under it: "Gutter installation and repair for Fort Wayne and surrounding areas. Free estimates." One copper button: "Get a free estimate", which opens the modal. Fits one screen.
2. **The forming.** Rain wash. The pinned forming described in "The look".
3. **What we do.** Rain wash, the formed gutter now running the full width of the section with the three services hanging from it on hangers, each with its icon, its name, one plain line, and "Get an estimate for this". Seamless metal gutters first, then installation, then repair. Not a row of three cards: they hang from one run at different heights.
4. **Our work.** Storm slate. Only when the admin has job photos, a gallery appears here, and a before and after slider for each matched pair. With none, the section is not on the page and the run carries straight on to the next section.
5. **The downspout.** The run turns down the right edge of the page as a downspout with water moving in it, and empties into the estimate section.
6. **Estimate.** Rain ground. "Tell us about the job." and the estimate form inline, the same steps as the modal. Beside it: "Free estimates. Locally owned and operated. We accept credit cards."
7. **Footer.** Storm slate. Name, "Fort Wayne and surrounding areas", the three services, "Get a free estimate". A phone and email show here and in the nav only once the admin has public ones.

## The estimate modal

One modal, stepped.
1. "What do you need?" Seamless metal gutters, installation, repair, as three large choices with icons. More than one allowed.
2. "Where is the property?" Street address and town. "What is going on?" a short description, optional.
3. "Add a photo," optional, one or two images from the phone, resized in the browser to under 300 KB each before saving.
4. Name, then phone or email. The button reads "Send my estimate request".

## The admin for this build

Everything in "The admin link" house rule, plus:
- **Estimate requests** in the inquiry inbox, showing services, address, description and photos. Status: New, Contacted, Estimate sent, Won, Lost.
- **Job photos.** Add, reorder, caption, tag by service. The "Our work" section appears when the first one is added.
- **Before and after pairs.** Upload a pair taken from the same spot at the same angle. The slider appears on the site only when a pair exists.
- **Services.** The three, editable, each with an optional starting price that shows only when filled.
- **Towns served.** A list, empty to start. When filled, it shows in the footer.
- **Public phone and email.** Empty to start. When filled, tap to call and email appear in the nav and footer.

It starts with the three services and nothing else. No example requests, no sample photos.

## Empty on purpose (build notes only, never on the page)

A public phone and email. Photos of his work and a logo, which Cole asked for on 9/10. Hours. Prices. The towns he covers. What makes people pick Gutter Runners. Whether he wants calls, texts or the form first. His answers to the five questions Cole sent on 9/10. A Facebook page at facebook.com/gutterrunnersusa turned up in search and is not confirmed as his; do not link it.

---

# House rules

Everything above is this build. Everything below applies to every Sweet Dreams demo. Both are required.

## Its own look, required on every build

Cole, 9/23: demos built in separate chats came out looking like the same site with a different name on it. Same type, same palette logic, same layout, same scroll moves. That is a failed build even when every other rule in this file is met.

1. **Use the fonts this direction names, exactly.** Self host them: download the woff2 files into `fonts/` and load them with `@font-face`. Do not swap a named face for something you like better.
2. **Banned faces on every build unless this direction names them:** Inter, Inter Tight, Roboto, Arial, Helvetica, Poppins, Montserrat, Lato, Open Sans, Nunito, Work Sans, DM Sans, DM Serif, DM Mono, Space Grotesk, Space Mono, Manrope, Figtree, Public Sans, Source Sans, Source Serif 4, Karla, Jost, Outfit, Syne, Oswald, Bebas Neue, Anton, Barlow in every width, Archivo in every width, IBM Plex in every style, JetBrains Mono, Fraunces, Playfair Display, Cormorant in every style, Bodoni Moda, Instrument Serif, Instrument Sans, Bricolage Grotesque, Marcellus, Italiana, Alfa Slab One, Caveat. These are the faces our last hundred demos leaned on. That is why they all look alike.
3. **Use the palette hexes named here, in the roles named here.** "A warm neutral plus one accent" is not a palette. It is the default that made every build look the same.
4. **Build the layout archetype this direction names.** The banned skeleton is: centred hero with a headline and two buttons, a row of three icon cards, an image and text split row, a testimonial carousel, a call to action band, a four column footer. If a section could be dropped into another business's site unchanged, it is not finished.
5. **Moves we have worn out.** Do not use any of these unless this direction asks for it by name: a thin line that draws itself down the page, underlines or marks that fill in as you scroll, 01 / 02 / 03 numbered eyebrow labels, a small uppercase mono label over every heading, a progress strip made of plain rectangles, film grain over the whole page, a scrolling marquee of service names, a giant pale wordmark behind the hero.
6. **Write `DESIGN-CARD.md` before you write any code.** Fonts, every hex with its role, the archetype in one sentence, the signature interaction, how the nav progress indicator works, and the list of Higgsfield assets you are about to make. Read it back against rules 2 and 5 and change anything that matches. Then build to the card.

## Higgsfield, required on every build

Higgsfield is a main tool on every build, not a texture tool. Any earlier line in this packet that limits Higgsfield to texture, or tells you to skip it, is overridden by this section.

**How.** The CLI is `higgsfield` (also `~/.local/node/bin/higgsfield`). Images: `higgsfield generate create gpt_image_2_5 --prompt "..." --aspect_ratio 16:9 --quality high --resolution 2k --wait`. Add `--background transparent` for cut out art. Add `--image-references ./path/file.png` to work from a real file. `nano_banana_pro` takes up to 14 image references and is the one to use when a set has to stay consistent. `flux_kontext` edits an existing image. `image_background_remover` and `bytedance_image_upscale` clean up the client's own photos. Video: `seedance_2_0`, `kling3_0`, `veo3_1`, with `--start-image` to animate a still you already made. `--wait` prints the result URL. Download it with curl into `assets/generated/`. Run `higgsfield model get <model>` if a flag is rejected.

**How much.** Every build makes at least the assets this direction lists, which is usually 6 to 12 images and 1 or 2 short loops. Record every file in `assets/generated/MANIFEST.md`: file name, model, the full prompt, and where it is used on the page. A build with an empty `assets/generated/` is not finished.

**What it is for.** Brand illustration, patterns, grounds, textures, section art, an icon set drawn in one hand, ambient loops of materials and objects for the hero, logo lockups made from the client's real logo file, and clean up, upscale and background removal of the client's own photos.

**What it never makes.** Anything a visitor would take for the client's own work, product, storefront, staff, customers or results. No invented product shots, no invented job photos, no before and after, no people presented as clients, no staff portraits. No other company's logo or trademark. No words: every word on the page is HTML text, never baked into a generated image. The one exception is a logo lockup made from the client's real logo file.

**Quality.** Every output is checked by eye before it goes on the page. Reject and regenerate anything off palette, anything with garbled lettering, extra fingers or melted edges, anything that looks like stock. Prompts name the palette hexes from this direction.

**Video.** Compress with ffmpeg to H.264 MP4 under 4 MB, `muted autoplay loop playsinline`, a poster frame from the first second, and a still in its place under `prefers-reduced-motion`. When a build has a generated loop, `/animated-website` is allowed to use it as its source video.

## The logo lives in the nav, required on every build

1. **The logo never goes in the hero or in the header section of the page.** No big logo centred at the top. The hero leads with the business's own words or its work.
2. **A horizontal version of the logo sits in the sticky nav**, on the left, 28 to 44 px tall on desktop and 24 to 32 px on a phone.
3. **If the real logo is square, round or a badge, it does not go in the nav as it is.** Make a horizontal lockup from the real file with Higgsfield: mark on the left, name on one line to the right, same drawing, same letterforms, same colours, transparent background. Use `gpt_image_2_5` or `nano_banana_pro` with the real logo file as the image reference. Also make a one colour version for dark grounds and a mark only version for the favicon and the phone nav.
4. **Check the lockup against the original, side by side.** If the drawing changed, a letter changed, or the spelling changed, reject it. After three failed tries, trace the mark to SVG (`potrace`) and set the name in the face closest to the original lettering.
5. **No logo file, no invented logo.** Set the name in the display face named in this direction and leave the mark to the client.
6. The full original logo may appear once, at a modest size, in the footer.

## Never tell the client what is missing, required on every build

Cole, 9/24: a demo that tells the owner what he did not send is rude, and we will not send one. Our own builds did it: "Left blank on purpose", "Photos pending" four times, "No job of theirs has been faked", "none has been given", "The list is empty, and that is not a mistake", "Nothing has been guessed".

1. **No copy on any public page about what we do not have.** Not "pending", not "coming soon" for his photos, not "not provided", not "left blank", not "until verified", not "placeholder", not "goes here", not "to be confirmed". No footer disclaimer about the demo. What we do not have is simply not on the page.
2. **No labelled empty slots on the public page.** A gallery, a team row, a reviews block or a photo grid only renders when the admin has something in it. With nothing in it, the section does not exist and the page still reads as finished. Design the page so it looks complete without them: type, Higgsfield art, texture, the owner's own words.
3. **Write to the owner's customer, in the owner's voice.** It is his site. "We" and "our" for the business, "you" for the customer. Never "they", "their listing", "the owner", "this business says".
4. **No commentary about the build.** Nothing that explains our rules, our sources or our honesty. Never "from their own listing", "no filler added", "nothing was guessed".
5. **Where it goes instead.** Everything missing and every question for the client goes in the build notes under "Empty on purpose", and nowhere a visitor can see. The admin can show plain empty states written to the owner ("Your photos show here once you add them"), because the admin is his tool.

## It opens on any phone, required on every build

One owner never saw his demo. He texted "Its blank" and sent a screenshot of an Android browser. The page has to open for a tradesman on an older Android phone tapping a link in a text.

1. **Every word is in the HTML.** The page reads top to bottom with JavaScript turned off. Scripts only add motion. Nothing is hidden until a script reveals it: set the "before" state of an animation from the script, never in the CSS.
2. **Light first load.** Under 1.5 MB before the visitor scrolls. Fonts subset, images WebP or AVIF at the size they are shown, video and heavy art lazy loaded.
3. **Check it the way he opens it.** Chrome device emulation at 360 px wide with an Android user agent and "Slow 4G", plus a plain private window, signed out of Vercel. The production URL, not a preview URL.
4. **No wall in front of the page.** No Vercel login, no password on the public page, no cookie gate, no age gate on a page that does not need one.

## The admin link, required on every build

Cole sends every demo as two links: the homepage and the admin. The admin is how the owner sees they could run this site without a programmer. It is part of the build, not an extra.

1. **Route, and no code.** The admin lives at `/admin` and opens straight away. It is a demo: no access code, no passcode, no login screen, no password field anywhere. The public site never links to the admin; Cole sends the link. Because the admin is open, it only ever holds the business's public contact details, never the owner's private phone or email.
2. **Where changes are saved.** In the browser, with `localStorage`, on that device only. No Supabase, no keys, no env file, no server. A one line notice sits at the top of the admin: "Demo mode. Changes are saved on this device until your site goes live." When the client signs, the same admin moves onto the shared FreeWebsites project.
3. **The public site reads the same store.** An edit in the admin shows on the public site in that browser. A form sent from the public site lands in the admin inbox in that browser. That round trip is the demo: fill in the form, open the admin, see it arrive.
4. **It starts with only what is real.** Every service, price, product, hour and event already on the public site is loaded into the admin. Nothing else. No example inquiries, no sample orders, no test rows marked "example", no demo customers. An empty list gets a designed empty state that says what will appear there.
5. **Every build gets these:**
   - **Inquiries.** Every form on the site lands here. Status: New, Contacted, Won or Booked, Closed. A notes field, a filter by status, a CSV export.
   - **Business info.** Phone, email, address, social links.
   - **Hours**, for any business with open hours. Weekly hours plus closure dates, driving a "Closed today" or "Open now" line on the site.
   - **Announcement bar.** On or off, text, optional link, start and end date.
   - **Photos.** Add, reorder, caption and hide the photos in each gallery on the site.
6. **Then by the kind of business,** as this direction names: services with prices, a menu with a sold out switch, products with variants and stock, collections, orders with status and tracking, events that each get their own simple landing page, drop and pre order management, locations, partners, FAQ, team.
7. **Stores and events get real pages.** Each product has its own product page, each collection its own collection page, each event its own simple landing page, all driven by the admin.
8. **Plain and fast.** Same fonts and colours as the site, but the admin is a working tool: clear lists, big tap targets, works at 390 px wide, one save button per screen that is always in reach.
9. **Health and clinical businesses** get the inquiry inbox with a name and a reason to call, and nothing clinical, same as the public form.

## House rules, all sites

1. No dashes anywhere in the copy. No em dash, no en dash, no double hyphen, no hyphen used as a pause. A hyphen inside a word is fine.
2. No metaphor. No wording written to make something sound special. Say what the thing is.
3. Branding has to feel real. More than one typeface, real emphasis, real animation, a drawn mark of our own. Bland default type is a failed build.

## Sticky nav and scroll progress, required on every build

1. The navigation is sticky. It stays on screen the whole way down the page.
2. Directly under the nav sits a scroll progress indicator running the full width of the viewport, tracking how far down the page the visitor is.
3. That indicator is branded to this business. Never a plain coloured bar, never a default accent stripe. It is built out of something that already belongs to this brand and it fills, draws or changes state as the page scrolls.
4. It has to read at a glance on a phone as well as on a desktop, and it respects prefers-reduced-motion by showing its state without animating between steps.

For this build: the indicator is a thin K profile gutter in aluminum across the full width under the nav, seen from the front. Rain blue water runs along inside it from left to right as the page scrolls, with a few drops falling from the leading edge. At the end of the page it reaches a small downspout at the right edge. On a phone the gutter is 10 px tall. Under reduced motion the water length updates without the drops.

## Before and after images, required on every build

If a build shows a before and after comparison, whether as a slider, a wipe or a pair, the two images must be the exact same photograph position. Same camera spot, same height, same lens, same framing, same crop, aligned to the pixel so nothing in the frame moves when the handle moves. The only thing that changes is the work.

Two different angles in a slider is a failed build. The visitor reads it as a trick, because it is one.

If the client has not sent a matched pair, the comparison does not get built and nothing on the page mentions it. The pair goes on the ask list in the build notes.

For this build: no comparison appears until the admin has a matched pair. The admin upload screen tells him both photos must be taken from the same spot at the same angle.

## Layout density, required on every build

Two real failures from our own builds drive this rule. One site put a whole form in the left third of the screen with the remaining two thirds empty black. Another put a giant pale wordmark in the middle of a white screen and dropped the only readable sentence into the bottom left corner at body size. Both read as unfinished.

**Height.** A section is as tall as its content needs and no taller. Default ceiling is 100vh. A section goes past that only when it actually holds more, a long list or a catalogue. Never pad a section to make room for an animation. Shorter is better every time.

**Width.** No column of content parked in the left third with the rest of the screen empty. Either centre the column, or build a real second column and use the width. If the viewport is wider than 1100px and the content occupies less than half of it, the layout has failed. A text column runs 45 to 75 characters.

**Type size.** Body copy is never under 17px on desktop or 16px on mobile. A pull line or a statement that carries a section is at least 28px and usually much larger. Nothing that matters sits small in a corner of a large empty field.

**Scroll sections where the text changes.** The text sits in the optical centre of the viewport, at a size that reads at a glance, on a field that is not mostly empty. One state is one viewport at most.

**Pinned stages.** Scroll length while pinned is at most 100vh per state and at most 300vh total.

**Mobile.** It has to fit cleanly, and that is checked, not assumed. No horizontal scroll at any width. 16px side gutters. Tap targets at least 44px. Type scales down but never below 16px for body. Check the page at 390px wide before calling it done.

## Section backgrounds and seams, required on every build

Branded backgrounds are wanted. A patterned or textured ground is one of the best things on a site. What kills it is two sections that do not meet cleanly. Our own Moody build put a flat black block on top of a purple splatter ground, so the splatter only showed as a ragged frame around the outside and the pattern was cut mid motif at the seam. That is the failure this rule exists to stop.

**No two touching sections share the same background.** If two sections in a row want the same ground, they are one section. Never three sections of the same value in a row anywhere on the page.

**A patterned ground owns its whole section.** Full bleed, edge to edge, top to bottom. It never appears only as a border, a frame or a margin around a flat block sitting on top of it.

**No flat panel floating on a patterned section.** Either the whole section is the pattern, or the whole section is flat.

**One seam treatment for the whole site.** Pick how two sections meet and use that same treatment at every seam.

**Cut a pattern at a full edge.** No accidental sliver of a third colour showing between two sections.

**Check the rhythm.** View the whole page at 25 percent zoom. The bands of ground should read as a deliberate alternation. If the page reads as blocks stacked at random, reorder the sections.

## Forms open in a modal, required on every build

Any contact, quote, estimate, request or lead form is opened by a button and appears in a modal over the page. It is not laid out inline down a section. The only exception is a dedicated contact page where the form is the whole point of the page.

**Steps.** More than four fields means the form is stepped, two or three fields at a time with a Next button. Ask the easy thing first and the personal thing last. Never open with name and phone.

**Progress and going back.** Show which step this is. Every step after the first has a Back button that keeps what was already typed.

**Required fields.** Only what is actually required. Phone or email, one of the two, never both forced.

**The button.** It says what happens, in his own words where we have them.

**Mechanics.** Native `<dialog>` with `showModal()`, or a div with `role="dialog"` and `aria-modal="true"`. Focus moves to the first field on open. Escape closes it. Focus is trapped inside while open. Focus returns to the opening button on close. Background scroll locked. Backdrop click closes.

**Mobile.** Below 700px the modal is a full screen sheet. 16px gutters, fields at least 44px tall, the Next button always reachable and never hidden behind the keyboard.

**It opens on a click and only on a click.** No modal on page load, no exit intent, no timer, no scroll trigger, no chat bubble that opens itself.

**One modal, reused.** Every button that needs the form opens the same modal.

**Still no database.** The form sends nothing to any server. It saves the entry in the browser so it shows up in the admin inbox, as "The admin link" section says, and nothing more.

## The database line, required on every build

A demo has no database. It is static. Every word, price, product, hour, review and photo on it is something the client gave us or something already on their live site. No seeded records, no placeholder rows, no example customers, no sample orders, no invented inventory, no fake reviews.

If a feature only makes sense with stored data and the client has not given us that data, it does not get built. It is left off the public page and named in the build notes under "Empty on purpose." The admin can hold it, with an empty state written to the owner.

The admin is the one place a demo saves anything, and only in the visitor's own browser, exactly as "The admin link" section says.

A demo never connects to the FreeWebsites Supabase project, never carries its keys, and never ships an env file pointing at it.

When a client signs, the site moves onto the shared FreeWebsites Supabase project and only then gets real tables, real rows and real writes.

For this build: nothing is sent to any server. Estimate requests and their photos are saved in the browser for the admin only, as the admin rule says.

