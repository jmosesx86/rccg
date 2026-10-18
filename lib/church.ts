/**
 * Single source of truth for church information.
 *
 * Anything marked `PLACEHOLDER` is sample content — replace it with the
 * real details when available. Everything else was taken from rccgahn.org.
 */

export const church = {
  name: "RCCG Agape House",
  shortName: "Agape House",
  fullName: "The Redeemed Christian Church of God — Agape House, Nashville",
  tagline: "Preparing People… Fulfilling Purpose",
  mission:
    "To prepare people for the Lord, to encourage people to love and know Jesus Christ while they grow in their relationship with the Father through Him.",
  description:
    "A full gospel Pentecostal church — Bible-believing, Christ-centered and Holy Spirit-filled — dedicated to ministering to people of all ages and backgrounds.",
  pastors: "Pastor Ben & Pastor Toro Adewuyi",
  /** Public site address — override with NEXT_PUBLIC_SITE_URL when deploying elsewhere. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rccgahn.org",
  timezone: "America/Chicago",

  address: {
    line1: "2128 Murfreesboro Pike",
    city: "Nashville",
    state: "TN",
    zip: "37217",
    full: "2128 Murfreesboro Pike, Nashville, TN 37217",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2128+Murfreesboro+Pike+Nashville+TN+37217",
    embedUrl:
      "https://www.google.com/maps?q=2128+Murfreesboro+Pike,+Nashville,+TN+37217&output=embed",
  },

  phone: { display: "(615) 833-6135", href: "tel:+16158336135" },
  email: "rccgagapehouse01@yahoo.com",
  testimonyEmail: "rccgagapehouse01@yahoo.com",

  social: {
    facebook: "https://www.facebook.com/rccgagapehousenashville",
    instagram: "https://www.instagram.com/rccg_ahn",
    youtube: "https://www.youtube.com/@rccgagapehousenashville4630",
    tiktok: "https://www.tiktok.com/@rccg_ahn",
  },

  /** YouTube channel id — powers the live player and the automatic sermon list. */
  youtubeChannelId: "UCSUU-cVJrxOtjznbmvEw-QQ",
  /** Always opens whatever the channel is currently streaming. */
  liveStreamUrl: "https://www.youtube.com/@rccgagapehousenashville4630/live",
  /** Wednesday midweek Zoom service. PLACEHOLDER — kept off the page until provided. */
  zoomUrl: "",
} as const;

export type Service = {
  name: string;
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  /** 24h local time in church timezone */
  hour: number;
  minute: number;
  durationMinutes: number;
  location: "In person" | "Online (Zoom)" | "In person & online";
  /** Recurs only on this week-of-month (1 = first). Omit for weekly. */
  weekOfMonth?: number;
  note?: string;
};

export const services: Service[] = [
  {
    name: "Sunday Worship Service",
    day: 0,
    hour: 10,
    minute: 0,
    durationMinutes: 150,
    location: "In person & online",
    note: "Church auditorium",
  },
  {
    name: "Midweek Service",
    day: 3,
    hour: 19,
    minute: 0,
    durationMinutes: 90,
    location: "Online (Zoom)",
    note: "Bible study & prayer",
  },
];

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about", description: "Our story, mission & beliefs" },
      { label: "Our Pastors", href: "/pastors", description: "Meet our leadership" },
      { label: "Plan a Visit", href: "/visit", description: "What to expect on Sunday" },
      { label: "Gallery", href: "/gallery", description: "Moments from our church family" },
    ],
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Men's Ministry", href: "/ministries/men" },
      { label: "Women's Ministry", href: "/ministries/women" },
      { label: "Youth Ministry", href: "/ministries/youth" },
      { label: "Children's Ministry", href: "/ministries/children" },
    ],
  },
  {
    label: "Media",
    href: "/sermons",
    children: [
      { label: "Sermons", href: "/sermons", description: "Messages on demand" },
      { label: "Agape TV — Live", href: "/live", description: "Join our services online" },
      { label: "Blog", href: "/blog", description: "Stories & devotionals" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Connect",
    href: "/contact",
    children: [
      { label: "Contact Us", href: "/contact" },
      { label: "Prayer Request", href: "/prayer" },
      { label: "Counselling", href: "/counselling" },
    ],
  },
];

export type Ministry = {
  slug: string;
  name: string;
  summary: string;
  image: string;
  meets: string; // PLACEHOLDER schedules
};

export const ministries: Ministry[] = [
  {
    slug: "men",
    name: "Men's Ministry",
    summary:
      "Raising godly men who lead with integrity at home, at work and in the church through fellowship, prayer and the Word.",
    image: "/m04.jpg",
    meets: "Second Saturday of the month",
  },
  {
    slug: "women",
    name: "Women's Ministry",
    summary:
      "A sisterhood of faith where women are nurtured, equipped and released to fulfil God's purpose in every season of life.",
    image: "/g05.jpg",
    meets: "Third Saturday of the month",
  },
  {
    slug: "youth",
    name: "Youth Ministry",
    summary:
      "A vibrant community helping teens and young adults know Jesus, find their identity in Him and make a difference.",
    image: "/f01.jpg",
    meets: "Sundays after service",
  },
  {
    slug: "children",
    name: "Children's Ministry",
    summary:
      "Safe, fun and Bible-centered classes where children learn to love God and grow in faith every Sunday.",
    image: "/p02.jpg",
    meets: "Sundays during service",
  },
];

/** Statement of faith, summarised from the RCCG fundamental beliefs. */
export const beliefs = [
  { title: "The Holy Bible", text: "The Bible is the inspired, infallible Word of God and our final authority for faith and life." },
  { title: "The Trinity", text: "One God eternally existing in three persons: the Father, the Son and the Holy Spirit." },
  { title: "Salvation", text: "Salvation is by grace through faith in the finished work of Jesus Christ on the cross." },
  { title: "Holiness", text: "God calls every believer to a life of holiness, set apart for His glory." },
  { title: "Baptism of the Holy Spirit", text: "The baptism of the Holy Spirit empowers believers for service, with the evidence of speaking in tongues." },
  { title: "Divine Healing", text: "Healing and deliverance are provided for in the atonement and available to all who believe." },
  { title: "Water Baptism & Communion", text: "Ordinances commanded by Christ: baptism by immersion and the Lord's Supper." },
  { title: "The Return of Christ", text: "Jesus Christ will return personally and visibly to take His Church and reign forever." },
];

export type Leader = { name: string; role: string; image?: string; bio?: string };

/** PLACEHOLDER bios — replace with the pastors' own words. */
export const leadPastors: Leader[] = [
  {
    name: "Pastor Ben Adewuyi",
    role: "Pastor in Charge",
    image: "/pst01.jpg",
    bio: "Pastor Ben leads Agape House with a passion for preparing people for the Lord and helping every believer discover and fulfil God's purpose. His teaching is practical, Spirit-led and rooted deeply in the Word.",
  },
  {
    name: "Pastor Toro Adewuyi",
    role: "Co-Pastor",
    image: "/g05.jpg",
    bio: "Pastor Toro has a heart for families, women and children. She ministers with warmth and grace, leading prayer and pastoral care and championing a culture of love throughout the church.",
  },
];

/** PLACEHOLDER — ministry leaders and ministers. */
export const leadershipTeam: Leader[] = [
  { name: "Minister — Name TBC", role: "Men's Ministry Lead" },
  { name: "Minister — Name TBC", role: "Women's Ministry Lead" },
  { name: "Minister — Name TBC", role: "Youth Pastor" },
  { name: "Minister — Name TBC", role: "Children's Church Coordinator" },
  { name: "Minister — Name TBC", role: "Choir & Music Director" },
  { name: "Minister — Name TBC", role: "Head of Ushering & Hospitality" },
];

/** Other departments people can serve in. PLACEHOLDER descriptions. */
export const departments = [
  { name: "Choir & Music", text: "Leading the congregation into God's presence through praise and worship." },
  { name: "Ushering & Hospitality", text: "Welcoming every guest with a smile and making church feel like home." },
  { name: "Media & Technical", text: "Sound, cameras, live stream, slides and social media for Agape TV." },
  { name: "Prayer Team", text: "Interceding for the church, our city and every request we receive." },
  { name: "Sanctuary Keepers", text: "Preparing and caring for God's house so it's ready for worship." },
  { name: "Follow-up & Evangelism", text: "Reaching out to new guests and sharing the gospel in our community." },
];

/** Extra detail for each ministry page. PLACEHOLDER copy. */
export const ministryDetails: Record<string, { highlights: string[]; scripture: { text: string; ref: string } }> = {
  men: {
    highlights: ["Monthly men's fellowship breakfast", "Accountability & mentoring groups", "Marriage and fatherhood seminars", "Community service projects"],
    scripture: { text: "Watch ye, stand fast in the faith, quit you like men, be strong.", ref: "1 Corinthians 16:13" },
  },
  women: {
    highlights: ["Monthly women's prayer & fellowship", "Annual women's conference", "Mentoring for young women", "Care for new mothers and families"],
    scripture: { text: "Strength and honour are her clothing; and she shall rejoice in time to come.", ref: "Proverbs 31:25" },
  },
  youth: {
    highlights: ["Youth service and Bible study", "Worship nights and retreats", "Career and life-skills workshops", "Outreach and fun hangouts"],
    scripture: { text: "Let no man despise thy youth; but be thou an example of the believers.", ref: "1 Timothy 4:12" },
  },
  children: {
    highlights: ["Age-grouped Sunday School classes", "Safe, checked-in environment", "Bible memory and crafts", "Children's choir and drama"],
    scripture: { text: "Train up a child in the way he should go: and when he is old, he will not depart from it.", ref: "Proverbs 22:6" },
  },
};

/** PLACEHOLDER — replace with the church's real giving details. */
export type GivingMethod = {
  id: "givelify" | "zelle" | "check";
  title: string;
  text: string;
  /** Details shown in the card, one per line */
  lines: string[];
  /** Text placed on the clipboard by the Copy button */
  copy?: string;
  action?: { label: string; href: string };
};

export const givingMethods: GivingMethod[] = [
  {
    id: "givelify",
    title: "Givelify",
    text: "Give securely online, or download the Givelify app from the App Store or Google Play and search for RCCG Agape House.",
    lines: ["RCCG Agape House, Nashville TN"],
    action: {
      label: "Give with Givelify",
      href: "https://www.givelify.com/donate/rccg-agape-house-nashville-tn-2j7wy5Mzk5Mw==/donation/amount",
    },
  },
  {
    id: "zelle",
    title: "Zelle",
    text: "Send your gift from your banking app using our church Zelle number.",
    lines: ["615-668-5801"],
    copy: "615-668-5801",
  },
  {
    id: "check",
    title: "Check",
    text: "Make checks payable to the Redeemed Christian Church of God and mail or bring them to church.",
    lines: ["Redeemed Christian Church of God", "2128 Murfreesboro Pike", "Nashville, TN 37217"],
    copy: "Redeemed Christian Church of God, 2128 Murfreesboro Pike, Nashville, TN 37217",
  },
];

export const visitFaqs = [
  { q: "What time should I arrive?", a: "Service begins at 10:00 AM. Arriving 10–15 minutes early gives you time to park, find a seat and check the kids in." },
  { q: "What should I wear?", a: "Come as you are! You'll see everything from traditional attire to suits to jeans. What matters most is that you're here." },
  { q: "How long is the service?", a: "Sunday service typically runs about two hours and includes praise and worship, prayer, the Word and a time of fellowship." },
  { q: "Is there something for my kids?", a: "Yes. Children's Church runs during the service with safe, fun, Bible-based classes for different age groups." },
  { q: "Where do I park?", a: "Free parking is available on site at 2128 Murfreesboro Pike. Our ushers will be happy to help you find the entrance." },
  { q: "Can I watch online first?", a: "Absolutely. Sunday services stream on Agape TV and our midweek service meets on Zoom every Wednesday at 7 PM." },
];

export const giveFaqs = [
  { q: "Can I get a giving statement?", a: "Yes. Contact the church office and we'll be happy to provide a statement of your giving for your records." },
  { q: "Can I give towards a specific project?", a: "Please contact the church office before giving towards a specific project or fund, and we'll let you know how to designate your gift." },
  { q: "Who do I contact about giving?", a: `Email ${church.email} or call ${church.phone.display} and our finance team will be glad to help.` },
];
