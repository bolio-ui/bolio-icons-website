// Extra words each icon is found by, on top of its own name and category.
// One line per icon, "Name: word word". Icons not listed here are found by
// name and category only.
const source = `
Activity: pulse heartbeat health graph
Airplay: screen cast stream apple
AlertCircle: warning error attention danger
AlertOctagon: warning stop error danger
AlertTriangle: warning caution danger
AlignCenter: text paragraph middle
AlignJustify: text paragraph
AlignLeft: text paragraph
AlignRight: text paragraph
Anchor: harbor boat ship port
Aperture: camera lens photo shutter
Archive: box storage zip backup
AtSign: email mention at
Award: prize medal badge winner trophy
BarChart: graph analytics statistics
BarChart2: graph analytics statistics
Battery: power charge energy
BatteryCharging: power charging energy
Bell: notification alert alarm
BellOff: mute silent notification
Bluetooth: wireless connect
Bold: text font strong
Book: read library docs
BookOpen: read library docs
Bookmark: save favorite ribbon
Box: package cube 3d
Briefcase: work job business
Calendar: date schedule event day
Camera: photo picture
CameraOff: photo disable
Cast: screen stream chromecast
Check: done ok tick yes success
CheckCircle: done ok success yes
CheckSquare: done todo checkbox
ChevronDown: arrow expand dropdown
ChevronLeft: arrow back previous
ChevronRight: arrow next forward
ChevronUp: arrow collapse
Chrome: google browser
Circle: round dot shape
Clipboard: paste copy board
Clock: time watch hour
Cloud: weather storage
Code: programming developer html
Coffee: cup drink break
Columns: layout split table
Command: cmd key shortcut mac
Compass: navigate direction
Copy: duplicate clone
Cpu: processor chip hardware
CreditCard: payment bank money
Crop: cut resize image
Crosshair: target aim
Database: storage data sql
Delete: backspace remove erase
Disc: cd dvd record
DollarSign: money currency price
Download: save get
DownloadCloud: save get cloud
Droplet: water liquid drop
Edit: pencil write change
Edit2: pencil write change
Edit3: pencil write change
ExternalLink: open new tab outside
Eye: view show visible watch
EyeOff: hide invisible hidden
Facebook: social meta
FastForward: skip next media
Feather: light write quill
File: document page paper
FileMinus: document remove
FilePlus: document add new
FileText: document page paper
Film: movie video cinema
Filter: funnel sort refine
Flag: report mark country
Folder: directory files
FolderMinus: directory remove
FolderPlus: directory add new
Gift: present birthday
GitBranch: version control fork
GitCommit: version control
GitMerge: version control join
GitPullRequest: version control review
Github: code repository social
Gitlab: code repository social
Globe: world internet web planet language
Grid: layout table cells
HardDrive: disk storage
Hash: number hashtag pound
Headphones: music audio listen
Heart: love like favorite
HelpCircle: question support faq
Hexagon: shape
Home: house main start
Image: picture photo gallery
Inbox: mail messages tray
Info: information about details
Instagram: social photo
Italic: text font emphasis
Key: password access
Layers: stack levels
Layout: grid design template
LifeBuoy: help support rescue
Link: chain url hyperlink
Link2: chain url hyperlink
Linkedin: social professional
List: bullets items todo menu
Loader: loading spinner wait progress
Lock: secure private password
LogIn: sign enter account
LogOut: sign exit leave account
Mail: email envelope message letter
Map: location geography
MapPin: location place marker
Maximize: fullscreen expand
Maximize2: fullscreen expand
Meh: neutral face emoji
Menu: hamburger navigation bars
MessageCircle: chat comment bubble
MessageSquare: chat comment bubble
Mic: microphone record voice audio
MicOff: microphone mute
Minimize: shrink exit fullscreen
Minimize2: shrink exit fullscreen
Minus: remove subtract less
MinusCircle: remove subtract
MinusSquare: remove subtract
Monitor: screen desktop display computer
Moon: night dark theme
MoreHorizontal: dots menu options ellipsis
MoreVertical: dots menu options ellipsis
MousePointer: cursor click select
Move: drag pan arrows
Music: audio song note
Navigation: gps direction location
Navigation2: gps direction location
Octagon: shape stop
Package: box delivery parcel
Paperclip: attachment attach
Pause: media stop wait
PenTool: draw vector design pen
Percent: discount sale
Phone: call telephone
PhoneCall: telephone ringing
Play: media start video
PlayCircle: media start video
Plus: add new more
PlusCircle: add new
PlusSquare: add new
Pocket: save read later
Power: on off shutdown
Printer: print paper
Radio: broadcast signal
RefreshCcw: reload sync update
RefreshCw: reload sync update
Repeat: loop cycle
Rewind: media back
RotateCcw: undo turn
RotateCw: redo turn
Rss: feed subscribe
Save: floppy disk store
Scissors: cut
Search: find magnify lookup zoom
Send: paper plane message submit
Server: hosting backend
Settings: gear cog preferences config options
Share: social send export
Share2: social send network
Shield: security protect safe
ShieldOff: security unprotected
ShoppingBag: store buy purchase
ShoppingCart: store buy purchase basket checkout
Shuffle: random mix
Sidebar: layout panel
Slack: chat team
Slash: forbidden ban
Sliders: settings controls equalizer adjust
Smartphone: mobile phone device
Smile: happy face emoji
Speaker: audio sound
Square: shape box
Star: favorite rating bookmark
Sun: light day theme bright
Sunrise: morning dawn
Sunset: evening dusk
Table: grid spreadsheet data
Tablet: ipad device
Tag: label price
Target: goal aim
Terminal: console command line shell
Thermometer: temperature weather
ThumbsDown: dislike bad vote
ThumbsUp: like good vote
ToggleLeft: switch off
ToggleRight: switch on
Tool: wrench settings fix repair
Trash: delete bin remove garbage
Trash2: delete bin remove garbage
Trello: board kanban
TrendingDown: decrease loss graph
TrendingUp: increase growth graph
Triangle: shape
Truck: delivery shipping transport
Tv: television screen
Twitch: stream gaming
Twitter: social bird tweet x
Type: text font typography
Umbrella: rain weather protection
Underline: text font
Unlock: open access
Upload: send put
UploadCloud: send put cloud
User: person profile account avatar
UserCheck: person verified account
UserMinus: person remove account
UserPlus: person add account new
UserX: person block account
Users: people group team
Video: camera movie film
VideoOff: camera disable
Voicemail: message audio
Volume: speaker sound
Volume1: speaker sound low
Volume2: speaker sound high
VolumeX: speaker mute silent
Watch: time clock wearable
Wifi: wireless internet signal network
WifiOff: wireless offline
Wind: air weather breeze
X: close cancel remove delete
XCircle: close cancel error
XOctagon: close stop error
XSquare: close cancel
Youtube: video social play
Zap: lightning bolt power fast energy
ZapOff: lightning disable
ZoomIn: magnify enlarge
ZoomOut: magnify shrink
`

export const keywords: Record<string, string> = Object.fromEntries(
  source
    .trim()
    .split('\n')
    .map((line) => {
      const [name, words] = line.split(': ')
      return [name, words]
    })
)
