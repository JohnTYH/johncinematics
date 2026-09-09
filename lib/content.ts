/* ---------------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH FOR SITE CONTENT
   ---------------------------------------------------------------------------
   To swap placeholders for real photography:
     1. Drop files into /public/work/  (e.g. /public/work/atlas-01.jpg)
     2. Set `src` on the entry below to "/work/atlas-01.jpg"
     3. Delete the `tone` field — <Frame /> renders the image instead.
   Nothing else needs to change.
--------------------------------------------------------------------------- */

export type Ratio = "portrait" | "landscape" | "square" | "cinema";

export type WorkItem = {
  id: string;
  /** Couple, place, or shoot name. Falls back to `category` in the caption. */
  title?: string;
  category: string;
  /** Omit rather than guess — the caption drops it cleanly. */
  year?: string;
  ratio: Ratio;
  /** Placeholder gradient. Remove once `src` is set. */
  tone?: [string, string];
  /** Path under /public, or a remote URL allowed in next.config.mjs */
  src?: string;
};

export const ratioClass: Record<Ratio, string> = {
  portrait: "aspect-[2/3]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  cinema: "aspect-[21/9]",
};

/* ---------------------------------------------------------------------------
   Video
   ---------------------------------------------------------------------------
   Films are grouped inside their collection page, unlike photo collections
   which are one flat set. A group can be built and left hidden — the data is
   there, it just doesn't render until you flip `hidden`.
--------------------------------------------------------------------------- */

export type Video = {
  id: string;
  title?: string;
  /** Couple, client, or a one-line note shown under the title. */
  note?: string;
  /** The part of a YouTube URL after `v=`, or after `youtu.be/`. */
  videoId: string;
};

export type VideoGroup = {
  title: string;
  blurb?: string;
  /** Text for the jump link pointing at this group. Defaults to `title`. */
  jumpLabel?: string;
  /** 9:16 for reels, 16:9 for everything else. */
  orientation?: "landscape" | "vertical";
  /** Built for later — set false (or delete) to publish the group. */
  hidden?: boolean;
  videos: Video[];
};

/* A collection is one body of work. images[0] is the cover: it's what the
   home grid shows, and it leads the collection's own page. */
/**
 * The "what this involves" block on a collection page.
 *
 * Everything here is a fact from the rate card — hours, photo counts,
 * delivery windows, prices. That specificity is the point: it's what a
 * couple wants before enquiring, and it's the only kind of content search
 * and answer engines can quote back to someone asking what a wedding
 * photographer in Singapore costs.
 */
export type CollectionDetails = {
  intro: string;
  specs: { label: string; value: string }[];
};

/** A labelled subsection of photographs inside a collection page. */
export type PhotoGroup = {
  title: string;
  blurb?: string;
  /** Text for the jump link pointing at this group. Defaults to `title`. */
  jumpLabel?: string;
  images: WorkItem[];
};

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  images: WorkItem[];
  /**
   * What the page is called for search. The display heading stays short for
   * the design ("Weddings"), so the service and the location have to live
   * here and in the copy, or the page never states what it actually is.
   */
  seoTitle?: string;
  seoDescription?: string;
  details?: CollectionDetails;
  /** Present → the page renders grouped films instead of a photo grid. */
  videoGroups?: VideoGroup[];
  /** Present → the page renders the photographs in labelled subsections. */
  photoGroups?: PhotoGroup[];
};

export const collections: Collection[] = [
  {
    slug: "proposals",
    seoTitle: "Proposal Photographer in Singapore",
    seoDescription:
      "Surprise proposal photography in Singapore. Two hours of coverage, around 60 to 80 edited photos in a private gallery, delivered within 10 days.",
    name: "Proposals",
    blurb:
      "You'll be too overwhelmed in the moment to remember every detail — which is exactly why I'm there. The anticipation, the tears you didn't plan, and the smile you couldn't hold back.",
    details: {
      intro:
        "A proposal happens once and it happens quickly. Wherever in Singapore you have planned it, I get into position before you do — far enough back that nobody notices a photographer, close enough to catch the second she turns round. Two hours covers the setup, the proposal itself, and the phone calls to family straight afterwards.",
      specs: [
        { label: "Coverage", value: "2 hours" },
        { label: "Photos", value: "~60\u201380 edited" },
        { label: "Delivery", value: "Within 10 days" },
        { label: "From", value: "$320" },
      ],
    },
    images: [
      {
        id: "john-09442",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-09442.jpg",
      },
      {
        id: "john-05080",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-05080.jpg",
      },
      {
        id: "john-03987",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-03987.jpg",
      },
      {
        id: "john-00445",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-00445.jpg",
      },
      {
        id: "john-04015",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-04015.jpg",
      },
      {
        id: "john-04413",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-04413.jpg",
      },
      {
        id: "john-04310",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-04310.jpg",
      },
      {
        id: "john-00218",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-00218.jpg",
      },
      {
        id: "john-04392",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-04392.jpg",
      },
      {
        id: "john-09426-edited",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-09426_edited.jpg",
      },
      {
        id: "john-04518",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-04518.jpg",
      },
      {
        id: "john-09463",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-09463.jpg",
      },
      {
        id: "john-04979",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-04979.jpg",
      },
      {
        id: "john-09705",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-09705.jpg",
      },
      {
        id: "john-05016",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-05016.jpg",
      },
      {
        id: "john-09837",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-09837.jpg",
      },
      {
        id: "john-05074",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-05074.jpg",
      },
      {
        id: "john-09963-2",
        category: "Proposals",
        ratio: "landscape",
        src: "/work/proposals/John-09963-2.jpg",
      },
      {
        id: "john-05557",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-05557.jpg",
      },
      {
        id: "john-09220",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-09220.jpg",
      },
      {
        id: "john-09228",
        category: "Proposals",
        ratio: "portrait",
        src: "/work/proposals/John-09228.jpg",
      },
    ],
  },
  {
    slug: "weddings",
    seoTitle: "Wedding Photographer in Singapore",
    seoDescription:
      "Wedding and ROM photography in Singapore. Half day from $175/hr, full day from $170/hr, over 200 edited photos delivered within 21 days.",
    name: "Weddings",
    blurb:
      "The people who show up for you on your wedding day are what make it unforgettable. Every joyful tear, every proud smile, every candid moment between the people who have loved you all along — so when you look back, you're reliving their day too.",
    details: {
      intro:
        "I photograph weddings across Singapore, and most couples book a full day \u2014 six to eight hours, morning preparations through to the last speech. A half day suits a ROM, a solemnisation, or a smaller celebration. Every package includes a private online gallery, and the colour grade is done in-house.",
      specs: [
        { label: "Half day", value: "3\u20134 hours \u00b7 ~100\u2013150 photos \u00b7 14 days \u00b7 $175/hr" },
        { label: "Full day", value: "6\u20138 hours \u00b7 200+ photos \u00b7 21 days \u00b7 $170/hr" },
        { label: "ROM", value: "2 hours \u00b7 ~60\u201380 photos \u00b7 10 days \u00b7 $350" },
        { label: "Add-ons", value: "Hair and makeup $160/hr \u00b7 slideshow $100 \u00b7 magazine $250" },
      ],
    },
    images: [
      {
        id: "john-01344",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-01344.jpg",
      },
      {
        id: "john-00456",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-00456.jpg",
      },
      {
        id: "john-09234",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-09234.jpg",
      },
      {
        id: "john-07588",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-07588.jpg",
      },
      {
        id: "john-04669",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-04669.jpg",
      },
      {
        id: "john-01586",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-01586.jpg",
      },
      {
        id: "john-01740",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-01740.jpg",
      },
      {
        id: "john-01599",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-01599.jpg",
      },
      {
        id: "john-03019",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-03019.jpg",
      },
      {
        id: "john-01681",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-01681.jpg",
      },
      {
        id: "john-03291",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-03291.jpg",
      },
      {
        id: "john-01773",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-01773.jpg",
      },
      {
        id: "john-04559",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-04559.jpg",
      },
      {
        id: "john-04315",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-04315.jpg",
      },
      {
        id: "john-04605",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-04605.jpg",
      },
      {
        id: "john-00484",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-00484.jpg",
      },
      {
        id: "john-00460",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-00460.jpg",
      },
      {
        id: "john-08230",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-08230.jpg",
      },
      {
        id: "john-08695",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-08695.jpg",
      },
      {
        id: "john-08678",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-08678.jpg",
      },
      {
        id: "john-08966",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-08966.jpg",
      },
      {
        id: "john-09685",
        category: "Weddings",
        ratio: "landscape",
        src: "/work/weddings/John-09685.jpg",
      },
      {
        id: "john-09199",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-09199.jpg",
      },
      {
        id: "john-09345",
        category: "Weddings",
        ratio: "portrait",
        src: "/work/weddings/John-09345.jpg",
      },
    ],
  },
  {
    slug: "events",
    seoTitle: "Event Photographer in Singapore",
    seoDescription:
      "Corporate and private event photography in Singapore. Conferences, launches, company days, birthdays and private parties, quoted per booking.",
    name: "Events",
    blurb:
      "Corporate days and private celebrations \u2014 the handshakes, the speeches, the moments people are too busy hosting to notice.",
    details: {
      intro:
        "Corporate and private events across Singapore \u2014 conferences, launches, company days, birthdays and private parties. Events are quoted per booking rather than by package, because a two-hour product launch and a full-day conference are different jobs. Tell me the date, the venue and roughly how long you need someone there.",
      specs: [
        { label: "Coverage", value: "Quoted per event" },
        { label: "Delivery", value: "Private online gallery" },
        { label: "Works with", value: "Corporate and private clients" },
      ],
    },
    images: [
      {
        id: "events-cover",
        category: "Events",
        ratio: "landscape",
        src: "/work/events/corporate/John-08367.jpg",
      },
    ],
    photoGroups: [
      {
        title: "Corporate",
        blurb: "Conferences, launches and company days.",
        images: [
        {
          id: "john-00258-2",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-00258-2.jpg",
        },
        {
          id: "john-00713",
          category: "Corporate events",
          ratio: "portrait",
          src: "/work/events/corporate/John-00713.jpg",
        },
        {
          id: "john-06705",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-06705.jpg",
        },
        {
          id: "john-00695",
          category: "Corporate events",
          ratio: "portrait",
          src: "/work/events/corporate/John-00695.jpg",
        },
        {
          id: "john-06777",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-06777.jpg",
        },
        {
          id: "john",
          category: "Corporate events",
          ratio: "portrait",
          src: "/work/events/corporate/John-.jpg",
        },
        {
          id: "john-06808",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-06808.jpg",
        },
        {
          id: "john-01014",
          category: "Corporate events",
          ratio: "portrait",
          src: "/work/events/corporate/John-01014.jpg",
        },
        {
          id: "john-07135",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07135.jpg",
        },
        {
          id: "john-07179",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07179.jpg",
        },
        {
          id: "john-07191",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07191.jpg",
        },
        {
          id: "john-07202",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07202.jpg",
        },
        {
          id: "john-07554",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07554.jpg",
        },
        {
          id: "john-07677",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07677.jpg",
        },
        {
          id: "john-07789",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-07789.jpg",
        },
        {
          id: "john-08358",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-08358.jpg",
        },
        {
          id: "john-08394",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-08394.jpg",
        },
        {
          id: "john-08622",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-08622.jpg",
        },
        {
          id: "john-08645-2",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-08645-2.jpg",
        },
        {
          id: "john-09128",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John-09128.jpg",
        },
        {
          id: "john-dsc00097",
          category: "Corporate events",
          ratio: "landscape",
          src: "/work/events/corporate/John_DSC00097.jpg",
        },
        ],
      },
      {
        title: "Personal",
        jumpLabel: "Personal events",
        blurb: "Birthdays, family gatherings and private parties.",
        images: [
        {
          id: "john-00480",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-00480.jpg",
        },
        {
          id: "john-00591",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-00591.jpg",
        },
        {
          id: "john-01249",
          category: "Personal events",
          ratio: "portrait",
          src: "/work/events/personal/John-01249.jpg",
        },
        {
          id: "john-01922-2",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-01922-2.jpg",
        },
        {
          id: "john-02201",
          category: "Personal events",
          ratio: "portrait",
          src: "/work/events/personal/John-02201.jpg",
        },
        {
          id: "john-01922",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-01922.jpg",
        },
        {
          id: "john-02583",
          category: "Personal events",
          ratio: "portrait",
          src: "/work/events/personal/John-02583.jpg",
        },
        {
          id: "john-02094",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-02094.jpg",
        },
        {
          id: "john-06483",
          category: "Personal events",
          ratio: "portrait",
          src: "/work/events/personal/John-06483.jpg",
        },
        {
          id: "john-02177",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-02177.jpg",
        },
        {
          id: "john-03282",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-03282.jpg",
        },
        {
          id: "john-03534",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-03534.jpg",
        },
        {
          id: "john-07544",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-07544.jpg",
        },
        {
          id: "john-07559",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-07559.jpg",
        },
        {
          id: "john-07698",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-07698.jpg",
        },
        {
          id: "john-07880",
          category: "Personal events",
          ratio: "landscape",
          src: "/work/events/personal/John-07880.jpg",
        },
        ],
      },
    ],
  },
  {
    slug: "videography",
    seoTitle: "Wedding Videographer in Singapore",
    seoDescription:
      "Pre-wedding films and wedding videography in Singapore. Cinematic visuals and heartfelt interviews, filmed and graded in-house.",
    name: "Videography",
    blurb:
      "Your love story deserves more than a montage. Cinematic visuals and heartfelt interviews, cut into something your guests experience on the day and you keep long after it.",
    details: {
      intro:
        "Your love story deserves more than a montage. Pre-wedding films are built around the couple rather than a template \u2014 cinematic visuals and heartfelt interviews, cut into something your guests experience on the day and you keep long after it. Filming is quoted individually, so tell me what you have in mind.",
      specs: [
        { label: "Pre-wedding film", value: "Personalised quote" },
        { label: "Includes", value: "Concept, filming, edit and grade" },
        { label: "Also available", value: "Alongside photography on the day" },
      ],
    },
    images: [
      {
        id: "videography-cover",
        category: "Videography",
        ratio: "landscape",
        src: "/work/videography/John-07525.jpg",
      },
    ],
    videoGroups: [
      {
        title: "Pre-Wedding",
        blurb: "Concept films shot around the couple's own story.",
        videos: [
          {
            id: "jonathan-rachelle",
            title: "Jonathan & Rachelle",
            videoId: "pW6fLu5VAV4",
          },
        ],
      },
      {
        title: "Special Projects",
        blurb: "Campus films and commissioned work.",
        videos: [
          {
            id: "halls-of-nus",
            title: "Halls of NUS",
            note: "NUS Office of Student Affairs",
            videoId: "uA4wQ5DVha0",
          },
          {
            id: "nus-forever",
            title: "NUS Forever",
            note: "Student Life theme song",
            videoId: "8nIj_-Uo2YE",
          },
          {
            id: "jam-n-hop-2022",
            title: "Jam 'N' Hop 2022",
            note: "NUS Business Pageant",
            videoId: "6wzJuXKPvNw",
          },
          {
            id: "jam-n-hop-2023",
            title: "Jam 'N' Hop 2023",
            note: "NUS Business Pageant",
            videoId: "dQAhk1nciu0",
          },
          {
            id: "raffles-hall-open-day",
            title: "Raffles Hall Open Day 2022",
            note: "Raffles Hall Media",
            videoId: "PYTzJEJXa1E",
          },
        ],
      },
      {
        title: "Collaborations",
        blurb: "Work made with other creatives, brands and studios.",
        videos: [],
      },
      {
        // Built and ready — flip `hidden` to false when you have reels to show.
        title: "Reels",
        blurb: "Short vertical cuts.",
        orientation: "vertical",
        hidden: true,
        videos: [],
      },
    ],
  },
];

/** The frame beside the wordmark in the hero. */
export const heroImage: WorkItem = {
  id: "hero",
  title: "John Cinematics",
  category: "Hero",
  ratio: "portrait",
  src: "/work/main/John-01013.jpg",
};


/* ---------------------------------------------------------------------------
   FAQ
   ---------------------------------------------------------------------------
   Every answer here is a fact from the rate card. Answer engines quote
   specifics, not adjectives — "within 21 days" is citable in a way that
   "quick turnaround" never is. Rendered on /enquire and emitted as
   FAQPage structured data.

   Worth adding when you can, since people ask and I don't have your answers:
   how far ahead to book, deposit terms, travel outside Singapore, and what
   happens if the weather turns.
--------------------------------------------------------------------------- */
export const faqs = [
  {
    q: "How much does a wedding photographer cost in Singapore?",
    a: "My full day package is $170/hr for six to eight hours of coverage, and the half day is $175/hr for three to four. A ROM or proposal shoot is $350 for two hours. Every package includes editing and a private online gallery.",
  },
  {
    q: "How long until we get our photos?",
    a: "A ROM or proposal shoot is delivered within 10 days, a half day within 14, and a full day within 21. Everything arrives in a private online gallery.",
  },
  {
    q: "How many photos do we get?",
    a: "Around 60 to 80 edited photos from a two-hour ROM or proposal, 100 to 150 from a half day, and over 200 from a full day.",
  },
  {
    q: "What's included in a pre-wedding shoot?",
    a: "A personalised moodboard and two themes over three hours for $588, or three themes over five hours for $888. You get more than 80 colour-edited photos from the three-hour shoot and more than 120 from the five-hour, plus a private online gallery.",
  },
  {
    q: "Do you shoot video as well as photography?",
    a: "Yes. Pre-wedding films are quoted individually rather than packaged, because the concept drives the cost. They can be filmed alongside photography on the same day.",
  },
  {
    q: "Can you arrange hair and makeup?",
    a: "Yes, a makeup artist can be added at $160/hr. Other add-ons include a photo slideshow at $100, a 20-page display magazine at $250, and an early morning start at $50.",
  },
  {
    q: "Where are you based?",
    a: "Singapore. I have been shooting since 2018, picked up videography in 2019, and went full-time freelance in 2021 — working across weddings, corporate shoots, events and special projects with NUS.",
  },
  {
    q: "What is your style?",
    a: "Clean, sharp and natural, especially for weddings, with room for something more filmic when it suits the couple's story. Colour grading is done in-house.",
  },
];

/* ---------------------------------------------------------------------------
   WhatsApp — where the enquiry form sends people.
   Digits only: country code + number, no "+", spaces or dashes.
   Singapore example: 6591234567
   Leave it empty and the form refuses to submit rather than opening a
   broken link.
--------------------------------------------------------------------------- */
export const whatsappNumber = "";

/**
 * Collections with something actually in them. A collection whose only image
 * is its cover, and whose video groups are empty or hidden, would lead to a
 * blank page — so it stays off the home grid until it has content. Its route
 * still builds, so you can preview it at /work/<slug> while filling it in.
 */
export const publishedCollections = collections.filter(
  (c) =>
    c.images.length > 1 ||
    (c.photoGroups ?? []).some((g) => g.images.length > 0) ||
    (c.videoGroups ?? []).some((g) => !g.hidden && g.videos.length > 0),
);

/** Every image across every collection, cover-first. */
export const work: WorkItem[] = collections.flatMap((c) => c.images);

/* The portrait on /about. Same shape as a work item so it swaps the
   same way — set `src`, delete `tone`. */
export const portrait: WorkItem = {
  id: "portrait",
  title: "John",
  category: "Portrait",
  ratio: "portrait",
  src: "/work/about/IMG_8853.jpg",
};


/* Dates from the rate card: photography 2018, videography 2019,
   full-time freelance 2021. */
export const timeline = [
  { year: "2018", label: "Picked up a camera", note: "An interest that turned into a hobby." },
  { year: "2019", label: "Added motion", note: "Video became half the work." },
  { year: "2021", label: "Went freelance", note: "Made the leap to freelance." },
  { year: "Now", label: "Weddings & more", note: "Weddings, corporate, events and special projects." },
];


