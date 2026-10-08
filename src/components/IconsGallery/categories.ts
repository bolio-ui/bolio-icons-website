// Same grouping other icon sets use (Feather, Lucide, Phosphor): a browsable
// category per icon, so the gallery can filter instead of scrolling 280+ cells.
// Icons that match no rule fall into 'Interface'.
export const categories = [
  'Arrows',
  'Interface',
  'Status',
  'Media',
  'Communication',
  'Files',
  'Devices',
  'Development',
  'Editor',
  'Shapes',
  'Weather',
  'Maps',
  'Commerce',
  'People',
  'Security',
  'Brands'
] as const

export type Category = (typeof categories)[number]

const rules: [Category, RegExp][] = [
  [
    'Brands',
    /^(Chrome|Codepen|Codesandbox|Dribbble|Facebook|Figma|Framer|Github|Gitlab|Instagram|Linkedin|Pocket|Slack|Trello|Twitch|Twitter|Youtube)$/
  ],
  ['Arrows', /^(Arrow|Chevron|Corner|Move$)/],
  [
    'Status',
    /^(Alert|Check|HelpCircle|Info$|Loader|Plus|Minus|X$|XCircle|XOctagon|XSquare)/
  ],
  [
    'Media',
    /^(Play|Pause|Skip|Rewind|FastForward|StopCircle|Video(?!mail)|Film|Music|Headphones|Speaker|Volume(?!mail)|Camera|Image|Radio|Disc|Tv|Cast|Airplay|Aperture|Shuffle|Repeat|Mic)/
  ],
  [
    'Communication',
    /^(Mail|Message|Phone|Voicemail|Send|Inbox|AtSign|Rss|Bell)/
  ],
  [
    'Files',
    /^(File|Folder|Archive|Clipboard|Copy|Save|Paperclip|Book|Database|Package|Box$)/
  ],
  [
    'Devices',
    /^(Smartphone|Tablet|Monitor|Cpu|HardDrive|Server|Printer|Watch|Battery|Bluetooth|Wifi|Power)/
  ],
  ['Development', /^(Code|Terminal|Git|Command|Hash)/],
  [
    'Editor',
    /^(Align|Bold|Italic|Underline|Type|Edit|PenTool|Scissors|Crop|Columns|List|Filter|Divide|Percent)/
  ],
  [
    'Shapes',
    /^(Circle|Square|Triangle|Hexagon|Octagon|Star|Slash|Crosshair|Target)$/
  ],
  ['Weather', /^(Cloud|Sun|Moon|Wind|Umbrella|Thermometer|Droplet)/],
  ['Maps', /^(Map|Navigation|Compass|Globe|Anchor|Truck|Flag)/],
  [
    'Commerce',
    /^(Shopping|CreditCard|DollarSign|Gift|Tag|Award|Briefcase|BarChart|PieChart|Trending)/
  ],
  ['People', /^(User|Smile|Frown|Meh|Thumbs|Heart)/],
  ['Security', /^(Lock|Unlock|Key|Shield|Eye)/]
]

export const getCategory = (name: string): Category =>
  rules.find(([, pattern]) => pattern.test(name))?.[0] ?? 'Interface'

// "ArrowDownLeft" -> "arrow down left", so searches match any word
export const splitName = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase()
