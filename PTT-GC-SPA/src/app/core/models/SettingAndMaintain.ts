/**
 * General APIs Models
 */

export class DataDetailModel {
    id: number;
    attribute01: string;
    attribute02: string;
    attribute03: string;
    attribute04: string;
    attribute05: string;
    attribute06: string;
    attribute07: string;
    attribute08: string;
    attribute09: string;
    attribute10: string;
    attribute11: string;
    attribute12: string;
    attribute13: string;
    attribute14: string;
    attribute15: string;
    attribute16: string;
    attribute17: string;
    attribute18: string;
    attribute19: string;
    attribute20: string;
}

export class MaintainDataModel {
    id: number;
    dataType: string;
    displayName: string;
    attributeName01: string;
    attributeName02: string;
    attributeName03: string;
    attributeName04: string;
    attributeName05: string;
    attributeName06: string;
    attributeName07: string;
    attributeName08: string;
    attributeName09: string;
    attributeName10: string;
    attributeName11: string;
    attributeName12: string;
    attributeName13: string;
    attributeName14: string;
    attributeName15: string;
    attributeName16: string;
    attributeName17: string;
    attributeName18: string;
    attributeName19: string;
    attributeName20: string;
    dataDetail: DataDetailModel[];
}

export class PagedList {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    dataDetail: DataDetailModel[];
}

// export const mockData: MaintainDataModel[] = [{
//     id: 24,
//     DataType: "Currency",
//     DisplayName: "Currency",
//     AttributeName01: "Name",
//     AttributeName02: "Exchange Rate",
//     AttributeName03: "Unit(THB)",
//     AttributeName04: "Unit(ENG)",
//     DataDetail: [{
//         id: 1,
//         Attribute1: "USD",
//         Attribute2: "29",
//         Attribute3: "ล้านดอลล่าร์",
//         Attribute4: "Million Dollar"
//     }, {
//         id: 2,
//         Attribute1: "JPY",
//         Attribute2: "0.38",
//         Attribute3: "ล้านเยน",
//         Attribute4: "Million Yen"
//     }, {
//         id: 3,
//         Attribute1: "USD",
//         Attribute2: "29",
//         Attribute3: "ล้านดอลล่าร์",
//         Attribute4: "Million Dollar"
//     }, {
//         id: 4,
//         Attribute1: "GBP",
//         Attribute2: "40",
//         Attribute3: "ล้านปอนด์",
//         Attribute4: "Million Pound"
//     }, {
//         id: 5,
//         Attribute1: "rule",
//         Attribute2: "blot",
//         Attribute3: "boos",
//         Attribute4: "mash"
//     }, {
//         id: 6,
//         Attribute1: "plow",
//         Attribute2: "whir",
//         Attribute3: "main",
//         Attribute4: "revs"
//     }, {
//         id: 7,
//         Attribute1: "hart",
//         Attribute2: "clef",
//         Attribute3: "clog",
//         Attribute4: "doom"
//     }, {
//         id: 8,
//         Attribute1: "hits",
//         Attribute2: "frog",
//         Attribute3: "fuss",
//         Attribute4: "lust"
//     }, {
//         id: 9,
//         Attribute1: "huff",
//         Attribute2: "moor",
//         Attribute3: "drum",
//         Attribute4: "thru"
//     }, {
//         id: 10,
//         Attribute1: "news",
//         Attribute2: "soon",
//         Attribute3: "year",
//         Attribute4: "like"
//     }, {
//         id: 11,
//         Attribute1: "tags",
//         Attribute2: "blue",
//         Attribute3: "both",
//         Attribute4: "buzz"
//     }, {
//         id: 12,
//         Attribute1: "size",
//         Attribute2: "suck",
//         Attribute3: "saps",
//         Attribute4: "maid"
//     }, {
//         id: 13,
//         Attribute1: "jute",
//         Attribute2: "chin",
//         Attribute3: "kind",
//         Attribute4: "jail"
//     }, {
//         id: 14,
//         Attribute1: "leap",
//         Attribute2: "pail",
//         Attribute3: "need",
//         Attribute4: "much"
//     }]
// }, {
//     id: 25,
//     DataType: "Company",
//     DisplayName: "Company",
//     AttributeName01: "CompanyCode",
//     AttributeName02: "Company Full Name",
//     AttributeName03: "Company Short Name",
//     AttributeName04: null,
//     DataDetail: [{
//         id: 5,
//         Attribute1: "SCB",
//         Attribute2: "SCB",
//         Attribute3: null,
//         Attribute4: null
//     }, {
//         id: 6,
//         Attribute1: "AAB",
//         Attribute2: "AAB",
//         Attribute3: null,
//         Attribute4: null
//     }, {
//         id: 7,
//         Attribute1: "BNA",
//         Attribute2: "BNA",
//         Attribute3: null,
//         Attribute4: null
//     }, {
//         id: 8,
//         Attribute1: "CBA",
//         Attribute2: "CBA",
//         Attribute3: null,
//         Attribute4: null
//     }]
// },
// {
//     id: 1,
//     DataType: 'Wordify',
//     DisplayName: 'Wordify',
//     AttributeName01: 'Name',
//     AttributeName02: 'throughput',
//     AttributeName03: 'Gabtype',
//     AttributeName04: 'Attr04-ZNC-muse',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01-1',
//         Attribute2: 'SubAttr02-4',
//         Attribute3: 'SubAttr03-3',
//         Attribute4: 'SubAttr04-9'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01-5',
//         Attribute2: 'SubAttr02-4',
//         Attribute3: 'SubAttr03-9',
//         Attribute4: 'SubAttr04-2'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01-6',
//         Attribute2: 'SubAttr02-5',
//         Attribute3: 'SubAttr03-4',
//         Attribute4: 'SubAttr04-3'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01-3',
//         Attribute2: 'SubAttr02-8',
//         Attribute3: 'SubAttr03-4',
//         Attribute4: 'SubAttr04-0'
//     }]
// },
// {
//     id: 2, DataType: 'Browseblab',
//     DisplayName: 'Browseblab',
//     AttributeName01: 'Name',
//     AttributeName02: 'challenge',
//     AttributeName03: 'Ntags',
//     AttributeName04: 'Attr04-VFA-woof',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01-1',
//         Attribute2: 'SubAttr02-4',
//         Attribute3: 'SubAttr03 - 3',
//         Attribute4: 'SubAttr04 - 9'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01-5',
//         Attribute2: 'SubAttr02-4',
//         Attribute3: 'SubAttr03-9',
//         Attribute4: 'SubAttr04-2'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01-6',
//         Attribute2: 'SubAttr02-5',
//         Attribute3: 'SubAttr03-4',
//         Attribute4: 'SubAttr04-3'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01-3',
//         Attribute2: 'SubAttr02-8',
//         Attribute3: 'SubAttr03-4',
//         Attribute4: 'SubAttr04-0'
//     }]
// },
// {
//     id: 3,
//     DataType: 'Zoombeat',
//     DisplayName: 'Zoombeat',
//     AttributeName01: 'Name',
//     AttributeName02: 'support',
//     AttributeName03: 'JumpXS',
//     AttributeName04: 'Attr04-GHN-tons',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01-idea',
//         Attribute2: 'SubAttr02-keg',
//         Attribute3: 'SubAttr03-bea',
//         Attribute4: 'SubAttr04-envy'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01-tags',
//         Attribute2: 'SubAttr02-cram',
//         Attribute3: 'SubAttr03-ikon',
//         Attribute4: 'SubAttr04-ads'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01-PAs',
//         Attribute2: 'SubAttr02-cots',
//         Attribute3: 'SubAttr03-coup',
//         Attribute4: 'SubAttr04-cosy'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01-pity',
//         Attribute2: 'SubAttr02-menu',
//         Attribute3: 'SubAttr03-toot',
//         Attribute4: 'SubAttr04-ruts'
//     }]
// },
// {
//     id: 4,
//     DataType: 'Twinder',
//     DisplayName: 'Twinder',
//     AttributeName01: 'Name',
//     AttributeName02: 'attitude',
//     AttributeName03: 'Npath',
//     AttributeName04: null,
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01-amok',
//         Attribute2: 'SubAttr02-clog',
//         Attribute3: 'SubAttr03-jute',
//         Attribute4: null
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01-shod',
//         Attribute2: 'SubAttr02-mows',
//         Attribute3: 'SubAttr03-snob',
//         Attribute4: null
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01-glum',
//         Attribute2: 'SubAttr02-step',
//         Attribute3: 'SubAttr03-ogre',
//         Attribute4: null
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01-fret',
//         Attribute2: 'SubAttr02-zeta',
//         Attribute3: 'SubAttr03-wits',
//         Attribute4: null
//     }]
// },
// {
//     id: 5,
//     DataType: 'Yodoo',
//     DisplayName: 'Yodoo',
//     AttributeName01: 'Name',
//     AttributeName02: 'heuristic',
//     AttributeName03: 'Topicstorm',
//     AttributeName04: 'Attr04-OAB-bike',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01-cogs',
//         Attribute2: 'SubAttr02-beds',
//         Attribute3: 'SubAttr03-rues',
//         Attribute4: 'SubAttr04-drop'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01-port',
//         Attribute2: 'SubAttr02-bobs',
//         Attribute3: 'SubAttr03-bead',
//         Attribute4: 'SubAttr04-very'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01-foil',
//         Attribute2: 'SubAttr02-hoop',
//         Attribute3: 'SubAttr03-arts',
//         Attribute4: 'SubAttr04-robe'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - wees',
//         Attribute2: 'SubAttr02 - hops',
//         Attribute3: 'SubAttr03 - knit',
//         Attribute4: 'SubAttr04 - keel'
//     }]
// },
// {
//     id: 6,
//     DataType: 'Rhyloo',
//     DisplayName: 'Rhyloo',
//     AttributeName01: 'Name',
//     AttributeName02: 'approach',
//     AttributeName03: 'Buzzbean',
//     AttributeName04: 'Attr04-SOV-ball',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01-lead',
//         Attribute2: 'SubAttr02-toil',
//         Attribute3: 'SubAttr03-jaws',
//         Attribute4: 'SubAttr04-glue'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01-bask',
//         Attribute2: 'SubAttr02-cool',
//         Attribute3: 'SubAttr03-vows',
//         Attribute4: 'SubAttr04-jabs'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - seat',
//         Attribute2: 'SubAttr02 - pigs',
//         Attribute3: 'SubAttr03 - rugs',
//         Attribute4: 'SubAttr04 - woes'
//     }, {
//         id: 4,
//         Attribute1: ' SubAttr01 - raft',
//         Attribute2: 'SubAttr02 - heir',
//         Attribute3: 'SubAttr03 - dies',
//         Attribute4: 'SubAttr04 - soar'
//     }]
// },
// {
//     id: 7,
//     DataType: 'Twinte',
//     DisplayName: 'Twinte',
//     AttributeName01: 'Name',
//     AttributeName02: 'Focused',
//     AttributeName03: 'Minyx',
//     AttributeName04: 'Attr04 - GYL - cram',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - hays',
//         Attribute2: 'SubAttr02 - real',
//         Attribute3: 'SubAttr03 - duty',
//         Attribute4: 'SubAttr04 -with'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - imps',
//         Attribute2: 'SubAttr02 - pink',
//         Attribute3: 'SubAttr03 - bard',
//         Attribute4: 'SubAttr04 - cans'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - pulp',
//         Attribute2: 'SubAttr02 - cuff',
//         Attribute3: 'SubAttr03 - edgy',
//         Attribute4: 'SubAttr04 - kite'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - axle',
//         Attribute2: 'SubAttr02 - wild',
//         Attribute3: 'SubAttr03 - wart',
//         Attribute4: 'SubAttr04 - rope'
//     }]
// },
// {
//     id: 8,
//     DataType: 'Skivee',
//     DisplayName: 'Skivee',
//     AttributeName01: 'Name',
//     AttributeName02: 'middleware',
//     AttributeName03: 'Oloo',
//     AttributeName04: 'Attr04 - QWY - toed',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - full',
//         Attribute2: 'SubAttr02 - gyms',
//         Attribute3: 'SubAttr03 - teat',
//         Attribute4: 'SubAttr04 - year'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - text',
//         Attribute2: 'SubAttr02 - cult,',
//         Attribute3: 'SubAttr03 - res',
//         Attribute4: 'SubAttr04- pass'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - subs',
//         Attribute2: 'SubAttr02 - lath',
//         Attribute3: 'SubAttr03 - safe',
//         Attribute4: 'SubAttr04 - hale'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - verb',
//         Attribute2: 'SubAttr02 - moth',
//         Attribute3: 'SubAttr03 - slot',
//         Attribute4: 'SubAttr04 - mitt'
//     }]
// },
// {
//     id: 9,
//     DataType: 'Feedspan',
//     DisplayName: 'Feedspan',
//     AttributeName01: 'Name',
//     AttributeName02: 'composite',
//     AttributeName03: 'Kaymbo',
//     AttributeName04: 'Attr04 - GTF - dank',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - tool',
//         Attribute2: 'SubAttr02 - arcs',
//         Attribute3: 'SubAttr03 - wand',
//         Attribute4: 'SubAttr04 - mink'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - city',
//         Attribute2: 'SubAttr02 - walk',
//         Attribute3: 'SubAttr03 - boom',
//         Attribute4: 'SubAttr04 - oust'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - navy',
//         Attribute2: 'SubAttr02 - cash',
//         Attribute3: 'SubAttr03 - dike',
//         Attribute4: 'SubAttr04 - wiry'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - thru',
//         Attribute2: 'SubAttr02 - rots',
//         Attribute3: 'SubAttr03 - deck',
//         Attribute4: 'SubAttr04 - feel'
//     }]
// },
// {
//     id: 10,
//     DataType: 'Rhynyx',
//     DisplayName: 'Rhynyx',
//     AttributeName01: 'Name',
//     AttributeName02: 'local area network',
//     AttributeName03: 'Tanoodle',
//     AttributeName04: 'Attr04 - EVS - dung',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - lame',
//         Attribute2: 'SubAttr02 - high',
//         Attribute3: 'SubAttr03 - hunk',
//         Attribute4: 'SubAttr04 - born'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - sacs',
//         Attribute2: 'SubAttr02 - nine',
//         Attribute3: 'SubAttr03 - vote',
//         Attribute4: 'SubAttr04 - gulf'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - dunk',
//         Attribute2: 'SubAttr02 - walk',
//         Attribute3: 'SubAttr03 - glee',
//         Attribute4: 'SubAttr04 - join'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - aura',
//         Attribute2: 'SubAttr02 - text',
//         Attribute3: 'SubAttr03 - club',
//         Attribute4: 'SubAttr04 - plow'
//     }]
// },
// {
//     id: 11,
//     DataType: 'Jamia',
//     DisplayName: 'Jamia',
//     AttributeName01: 'Name',
//     AttributeName02: 'complexity',
//     AttributeName03: 'Dablist',
//     AttributeName04: 'Attr04 - AFC - hero',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - oaks',
//         Attribute2: 'SubAttr02 - pest',
//         Attribute3: 'SubAttr03 - sort',
//         Attribute4: null
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - rats',
//         Attribute2: 'SubAttr02 - roes',
//         Attribute3: null,
//         Attribute4: 'SubAttr04 - nine'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - weld',
//         Attribute2: 'SubAttr02 - fern',
//         Attribute3: 'SubAttr03 - very',
//         Attribute4: 'SubAttr04 - seek'
//     }, {
//         id: 4,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - gasp',
//         Attribute4: 'SubAttr04 - same'
//     }]
// },
// {
//     id: 12,
//     DataType: 'Dabtype',
//     DisplayName: 'Dabtype',
//     AttributeName01: 'Name',
//     AttributeName02: 'full - range',
//     AttributeName03: 'Twitterwire',
//     AttributeName04: 'Attr04 - WZY - glen',
//     DataDetail: [{
//         id: 1,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - real',
//         Attribute3: 'SubAttr03 - duty',
//         Attribute4: 'SubAttr04 -with'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - imps',
//         Attribute2: 'SubAttr02 - pink',
//         Attribute3: 'SubAttr03 - bard',
//         Attribute4: 'SubAttr04 - cans'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - pulp',
//         Attribute2: 'SubAttr02 - cuff',
//         Attribute3: null,
//         Attribute4: 'SubAttr04 - kite'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - axle',
//         Attribute2: 'SubAttr02 - wild',
//         Attribute3: null,
//         Attribute4: 'SubAttr04 - rope'
//     }]
// },
// {
//     id: 13,
//     DataType: 'Jabberstorm',
//     DisplayName: 'Jabberstorm',
//     AttributeName01: 'Name',
//     AttributeName02: 'analyzing',
//     AttributeName03: 'Devpulse',
//     AttributeName04: 'Attr04 - JSC - pest',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - tell',
//         Attribute2: 'SubAttr02 - take',
//         Attribute3: 'SubAttr03 - gist',
//         Attribute4: 'SubAttr04 - skew'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - jack',
//         Attribute2: 'SubAttr02 - sore',
//         Attribute3: 'SubAttr03 - kick',
//         Attribute4: 'SubAttr04 - ream'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - sash',
//         Attribute2: 'SubAttr02 - yank',
//         Attribute3: 'SubAttr03 - term',
//         Attribute4: null
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - dogs',
//         Attribute2: 'SubAttr02 - skin',
//         Attribute3: 'SubAttr03 - twin',
//         Attribute4: 'SubAttr04 - days'
//     }]
// },
// {
//     id: 14,
//     DataType: 'Gabvine',
//     DisplayName: 'Gabvine',
//     AttributeName01: 'Name',
//     AttributeName02: 'zero defect',
//     AttributeName03: 'Twinder',
//     AttributeName04: 'Attr04 - SLH - word',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'cash',
//         Attribute2: 'hugs',
//         Attribute3: 'coos',
//         Attribute4: 'July'
//     }, {
//         id: 2,
//         Attribute1: ' SubAttr01 - blew',
//         Attribute2: 'SubAttr02 - fish',
//         Attribute3: 'SubAttr03 - gave',
//         Attribute4: 'SubAttr04 - deep'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - mire',
//         Attribute2: 'SubAttr02 - wood',
//         Attribute3: 'SubAttr03 - sear',
//         Attribute4: 'SubAttr04 - rift'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - buff',
//         Attribute2: 'SubAttr02 - boas',
//         Attribute3: 'SubAttr03 - hens',
//         Attribute4: 'SubAttr04 - hymn'
//     }]
// },
// {
//     id: 15,
//     DataType: 'Yozio',
//     DisplayName: 'Yozio',
//     AttributeName01: 'Name',
//     AttributeName02: 'ability',
//     AttributeName03: 'Browsebug',
//     AttributeName04: null,
//     DataDetail: [{
//         id: 1,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - cure',
//         Attribute4: 'SubAttr04 - seam'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - toys',
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - tune',
//         Attribute4: 'SubAttr04 - best'
//     }, {
//         id: 3,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - easy',
//         Attribute3: 'SubAttr03 - lets',
//         Attribute4: null
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - slop',
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - plum',
//         Attribute4: 'SubAttr04 - gins'
//     }]
// },
// {
//     id: 16,
//     DataType: 'Buzzshare',
//     DisplayName: 'Buzzshare',
//     AttributeName01: 'Name',
//     AttributeName02: ' value - added',
//     AttributeName03: 'Yotz',
//     AttributeName04: 'Attr04 - AZV - tuft',
//     DataDetail: [{
//         id: 1,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - cure',
//         Attribute4: 'SubAttr04 - seam'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - toys',
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - tune',
//         Attribute4: 'SubAttr04 - best'
//     }, {
//         id: 3,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - easy',
//         Attribute3: 'SubAttr03 - lets',
//         Attribute4: null
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - slop',
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - plum',
//         Attribute4: 'SubAttr04 - gins'
//     }]
// },
// {
//     id: 17,
//     DataType: 'Youbridge',
//     DisplayName: 'Youbridge',
//     AttributeName01: 'Name',
//     AttributeName02: 'Cloned',
//     AttributeName03: 'Katz',
//     AttributeName04: 'Attr04 - SRA - weds',
//     DataDetail: [{
//         id: 1,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - cure',
//         Attribute4: 'SubAttr04 - seam'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - toys',
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - tune',
//         Attribute4: 'SubAttr04 - best'
//     }, {
//         id: 3,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - easy',
//         Attribute3: 'SubAttr03 - lets',
//         Attribute4: null
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - slop',
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - plum',
//         Attribute4: 'SubAttr04 - gins'
//     }]
// },
// {
//     id: 18,
//     DataType: 'Meevee',
//     DisplayName: 'Meevee',
//     AttributeName01: 'Name',
//     AttributeName02: 'policy',
//     AttributeName03: 'Zoozzy',
//     AttributeName04: 'Attr04 - GQC - muss',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - oxen',
//         Attribute2: 'SubAttr02 - band',
//         Attribute3: 'SubAttr03 - gent',
//         Attribute4: 'SubAttr04 - hems'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - walk',
//         Attribute2: null,
//         Attribute3: null,
//         Attribute4: null
//     }, {
//         id: 3,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - cage',
//         Attribute4: 'SubAttr04 - tape'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - coma',
//         Attribute2: 'SubAttr02 - dubs',
//         Attribute3: 'SubAttr03 - away',
//         Attribute4: 'SubAttr04 - ants'
//     }]
// },
// {
//     id: 19,
//     DataType: 'Miboo',
//     DisplayName: 'Miboo',
//     AttributeName01: 'Name',
//     AttributeName02: 'utilisation',
//     AttributeName03: 'Jabbersphere',
//     AttributeName04: 'Attr04 - SRD - when',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - arts',
//         Attribute2: 'SubAttr02 - yawn',
//         Attribute3: 'SubAttr03 - gild',
//         Attribute4: 'SubAttr04 - beef'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - gown',
//         Attribute2: 'SubAttr02 - time',
//         Attribute3: null,
//         Attribute4: 'SubAttr04 - Mays'
//     }, {
//         id: 3,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: null,
//         Attribute4: 'SubAttr04 - huge'
//     }, {
//         id: 4,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - woke',
//         Attribute3: 'SubAttr03 - tube',
//         Attribute4: 'SubAttr04 - sobs'
//     }]
// },
// {
//     id: 20,
//     DataType: 'Photolist',
//     DisplayName: 'Photolist',
//     AttributeName01: 'Name',
//     AttributeName02: '3rd generation',
//     AttributeName03: 'Twimbo',
//     AttributeName04: 'Attr04 - JNL - aged',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - gent',
//         Attribute2: 'SubAttr02 - fort',
//         Attribute3: 'SubAttr03 - tuck',
//         Attribute4: 'SubAttr04 - jack'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - stay',
//         Attribute2: 'SubAttr02 - flee',
//         Attribute3: 'SubAttr03 - crux',
//         Attribute4: 'SubAttr04 - dump'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - roes',
//         Attribute2: 'SubAttr02 - arc',
//         Attribute3: 'SubAttr03 - arcs',
//         Attribute4: 'SubAttr04 - curb'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - kilt',
//         Attribute2: null,
//         Attribute3: 'SubAttr03- pork',
//         Attribute4: 'SubAttr04 - bran'
//     }]
// },
// {
//     id: 21,
//     DataType: 'Tazz',
//     DisplayName: 'Tazz',
//     AttributeName01: 'Name',
//     AttributeName02: 'Persistent',
//     AttributeName03: 'Yozio',
//     AttributeName04: 'Attr04 - VHU - hops',
//     DataDetail: [{
//         id: 1,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - nits',
//         Attribute3: 'SubAttr03 - snip',
//         Attribute4: 'SubAttr04 - anew'
//     }, {
//         id: 2,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - hang',
//         Attribute3: null,
//         Attribute4: null
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - vile',
//         Attribute2: 'SubAttr02 - bite',
//         Attribute3: 'SubAttr03 - abet',
//         Attribute4: 'SubAttr04 - quit'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - gals',
//         Attribute2: 'SubAttr02 - hays',
//         Attribute3: null,
//         Attribute4: null
//     }]
// },
// {
//     id: 22,
//     DataType: 'Gevee',
//     DisplayName: 'Gevee',
//     AttributeName01: 'Name',
//     AttributeName02: 'methodology',
//     AttributeName03: 'Feedfish',
//     AttributeName04: 'Attr04 - ANZ - ahoy',
//     DataDetail: [{
//         id: 1,
//         Attribute1: null,
//         Attribute2: null,
//         Attribute3: 'SubAttr03 - than',
//         Attribute4: 'SubAttr04 - town'
//     }, {
//         id: 2,
//         Attribute1: null,
//         Attribute2: 'SubAttr02 - slug',
//         Attribute3: 'SubAttr03 - wove',
//         Attribute4: 'SubAttr04 - crop'
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - guns',
//         Attribute2: 'SubAttr02 - newt',
//         Attribute3: 'SubAttr03 - oxe',
//         Attribute4: 'SubAttr04 - hunt'
//     }, {
//         id: 4,
//         Attribute1: 'SubAttr01 - vans',
//         Attribute2: 'SubAttr02 - hoop',
//         Attribute3: 'SubAttr03 - oars',
//         Attribute4: 'SubAttr04 - wets'
//     }]
// },
// {
//     id: 23,
//     DataType: 'Flashpoint',
//     DisplayName: 'Flashpoint',
//     AttributeName01: 'Name',
//     AttributeName02: 'Robust',
//     AttributeName03: 'Katz',
//     AttributeName04: 'Attr04 - IDS - lute',
//     DataDetail: [{
//         id: 1,
//         Attribute1: 'SubAttr01 - fête',
//         Attribute2: 'SubAttr02 - bike',
//         Attribute3: 'SubAttr03 - swan',
//         Attribute4: 'SubAttr04 - ease'
//     }, {
//         id: 2,
//         Attribute1: 'SubAttr01 - deli',
//         Attribute2: 'SubAttr02 - lose',
//         Attribute3: null,
//         Attribute4: null
//     }, {
//         id: 3,
//         Attribute1: 'SubAttr01 - vase',
//         Attribute2: 'SubAttr02 - ends',
//         Attribute3: 'SubAttr03 - rods',
//         Attribute4: 'SubAttr04 - edgy'
//     }, {
//         id: 4,
//         Attribute1: 'ease',
//         Attribute2: null,
//         Attribute3: null,
//         Attribute4: null
//     }]
// }

// ]