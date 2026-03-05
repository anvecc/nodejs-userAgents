
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const compact = (arr) => arr.filter(Boolean);

// random spasi di sekitar ;
const sep = () => rand(['; ', ';']);

// android version 7-16, kadang ada minor
const androidVersion = () => {
    const major = randInt(7, 15); // 16 belum stable
    return Math.random() < 0.6 ? `${major}` : `${major}.0`;
};

// build number cocok android version
const buildNumber = (major) => {
    const map = {
        7: ['N2G48H', 'NMF26X', 'N6F26U'],
        8: ['OPR1.170623.032', 'OPM1.171019.026', 'OPD1.170816.025'],
        9: ['PPR1.180610.011', 'PQ3A.190801.002', 'PKQ1.190101.001'],
        10: ['QKQ1.200830.002', 'QP1A.190711.020', 'QD1A.190821.014'],
        11: ['RP1A.200720.012', 'RQ3A.210905.001', 'RKQ1.200826.002'],
        12: ['SP1A.210812.016', 'SKQ1.220303.001', 'SP2A.220305.013'],
        13: ['TP1A.220624.014', 'TQ3A.230901.001', 'TKQ1.220829.002'],
        14: ['UP1A.231005.007', 'UQ1A.240205.004', 'UP1A.240105.004'],
        15: ['AP1A.240405.002', 'AP2A.240905.003'],
        16: ['BP1A.240406.005', 'BP2A.241005.001'],
    };
    return rand(map[Math.min(Math.max(major, 7), 16)] || map[13]);
};

// chrome version + patch realistis, cocok android version
const chromeVersion = (major) => {
    const ranges = {
        7: [60, 80], 8: [70, 90], 9: [80, 98], 10: [90, 108], 11: [96, 112],
        12: [105, 116], 13: [110, 119], 14: [116, 121], 15: [120, 122], 16: [121, 122],
    };
    const [mn, mx] = ranges[Math.min(Math.max(major, 7), 16)];
    const v = randInt(mn, mx);
    const patches = { 60: 3112, 70: 3538, 80: 3987, 90: 4430, 96: 4664, 100: 4896, 105: 5195, 108: 5359, 110: 5481, 112: 5615, 114: 5735, 116: 5845, 118: 5993, 119: 6045, 120: 6099, 121: 6167, 122: 6261 };
    const base = patches[v] || (v * 50);
    const patch = base + randInt(1, 180);
    const sub = randInt(10, 200);
    const r = Math.random();
    const str = r < 0.3 ? `${v}.0.${patch}.${sub}` : r < 0.6 ? `${v}.0.${patch}` : `${v}.0`;
    return { major: v, str };
};

// firefox version cocok android
const firefoxVersion = () => {
    // Firefox auto-update, minimum 120 di 2025
    return `${randInt(120, 136)}.0`;
};

// samsung browser version cocok android
const samsungBrowserVersion = (major) => {
    const ranges = { 7: [8, 12], 8: [10, 14], 9: [12, 16], 10: [14, 18], 11: [16, 20], 12: [18, 22], 13: [20, 23], 14: [22, 24], 15: [23, 24], 16: [24, 24] };
    const [mn, mx] = ranges[Math.min(Math.max(major, 7), 16)];
    return `${randInt(mn, mx)}.0.${randInt(1, 9)}.${randInt(1, 9)}`;
};

// locale cocok brand
const localeForBrand = (brand) => {
    const map = {
        samsung: ['ko-KR', 'en-US', 'id-ID', 'en-GB', 'de-DE', 'fr-FR', 'th-TH'],
        xiaomi: ['zh-CN', 'id-ID', 'hi-IN', 'en-IN', 'ms-MY', 'ru-RU'],
        oppo: ['id-ID', 'en-IN', 'ms-MY', 'th-TH', 'vi-VN', 'zh-TW'],
        vivo: ['id-ID', 'hi-IN', 'en-IN', 'ms-MY', 'th-TH', 'vi-VN'],
        realme: ['id-ID', 'hi-IN', 'en-IN', 'ms-MY', 'th-TH'],
        pixel: ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'ja-JP'],
        oneplus: ['en-IN', 'en-GB', 'en-US', 'de-DE'],
        motorola: ['en-US', 'pt-BR', 'es-MX', 'en-GB'],
        huawei: ['zh-CN', 'en-GB', 'de-DE', 'fr-FR', 'ru-RU'],
        default: ['en-US', 'id-ID', 'en-GB', 'de-DE', 'fr-FR'],
    };
    return rand(map[brand] || map.default);
};

const detectBrand = (device) => {
    const d = device.toLowerCase();
    if (d.includes('samsung') || d.includes('sm-')) return 'samsung';
    if (d.includes('xiaomi') || d.includes('redmi') || d.includes('poco') || d.includes('mi ')) return 'xiaomi';
    if (d.includes('oppo')) return 'oppo';
    if (d.includes('vivo') || d.includes('iqoo')) return 'vivo';
    if (d.includes('realme')) return 'realme';
    if (d.includes('pixel')) return 'pixel';
    if (d.includes('oneplus')) return 'oneplus';
    if (d.includes('motorola') || d.includes('moto')) return 'motorola';
    if (d.includes('huawei')) return 'huawei';
    return 'default';
};

const khtmlStr = () => rand([
    '(KHTML, like Gecko)',
    '(KHTML, Like Gecko)',
    '(khtml, like gecko)',
    '(KHTML,like Gecko)',
    '(KHTML, like gecko)',
]);

// ─── DEVICE DATABASE ──────────────────────────────────────────────────────────
const generateSamsungDevices = () => {
    const d = [];
    const sM = [911, 916, 918, 901, 906, 908, 921, 926, 928, 931, 936, 938, 711, 721, 731, 741, 751, 881, 891, 896, 861, 866, 868];
    sM.forEach(m => ['B', 'U', 'N', 'F', 'E', '0'].forEach(s => d.push(`Samsung SM-S${m}${s}`)));
    const aM = ['025', '035', '047', '057', '135', '136', '146', '156', '166', '235', '236', '246', '256', '266', '325', '326', '336', '346', '356', '366', '415', '425', '426', '435', '436', '525', '526', '536', '546', '556', '566', '625', '636', '725', '736', '346', '446'];
    aM.forEach(m => ['B', 'F', 'G', 'U', 'N', '0', 'E', 'DS'].forEach(s => d.push(`Samsung SM-A${m}${s}`)));
    [135, 146, 236, 336, 346, 536, 546, 246, 446, 636].forEach(m => ['B', 'F', 'U', 'N', '0'].forEach(s => d.push(`Samsung SM-M${m}${s}`)));
    [415, 425, 526, 542, 721, 731, 741, 936, 946, 956].forEach(m => ['B', 'U', 'N'].forEach(s => d.push(`Samsung SM-F${m}${s}`)));
    [980, 985, 988, 991, 996, 998, 525, 526, 781].forEach(m => ['B', 'F', 'U'].forEach(s => d.push(`Samsung SM-G${m}${s}`)));
    [770, 780, 980, 981, 985, 986].forEach(m => ['B', 'F', 'U'].forEach(s => d.push(`Samsung SM-N${m}${s}`)));
    Array.from({ length: 15 }, (_, i) => (i + 4) * 100).forEach(m => ['F', 'H', 'G'].forEach(s => d.push(`Samsung SM-J${m}${s}`)));
    return d;
};

const generateXiaomiDevices = () => {
    const d = [];
    ['Xiaomi 15 Ultra', 'Xiaomi 15 Pro', 'Xiaomi 15', 'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13 Ultra', 'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 12S Ultra', 'Xiaomi 12S Pro', 'Xiaomi 12 Pro', 'Xiaomi 12', 'Xiaomi 11 Ultra', 'Xiaomi 11 Pro', 'Xiaomi 11', 'Xiaomi 14T Pro', 'Xiaomi 14T', 'Xiaomi 13T Pro', 'Xiaomi 13T', 'Xiaomi 12T Pro', 'Xiaomi 12T', 'Xiaomi 11T Pro', 'Xiaomi 11T', 'Xiaomi MIX Fold 3', 'Xiaomi MIX Fold 2', 'Xiaomi MIX 4', 'Xiaomi Civi 4 Pro', 'Xiaomi Civi 3'].forEach(x => d.push(x));
    for (let i = 5; i <= 14; i++) ['', 'Pro', 'Ultra', 'Lite', 's'].forEach(s => d.push(`Xiaomi Mi ${i}${s ? ' ' + s : ''}`));
    for (let i = 4; i <= 14; i++) ['', ' Pro', ' Pro+', ' Pro Max', ' Turbo', ' 5G', ' 4G', ' S', ' Ultra'].forEach(s => d.push(`Redmi Note ${i}${s}`));
    for (let i = 6; i <= 14; i++) ['', ' Pro', ' Pro Max', 'C', 'A', ' 5G', ' Plus', ' Lite'].forEach(s => d.push(`Redmi ${i}${s}`));
    for (let i = 1; i <= 5; i++) ['', '+', 'x', ' Pro', ' 5G'].forEach(s => d.push(`Redmi A${i}${s}`));
    for (let i = 30; i <= 70; i += 5) ['', ' Pro', ' Ultra', ' Pro+'].forEach(s => d.push(`Redmi K${i}${s}`));
    for (let i = 1; i <= 7; i++) {
        ['', ' Pro', ' Pro 5G', ' GT'].forEach(s => d.push(`POCO F${i}${s}`));
        ['', ' Pro', ' Pro 5G', ' GT', ' NFC'].forEach(s => d.push(`POCO X${i}${s}`));
        ['', ' Pro', ' 5G', 's'].forEach(s => d.push(`POCO M${i}${s}`));
        ['', ' Pro', ' 5G', '+'].forEach(s => d.push(`POCO C${i * 10}${s}`));
    }
    return d;
};

const generateOppoDevices = () => {
    const d = [];
    for (let c = 1900; c <= 2700; c += 7) d.push(`OPPO CPH${c}`);
    ['OPPO Find X8 Pro', 'OPPO Find X8', 'OPPO Find X7 Ultra', 'OPPO Find X7', 'OPPO Find X6 Pro', 'OPPO Find X6', 'OPPO Find X5 Pro', 'OPPO Find X5', 'OPPO Find N3 Flip', 'OPPO Find N3', 'OPPO Find N2 Flip'].forEach(x => d.push(x));
    return d;
};

const generateVivoDevices = () => {
    const d = [];
    for (let i = 15; i <= 50; i++) ['', ' Pro', ' 5G', ' Plus', 'e'].forEach(s => d.push(`vivo V${i}${s}`));
    for (let i = 11; i <= 300; i += 3) ['', ' Pro', 's', ' 5G', 't'].forEach(s => d.push(`vivo Y${i}${s}`));
    for (let i = 70; i <= 100; i += 10) ['', ' Pro', ' Pro+'].forEach(s => d.push(`vivo X${i}${s}`));
    ['iQOO 13', 'iQOO 12 Pro', 'iQOO 12', 'iQOO 11 Pro', 'iQOO 11', 'iQOO Neo9 Pro', 'iQOO Neo9', 'iQOO Neo8 Pro', 'iQOO Z9 Turbo', 'iQOO Z9', 'iQOO Z8', 'iQOO Z7 Pro', 'iQOO Z7'].forEach(x => d.push(`vivo ${x}`));
    for (let i = 5; i <= 15; i++) ['', ' Pro', ' Turbo'].forEach(s => d.push(`vivo iQOO Z${i}${s}`));
    return d;
};

const generateRealmeDevices = () => {
    const d = [];
    [3893, 3851, 3771, 3741, 3687, 3562, 3461, 3999, 3980, 3881, 3861, 3781, 3686, 3671, 3630, 3511, 3461, 3421, 3311, 3241, 3151, 2001, 2111, 2161, 2180].forEach(c => d.push(`Realme RMX${c}`));
    for (let i = 11; i <= 75; i++) ['', ' s', ' Pro', ' NFC', 'e'].forEach(s => d.push(`Realme C${i}${s}`));
    for (let i = 5; i <= 14; i++) ['', ' Pro', ' Pro+', ' 5G', ' Speed Edition'].forEach(s => d.push(`Realme ${i}${s}`));
    for (let i = 3; i <= 10; i++) ['', ' Pro', ' SE'].forEach(s => d.push(`Realme GT Neo${i}${s}`));
    for (let i = 50; i <= 65; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`Realme Narzo ${i}${s}`));
    return d;
};

const generateOtherDevices = () => [
    'Pixel 9 Pro Fold', 'Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9', 'Pixel 8 Pro', 'Pixel 8a', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 7', 'Pixel 6 Pro', 'Pixel 6a', 'Pixel 6', 'Pixel 5a', 'Pixel 5', 'Pixel 4a 5G', 'Pixel 4a',
    'OnePlus 13', 'OnePlus 12R', 'OnePlus 12', 'OnePlus 11R', 'OnePlus 11', 'OnePlus Nord 4', 'OnePlus Nord CE4 Lite', 'OnePlus Nord CE4', 'OnePlus Nord CE3 Lite', 'OnePlus Nord CE3', 'OnePlus Nord CE2', 'OnePlus Nord 3', 'OnePlus Open',
    ...Array.from({ length: 20 }, (_, i) => `OnePlus CPH${2400 + i * 10}`),
    'motorola edge 50 ultra', 'motorola edge 50 pro', 'motorola edge 50 fusion', 'motorola edge 50', 'motorola edge 40 neo', 'motorola edge 40 pro', 'motorola edge 40', 'motorola edge 30 ultra', 'motorola edge 30 pro', 'motorola edge 30',
    'motorola razr 50 ultra', 'motorola razr 50', 'motorola razr 40 ultra', 'motorola razr 40',
    ...Array.from({ length: 20 }, (_, i) => `motorola moto g${84 - i}`),
    ...Array.from({ length: 15 }, (_, i) => `motorola moto e${i + 13}`),
    'Sony Xperia 1 VI', 'Sony Xperia 1 V', 'Sony Xperia 1 IV', 'Sony Xperia 5 V', 'Sony Xperia 5 IV', 'Sony Xperia 10 VI', 'Sony Xperia 10 V', 'Sony Xperia 10 IV',
    'Nokia G42 5G', 'Nokia G22', 'Nokia G21', 'Nokia G20', 'Nokia XR21', 'Nokia X30', 'Nokia X20', 'Nokia C32', 'Nokia C22',
    'Nothing Phone (2a) Plus', 'Nothing Phone (2a)', 'Nothing Phone (2)', 'Nothing Phone (1)',
    'ASUS ROG Phone 8 Pro', 'ASUS ROG Phone 8', 'ASUS ROG Phone 7 Ultimate', 'ASUS ROG Phone 7', 'ASUS Zenfone 11 Ultra', 'ASUS Zenfone 10', 'ASUS Zenfone 9',
    'Huawei P60 Pro', 'Huawei P60', 'Huawei P50 Pro', 'Huawei P50', 'Huawei Mate 60 Pro+', 'Huawei Mate 60 Pro', 'Huawei Mate 60', 'Huawei Mate 50 Pro', 'Huawei Nova 12 Ultra', 'Huawei Nova 12 Pro', 'Huawei Nova 11 Pro',
    'HONOR Magic6 Pro', 'HONOR Magic6', 'HONOR Magic5 Pro', 'HONOR 200 Pro', 'HONOR 200', 'HONOR 100 Pro', 'HONOR 90 Pro', 'HONOR 90', 'HONOR 80 Pro',
    ...Array.from({ length: 10 }, (_, i) => `HONOR X${i + 5}`),
    ...Array.from({ length: 10 }, (_, i) => `HONOR X${i + 5}a`),
    ...Array.from({ length: 20 }, (_, i) => `TECNO Camon ${i + 10}`),
    ...Array.from({ length: 15 }, (_, i) => `TECNO Spark ${i + 10}`),
    ...Array.from({ length: 20 }, (_, i) => `Infinix HOT ${i + 20}`),
    ...Array.from({ length: 10 }, (_, i) => `Infinix NOTE ${i + 30}`),
    ...Array.from({ length: 15 }, (_, i) => `Infinix SMART ${i + 5}`),
    ...Array.from({ length: 15 }, (_, i) => `itel A${i + 60}`),
    ...Array.from({ length: 10 }, (_, i) => `itel P${i + 50}`),
    ...Array.from({ length: 15 }, (_, i) => `TCL ${(i + 3) * 10} 5G`),
    'ZTE Blade V50 Design', 'ZTE Blade V50', 'ZTE Blade A75', 'ZTE Blade A54',
    ...Array.from({ length: 15 }, (_, i) => `ZTE Blade A${i + 70}`),
    'Nubia Z60 Ultra', 'Nubia Z50 Ultra', 'nubia RedMagic 9 Pro+', 'nubia RedMagic 9 Pro', 'nubia RedMagic 8 Pro+',
    'Fairphone 5', 'Fairphone 4', 'Fairphone 3+',
    'HMD Pulse Pro', 'HMD Pulse+', 'HMD Pulse', 'HMD Vibe', 'HMD Skyline',
    ...['A15', 'A15S', 'A15 Pro', 'A13 Pro', 'A13', 'Bison X20', 'Bison X10'].map(m => `UMIDIGI ${m}`),
    ...['S100 Pro', 'S100', 'S98 Pro', 'S89 Pro', 'X98', 'N50'].map(m => `Doogee ${m}`),
    ...Array.from({ length: 20 }, (_, i) => `Cubot P${i + 60}`),
    ...Array.from({ length: 10 }, (_, i) => `vivo iQOO ${i + 5}`),
];


const generateExtraDevices = () => {
    const d = [];

    // Samsung Galaxy A extra
    ['026', '036', '055', '125', '145', '155', '165', '225', '245', '255', '265', '315', '335', '345', '355', '365', '435', '445', '455', '515', '535', '545', '555', '615', '635', '715', '725', '735'].forEach(m =>
        ['B', 'F', 'G', 'U', 'N', 'E', 'DS'].forEach(s => d.push(`Samsung SM-A${m}${s}`))
    );
    // Samsung Galaxy M extra
    for (let i = 10; i <= 60; i += 2) ['B', 'F', 'U', 'N'].forEach(s => d.push(`Samsung SM-M${String(i).padStart(3, '0')}${s}`));

    // OPPO Reno name-based
    for (let i = 2; i <= 13; i++) ['', ' Pro', ' Pro+', ' 5G', ' Z', ' F', ' Lite'].forEach(s => d.push(`OPPO Reno ${i}${s}`));
    // OPPO A name-based
    for (let i = 11; i <= 99; i += 2) ['', ' Pro', ' 5G', 's'].forEach(s => d.push(`OPPO A${i}${s}`));
    // OPPO F series
    for (let i = 17; i <= 27; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`OPPO F${i}${s}`));

    // Vivo S/T/U series
    for (let i = 10; i <= 20; i++) ['', ' Pro', ' 5G', ' t'].forEach(s => d.push(`vivo S${i}${s}`));
    for (let i = 1; i <= 10; i++) ['', ' Pro', ' 5G', ' x'].forEach(s => d.push(`vivo T${i}${s}`));
    for (let i = 10; i <= 30; i += 2) ['', ' Pro'].forEach(s => d.push(`vivo U${i}${s}`));

    // Realme Q/X series
    for (let i = 3; i <= 6; i++) ['', ' Pro', ' Pro+', ' 5G'].forEach(s => d.push(`Realme Q${i}${s}`));
    for (let i = 3; i <= 9; i++) ['', ' Pro', ' Pro+', ' 5G', ' Lite'].forEach(s => d.push(`Realme X${i}${s}`));

    // OnePlus extra
    for (let i = 6; i <= 13; i++) ['', ' Pro', ' T', ' R'].forEach(s => d.push(`OnePlus ${i}${s}`));
    for (let i = 1; i <= 5; i++) ['', ' Pro', ' Lite', ' 5G'].forEach(s => d.push(`OnePlus Nord CE${i}${s}`));
    for (let i = 1; i <= 5; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`OnePlus Nord ${i}${s}`));

    // Motorola extra
    for (let i = 10; i <= 60; i += 2) ['', ' Power', ' Plus', ' Play', ' 5G'].forEach(s => d.push(`motorola moto g${i}${s}`));
    for (let i = 6; i <= 22; i++) ['', ' Plus', ' Power', ' 5G'].forEach(s => d.push(`motorola moto e${i}${s}`));

    // Sony extra
    for (let i = 1; i <= 5; i++) [' II', ' III', ' IV', ' V', ' VI'].forEach(s => d.push(`Sony Xperia ${i}${s}`));

    // Nokia extra
    for (let i = 20; i <= 99; i += 5) ['', ' Pro', ' 5G'].forEach(s => d.push(`Nokia C${i}${s}`));
    for (let i = 1; i <= 9; i++) ['', ' Plus', ' 5G'].forEach(s => d.push(`Nokia ${i}.4${s}`));

    // Huawei extra
    for (let i = 30; i <= 60; i += 5) ['', ' Pro', ' Pro+', ' Lite'].forEach(s => d.push(`Huawei P${i}${s}`));
    for (let i = 30; i <= 60; i += 5) ['', ' Pro', ' X'].forEach(s => d.push(`Huawei Mate ${i}${s}`));
    for (let i = 9; i <= 13; i++) ['', ' Pro', ' Ultra', ' SE'].forEach(s => d.push(`Huawei Nova ${i}${s}`));

    // Honor extra
    for (let i = 50; i <= 100; i += 5) ['', ' Pro', ' Pro+', ' Lite'].forEach(s => d.push(`HONOR ${i}${s}`));
    for (let i = 1; i <= 6; i++) ['', ' Pro', ' Ultimate'].forEach(s => d.push(`HONOR Magic${i}${s}`));

    // Tecno extra
    for (let i = 15; i <= 35; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`TECNO Camon ${i}${s}`));
    for (let i = 15; i <= 30; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`TECNO Spark ${i}${s}`));
    for (let i = 1; i <= 10; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`TECNO Phantom ${i}${s}`));

    // Infinix extra
    for (let i = 20; i <= 45; i++) ['', ' Pro', ' Pro+', ' 5G'].forEach(s => d.push(`Infinix HOT ${i}${s}`));
    for (let i = 20; i <= 45; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`Infinix NOTE ${i}${s}`));
    for (let i = 10; i <= 25; i++) ['', ' Pro', ' Plus'].forEach(s => d.push(`Infinix ZERO ${i}${s}`));

    // ZTE extra
    for (let i = 50; i <= 99; i += 3) ['', ' Pro', ' 5G'].forEach(s => d.push(`ZTE Blade A${i}${s}`));
    for (let i = 30; i <= 60; i += 5) ['', ' Pro'].forEach(s => d.push(`ZTE Blade V${i}${s}`));

    // itel extra
    for (let i = 40; i <= 99; i += 2) ['', ' Pro', ' Plus'].forEach(s => d.push(`itel A${i}${s}`));
    for (let i = 30; i <= 70; i += 2) ['', ' Pro'].forEach(s => d.push(`itel P${i}${s}`));
    for (let i = 10; i <= 40; i += 2) ['', ' Pro'].forEach(s => d.push(`itel S${i}${s}`));

    // TCL extra
    for (let i = 2; i <= 9; i++) ['', ' Pro', ' 5G', ' Plus', ' SE'].forEach(s => d.push(`TCL ${i}0${s}`));

    // ASUS extra
    for (let i = 5; i <= 9; i++) ['', ' Pro', ' Ultimate'].forEach(s => d.push(`ASUS ROG Phone ${i}${s}`));
    for (let i = 7; i <= 11; i++) ['', ' Ultra', ' Pro'].forEach(s => d.push(`ASUS Zenfone ${i}${s}`));

    // Meizu extra
    for (let i = 15; i <= 22; i++) ['', ' Pro', ' Note', ' X'].forEach(s => d.push(`Meizu ${i}${s}`));

    // nubia/RedMagic extra
    for (let i = 6; i <= 9; i++) ['', ' Pro', ' Pro+', ' S'].forEach(s => d.push(`nubia RedMagic ${i}${s}`));
    for (let i = 40; i <= 70; i += 5) ['', ' Ultra', ' Pro'].forEach(s => d.push(`Nubia Z${i}${s}`));

    // Sharp extra
    for (let i = 1; i <= 9; i++) ['', 's', ' Pro'].forEach(s => d.push(`Sharp AQUOS sense${i}${s}`));
    for (let i = 1; i <= 9; i++) ['', 's', ' Compact'].forEach(s => d.push(`Sharp AQUOS R${i}${s}`));

    // Lenovo extra
    for (let i = 10; i <= 20; i++) ['', ' Pro', ' Plus', ' Note'].forEach(s => d.push(`Lenovo K${i}${s}`));

    // Xiaomi Redmi extra varian
    for (let i = 4; i <= 14; i++) [' Pro 5G', ' Note Pro Max', ' Hyper'].forEach(s => d.push(`Redmi Note ${i}${s}`));

    // Samsung Galaxy F extra
    ['04', '14', '23', '34', '42', '52', '54', '62', '73', '84'].forEach(m =>
        ['B', 'F', 'U'].forEach(s => d.push(`Samsung SM-F${m}${s}`))
    );

    // Vivo Y extra (fill gaps)
    for (let i = 12; i <= 298; i += 3) d.push(`vivo Y${i}`);
    for (let i = 1; i <= 20; i++) ['', ' Pro', ' 5G'].forEach(s => d.push(`vivo Y0${i}${s}`));

    // TCL extra number series
    for (let i = 301; i <= 405; i += 4) d.push(`TCL ${i}`);

    // Wiko extra
    for (let i = 50; i <= 80; i++) d.push(`Wiko T${i}`);
    for (let i = 80; i <= 99; i++) d.push(`Wiko Y${i}`);

    // Blackview extra
    for (let i = 6100; i <= 9400; i += 100) d.push(`Blackview BV${i}`);
    for (let i = 50; i <= 110; i += 5) d.push(`Blackview A${i}`);

    return d;
};


const generateDevices7k = () => {
    const d = [];

    // Samsung Galaxy A extra (lebih lengkap)
    for (let i = 5; i <= 99; i += 2)
        ['B', 'F', 'U', 'N', 'E'].forEach(s => d.push(`Samsung SM-A${String(i).padStart(3, '0')}${s}`));

    // Samsung Galaxy M extra
    for (let i = 10; i <= 99; i += 3)
        ['B', 'F', 'U'].forEach(s => d.push(`Samsung SM-M${String(i).padStart(3, '0')}${s}`));

    // Samsung Galaxy S extra regions
    [901, 906, 908, 911, 916, 918, 921, 926, 928, 931, 936, 938].forEach(m =>
        ['B', 'U', 'N', 'F', 'E', '0', '1', '2', '3', '4'].forEach(s => d.push(`Samsung SM-S${m}${s}`))
    );

    // Xiaomi number series extended
    for (let i = 6; i <= 15; i++)
        ['', ' Pro', ' Ultra', ' Lite', ' Plus', ' Racing', ' Special Edition'].forEach(s => d.push(`Xiaomi ${i}${s}`));

    // Xiaomi T series extended
    for (let i = 10; i <= 15; i++)
        ['', ' Pro', ' Ultra'].forEach(s => d.push(`Xiaomi ${i}T${s}`));

    // Redmi Note extended
    for (let i = 3; i <= 14; i++)
        ['', ' Pro', ' Pro+', ' Pro Max', ' Turbo', ' 5G', ' 4G', ' S', ' Ultra', ' Speed'].forEach(s => d.push(`Redmi Note ${i}${s}`));

    // Redmi number extended
    for (let i = 5; i <= 14; i++)
        ['', ' Pro', ' Pro Max', 'C', 'A', ' 5G', ' Plus', ' Lite', ' Turbo'].forEach(s => d.push(`Redmi ${i}${s}`));

    // Redmi K series extended
    for (let i = 20; i <= 80; i += 2)
        ['', ' Pro', ' Ultra', ' Pro+', ' Turbo'].forEach(s => d.push(`Redmi K${i}${s}`));

    // POCO extended
    for (let i = 1; i <= 8; i++) {
        ['', ' Pro', ' Pro 5G', ' GT', ' NFC', ' Lite'].forEach(s => d.push(`POCO F${i}${s}`));
        ['', ' Pro', ' Pro 5G', ' GT', ' NFC', ' Lite'].forEach(s => d.push(`POCO X${i}${s}`));
        ['', ' Pro', ' 5G', 's', ' Lite'].forEach(s => d.push(`POCO M${i}${s}`));
        ['', ' Pro', ' 5G', '+'].forEach(s => d.push(`POCO C${i * 10}${s}`));
        ['', ' Pro', ' 5G'].forEach(s => d.push(`POCO C${i * 10 + 5}${s}`));
    }

    // OPPO Reno extended (nama-based)
    for (let i = 1; i <= 14; i++)
        ['', ' Pro', ' Pro+', ' 5G', ' Z', ' F', ' Lite', ' Flash'].forEach(s => d.push(`OPPO Reno${i}${s}`));

    // OPPO A extended
    for (let i = 1; i <= 99; i++)
        ['', ' Pro', ' 5G', 's', ' Lite'].forEach(s => d.push(`OPPO A${i}${s}`));

    // OPPO F extended
    for (let i = 11; i <= 29; i++)
        ['', ' Pro', ' 5G', ' Lite'].forEach(s => d.push(`OPPO F${i}${s}`));

    // OPPO K series
    for (let i = 5; i <= 15; i++)
        ['', ' Pro', ' 5G'].forEach(s => d.push(`OPPO K${i}${s}`));

    // vivo Y extended (fill all gaps)
    for (let i = 1; i <= 400; i += 2)
        ['', ' Pro', ' 5G'].forEach(s => d.push(`vivo Y${i}${s}`));

    // vivo V extended
    for (let i = 5; i <= 50; i++)
        ['', ' Pro', ' 5G', ' Plus', ' e', ' Lite'].forEach(s => d.push(`vivo V${i}${s}`));

    // vivo S extended
    for (let i = 1; i <= 25; i++)
        ['', ' Pro', ' 5G', ' t'].forEach(s => d.push(`vivo S${i}${s}`));

    // vivo T extended
    for (let i = 1; i <= 15; i++)
        ['', ' Pro', ' 5G', ' x', ' Lite'].forEach(s => d.push(`vivo T${i}${s}`));

    // Realme C extended
    for (let i = 1; i <= 80; i++)
        ['', ' s', ' Pro', ' NFC', ' e', ' Lite'].forEach(s => d.push(`Realme C${i}${s}`));

    // Realme number extended
    for (let i = 1; i <= 15; i++)
        ['', ' Pro', ' Pro+', ' 5G', ' Speed Edition', ' Lite'].forEach(s => d.push(`Realme ${i}${s}`));

    // Realme GT extended
    for (let i = 1; i <= 8; i++)
        ['', ' Pro', ' Master Edition', ' Neo', ' Explorer'].forEach(s => d.push(`Realme GT${i}${s}`));
    for (let i = 1; i <= 10; i++)
        ['', ' Pro', ' SE', ' Turbo'].forEach(s => d.push(`Realme GT Neo${i}${s}`));

    // Realme X extended
    for (let i = 1; i <= 10; i++)
        ['', ' Pro', ' Pro+', ' 5G', ' Lite', ' Master'].forEach(s => d.push(`Realme X${i}${s}`));

    // Realme Narzo extended
    for (let i = 20; i <= 70; i++)
        ['', ' Pro', ' 5G', ' Speed'].forEach(s => d.push(`Realme Narzo${i}${s}`));

    // OnePlus extended
    for (let i = 5; i <= 13; i++)
        ['', ' Pro', ' T', ' R', ' 5G'].forEach(s => d.push(`OnePlus ${i}${s}`));
    for (let i = 1; i <= 6; i++) {
        ['', ' Pro', ' Lite', ' 5G', ' SE'].forEach(s => d.push(`OnePlus Nord CE${i}${s}`));
        ['', ' Pro', ' 5G', ' Lite'].forEach(s => d.push(`OnePlus Nord ${i}${s}`));
        ['', ' Pro', ' 5G'].forEach(s => d.push(`OnePlus Nord N${i * 10}${s}`));
    }

    // Motorola Moto G extended
    for (let i = 5; i <= 99; i++)
        ['', ' Power', ' Plus', ' Play', ' 5G', ' Stylus', ' Fusion'].forEach(s => d.push(`motorola moto g${i}${s}`));

    // Motorola Moto E extended
    for (let i = 4; i <= 25; i++)
        ['', ' Plus', ' Power', ' 5G', ' Lite'].forEach(s => d.push(`motorola moto e${i}${s}`));

    // Motorola Edge extended
    for (let i = 20; i <= 55; i++)
        ['', ' Pro', ' Plus', ' Fusion', ' 5G', ' Ultra'].forEach(s => d.push(`motorola edge ${i}${s}`));

    // Huawei P extended
    for (let i = 20; i <= 70; i += 2)
        ['', ' Pro', ' Pro+', ' Lite', ' Smart'].forEach(s => d.push(`Huawei P${i}${s}`));

    // Huawei Mate extended
    for (let i = 20; i <= 70; i += 2)
        ['', ' Pro', ' Pro+', ' X', ' RS'].forEach(s => d.push(`Huawei Mate ${i}${s}`));

    // Huawei Nova extended
    for (let i = 3; i <= 15; i++)
        ['', ' Pro', ' SE', ' Ultra', ' Lite'].forEach(s => d.push(`Huawei Nova ${i}${s}`));

    // Huawei Y series
    for (let i = 5; i <= 9; i++)
        for (let j = 0; j <= 9; j++)
            ['', ' Pro', 's'].forEach(s => d.push(`Huawei Y${i}${j}${s}`));

    // Honor extended
    for (let i = 6; i <= 200; i += 3)
        ['', ' Pro', ' Pro+', ' Lite', ' SE'].forEach(s => d.push(`HONOR ${i}${s}`));
    for (let i = 1; i <= 7; i++)
        ['', ' Pro', ' Pro+', ' Ultimate', ' Fold'].forEach(s => d.push(`HONOR Magic${i}${s}`));
    for (let i = 5; i <= 15; i++)
        ['', ' Pro', ' Lite'].forEach(s => d.push(`HONOR X${i}${s}`));

    // Sony Xperia extended
    for (let i = 1; i <= 5; i++)
        [' II', ' III', ' IV', ' V', ' VI', ' VII'].forEach(s => d.push(`Sony Xperia ${i}${s}`));
    for (let i = 10; i <= 15; i++)
        ['', ' II', ' III', ' IV', ' V'].forEach(s => d.push(`Sony Xperia ${i}${s}`));
    for (let i = 1; i <= 4; i++)
        ['', 's', ' Plus', ' Ultra', ' Pro'].forEach(s => d.push(`Sony Xperia L${i}${s}`));

    // Nokia extended
    for (let i = 10; i <= 99; i += 3) {
        ['', ' Pro', ' 5G', ' Plus'].forEach(s => d.push(`Nokia C${i}${s}`));
        ['', ' Pro', ' 5G', ' Plus'].forEach(s => d.push(`Nokia G${i}${s}`));
    }
    for (let i = 1; i <= 9; i++)
        [' 2', '  3', ' 4', ' 5'].forEach(s => d.push(`Nokia ${i}.${i}${s}`));

    // TCL extended
    for (let i = 301; i <= 499; i += 2) d.push(`TCL ${i}`);
    for (let i = 2; i <= 9; i++)
        ['', ' Pro', ' 5G', ' Plus', ' SE', ' NxtPaper'].forEach(s => d.push(`TCL ${i}0${s}`));

    // ZTE extended
    for (let i = 30; i <= 99; i++)
        ['', ' Pro', ' 5G', ' Design'].forEach(s => d.push(`ZTE Blade A${i}${s}`));
    for (let i = 20; i <= 70; i += 2)
        ['', ' Pro'].forEach(s => d.push(`ZTE Blade V${i}${s}`));
    for (let i = 1; i <= 9; i++)
        ['', ' Pro', ' Plus', ' Ultra'].forEach(s => d.push(`ZTE nubia Z${50 + i * 5}${s}`));

    // itel extended
    for (let i = 30; i <= 99; i++)
        ['', ' Pro', ' Plus', 's'].forEach(s => d.push(`itel A${i}${s}`));
    for (let i = 20; i <= 70; i++)
        ['', ' Pro', ' Plus'].forEach(s => d.push(`itel P${i}${s}`));
    for (let i = 10; i <= 50; i++)
        ['', ' Pro', ' Plus'].forEach(s => d.push(`itel S${i}${s}`));

    // Tecno extended
    for (let i = 5; i <= 40; i++)
        ['', ' Pro', ' Pro+', ' 5G', ' Pro 5G'].forEach(s => d.push(`TECNO Camon ${i}${s}`));
    for (let i = 5; i <= 35; i++)
        ['', ' Pro', ' 5G', ' Go'].forEach(s => d.push(`TECNO Spark ${i}${s}`));
    for (let i = 1; i <= 15; i++)
        ['', ' Pro', ' 5G'].forEach(s => d.push(`TECNO Phantom ${i}${s}`));
    for (let i = 1; i <= 20; i++)
        ['', ' Pro'].forEach(s => d.push(`TECNO POP ${i}${s}`));

    // Infinix extended
    for (let i = 10; i <= 50; i++)
        ['', ' Pro', ' Pro+', ' 5G', ' Play'].forEach(s => d.push(`Infinix HOT ${i}${s}`));
    for (let i = 10; i <= 45; i++)
        ['', ' Pro', ' Pro+', ' 5G'].forEach(s => d.push(`Infinix NOTE ${i}${s}`));
    for (let i = 5; i <= 30; i++)
        ['', ' Pro', ' Plus', ' 5G'].forEach(s => d.push(`Infinix ZERO ${i}${s}`));
    for (let i = 5; i <= 15; i++)
        ['', ' Pro', ' Plus'].forEach(s => d.push(`Infinix SMART ${i}${s}`));

    // ASUS ROG/Zenfone extended
    for (let i = 3; i <= 9; i++)
        ['', ' Pro', ' Ultimate', ' Pro+', ' Edition'].forEach(s => d.push(`ASUS ROG Phone ${i}${s}`));
    for (let i = 5; i <= 12; i++)
        ['', ' Ultra', ' Pro', ' Flip'].forEach(s => d.push(`ASUS Zenfone ${i}${s}`));

    // Lenovo extended
    for (let i = 8; i <= 22; i++)
        ['', ' Pro', ' Plus', ' Note', ' 5G'].forEach(s => d.push(`Lenovo K${i}${s}`));
    for (let i = 1; i <= 9; i++)
        ['', ' Pro', ' Plus', ' Ultra'].forEach(s => d.push(`Lenovo Tab P${i}${i}${s}`));
    for (let i = 1; i <= 5; i++)
        ['', ' Pro', ' Plus'].forEach(s => d.push(`Lenovo Legion Phone Duel ${i}${s}`));

    // Meizu extended
    for (let i = 10; i <= 25; i++)
        ['', ' Pro', ' Note', ' X', ' 5G'].forEach(s => d.push(`Meizu ${i}${s}`));
    for (let i = 1; i <= 5; i++)
        ['', ' Pro'].forEach(s => d.push(`Meizu m${i}${s}`));

    // nubia/RedMagic extended
    for (let i = 5; i <= 10; i++)
        ['', ' Pro', ' Pro+', ' S', ' Ultra'].forEach(s => d.push(`nubia RedMagic ${i}${s}`));
    for (let i = 30; i <= 80; i += 5)
        ['', ' Ultra', ' Pro', ' S'].forEach(s => d.push(`Nubia Z${i}${s}`));

    // Sharp extended
    for (let i = 1; i <= 12; i++) {
        ['', 's', ' Pro', ' Compact'].forEach(s => d.push(`Sharp AQUOS sense${i}${s}`));
        ['', 's', ' Pro', ' Compact'].forEach(s => d.push(`Sharp AQUOS R${i}${s}`));
    }
    for (let i = 1; i <= 5; i++)
        ['', ' Pro'].forEach(s => d.push(`Sharp AQUOS wish${i}${s}`));

    // Wiko extended
    for (let i = 30; i <= 99; i++) d.push(`Wiko T${i}`);
    for (let i = 70; i <= 99; i++) d.push(`Wiko Y${i}`);
    for (let i = 1; i <= 10; i++) d.push(`Wiko Power U${i * 10}`);

    // Blackview extended
    for (let i = 5000; i <= 9900; i += 100) d.push(`Blackview BV${i}`);
    for (let i = 30; i <= 120; i += 2) d.push(`Blackview A${i}`);
    for (let i = 1; i <= 10; i++) ['', ' Pro', ' Ultra'].forEach(s => d.push(`Blackview Tab ${i}${s}`));

    // Cubot extended
    for (let i = 50; i <= 99; i++) d.push(`Cubot P${i}`);
    for (let i = 10; i <= 40; i++) d.push(`Cubot Note ${i}`);
    for (let i = 40; i <= 80; i += 2) d.push(`Cubot X${i}`);
    for (let i = 1; i <= 10; i++) ['', ' Pro'].forEach(s => d.push(`Cubot KingKong ${i}${s}`));

    // Umidigi extended
    ['A15', 'A15S', 'A15 Pro', 'A15 Pro Max', 'A13 Pro', 'A13', 'A11 Pro', 'A11', 'A9 Pro',
        'Bison X20 Pro', 'Bison X20', 'Bison X10 Pro', 'Bison X10',
        'Power 7 Max', 'Power 7', 'Power 5S', 'F3 Pro', 'F3',
    ].forEach(m => d.push(`UMIDIGI ${m}`));

    // Doogee extended
    for (let i = 80; i <= 120; i += 5) ['', ' Pro'].forEach(s => d.push(`Doogee S${i}${s}`));
    ['X98 Pro', 'X98', 'N50 Pro', 'N50', 'N40 Pro', 'V30 Pro', 'V20 Pro', 'T20 Ultra'].forEach(m => d.push(`Doogee ${m}`));

    // HMD extended
    ['Pulse Pro', 'Pulse+', 'Pulse', 'Vibe', 'Skyline', 'Barenta 4G', 'Fusion', 'Arrow',
        'Nokia 1.4', 'Nokia 2.4', 'Nokia 3.4', 'Nokia 5.4', 'Nokia 6.3', 'Nokia 8.3',
    ].forEach(m => d.push(`HMD ${m}`));

    return d;
};
const androidDevices = [
    ...generateSamsungDevices(),
    ...generateXiaomiDevices(),
    ...generateOppoDevices(),
    ...generateVivoDevices(),
    ...generateRealmeDevices(),
    ...generateOtherDevices(),
    ...generateExtraDevices(),
    ...generateDevices7k(),
];


// android version realistis berdasarkan device/brand
const androidVersionForDevice = (device) => {
    const d = device.toLowerCase();

    // device generasi terbaru → android 13-15
    if (d.includes('pixel 8') || d.includes('pixel 9') ||
        d.includes('sm-s93') || d.includes('sm-s92') || d.includes('sm-s94') ||
        d.includes('sm-s91') || d.includes('sm-f95') || d.includes('sm-f74') ||
        d.includes('xiaomi 14') || d.includes('xiaomi 15') ||
        d.includes('redmi note 13') || d.includes('redmi note 14') ||
        d.includes('find x8') || d.includes('find x7') ||
        d.includes('oneplus 12') || d.includes('oneplus 13') ||
        d.includes('edge 50') || d.includes('razr 50')) {
        return rand(['13', '13', '14', '14', '14', '15']);
    }

    // device generasi menengah → android 11-13
    if (d.includes('pixel 6') || d.includes('pixel 7') ||
        d.includes('sm-s90') || d.includes('sm-s88') || d.includes('sm-s71') ||
        d.includes('sm-a54') || d.includes('sm-a53') || d.includes('sm-a34') ||
        d.includes('sm-a33') || d.includes('sm-f93') || d.includes('sm-f73') ||
        d.includes('xiaomi 12') || d.includes('xiaomi 13') ||
        d.includes('redmi note 11') || d.includes('redmi note 12') ||
        d.includes('poco x5') || d.includes('poco x6') || d.includes('poco f5') || d.includes('poco f6') ||
        d.includes('find x6') || d.includes('find x5') ||
        d.includes('oneplus 10') || d.includes('oneplus 11') ||
        d.includes('edge 40') || d.includes('razr 40') ||
        d.includes('vivo v30') || d.includes('vivo v40') ||
        d.includes('realme gt neo') || d.includes('reno 10') || d.includes('reno 11') || d.includes('reno 12')) {
        return rand(['11', '12', '12', '13', '13']);
    }

    // device budget/lama → android 9-12
    if (d.includes('sm-a14') || d.includes('sm-a13') || d.includes('sm-a23') ||
        d.includes('sm-a24') || d.includes('sm-a15') || d.includes('sm-a25') ||
        d.includes('redmi a') || d.includes('redmi 12') || d.includes('redmi 13') ||
        d.includes('poco m') || d.includes('poco c') ||
        d.includes('realme c') || d.includes('realme narzo') ||
        d.includes('vivo y') || d.includes('tecno') || d.includes('infinix') ||
        d.includes('itel') || d.includes('cubot') || d.includes('blackview') ||
        d.includes('nokia c') || d.includes('wiko')) {
        return rand(['10', '10', '11', '11', '12', '12', '13']);
    }

    // device lama atau tidak dikenal → android 8-12
    return rand(['8', '9', '10', '10', '11', '11', '12']);
};


// ─── ANDROID VERSION weighted berdasarkan distribusi real 2025 ───────────────
const androidVersionWeighted = () => {
    const r = Math.random();
    if (r < 0.30) return '10';
    if (r < 0.50) return '11';
    if (r < 0.68) return '12';
    if (r < 0.85) return '13';
    if (r < 0.97) return '14';
    return '15';
};

// chrome version minimum 110 untuk device modern (auto-update)
const chromeVersionModern = () => {
    const major = randInt(110, 134);
    const patches = {
        110: 5481, 112: 5615, 114: 5735, 116: 5845, 118: 5993,
        119: 6045, 120: 6099, 121: 6167, 122: 6261, 124: 6367,
        126: 6478, 128: 6613, 129: 6668, 130: 6723, 131: 6778,
        132: 6834, 133: 6943, 134: 6998,
    };
    const base = patches[major] || (major * 50);
    const patch = base + randInt(1, 180);
    const sub = randInt(10, 200);
    const r = Math.random();
    const str = r < 0.4 ? `${major}.0.${patch}.${sub}` : r < 0.7 ? `${major}.0.${patch}` : `${major}.0.0.0`;
    return { major, str };
};

// ─── BUILD ANDROID UA ─────────────────────────────────────────────────────────
const buildAndroid = () => {
    const isComplex = Math.random() < (20 / 100); // 80:20 ratio

    // 80% simple → "K" pattern (paling umum di dunia nyata)
    if (!isComplex) {
        const andVer = androidVersionWeighted();
        const andMajor = parseInt(andVer);
        const chrome = chromeVersionModern();
        const browser = rand(['chrome', 'chrome', 'chrome', 'chrome', 'samsung', 'firefox']);

        if (browser === 'firefox') {
            const ff = firefoxVersion();
            return `Mozilla/5.0 (Android ${andVer}; Mobile; rv:${ff}) Gecko/${ff} Firefox/${ff}`;
        }
        if (browser === 'samsung') {
            const sbv = samsungBrowserVersion(andMajor);
            return `Mozilla/5.0 (Linux; Android ${andVer}; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/${sbv} Chrome/${chrome.str} Mobile Safari/537.36`;
        }
        // chrome default - K pattern
        return `Mozilla/5.0 (Linux; Android ${andVer}; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chrome.str} Mobile Safari/537.36`;
    }

    // 20% complex → device name spesifik + optional tokens
    const device = rand(androidDevices);
    const brand = detectBrand(device);
    const andVer = androidVersionForDevice(device);
    const andMajor = parseInt(andVer);
    const chrome = chromeVersion(andMajor);

    const hasLinux = Math.random() < 0.7;
    const hasDevice = true;
    const hasWv = Math.random() < 0.1;
    const hasBuild = Math.random() < 0.5;
    const hasLocale = Math.random() < 0.4;

    const tokens = compact([
        hasLinux ? 'Linux' : null,
        `Android ${andVer}`,
        device,
        hasBuild ? `Build/${buildNumber(andMajor)}` : null,
        hasLocale ? localeForBrand(brand) : null,
        hasWv ? 'wv' : null,
    ]);

    // shuffle (Linux tetap di depan)
    const hasL = tokens[0] === 'Linux';
    const head = hasL ? ['Linux'] : [];
    const tail = hasL ? tokens.slice(1) : [...tokens];
    for (let i = tail.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tail[i], tail[j]] = [tail[j], tail[i]];
    }
    const inner = [...head, ...tail].join(sep());
    const khtml = khtmlStr();
    const mobile = Math.random() < 0.88 ? ' Mobile' : '';

    const browserType = (() => {
        if (brand === 'samsung' && Math.random() < 0.4) return 'samsung';
        if (brand === 'huawei' && Math.random() < 0.4) return 'huawei';
        if (brand === 'xiaomi' && Math.random() < 0.3) return 'miui';
        return rand(['chrome', 'chrome', 'chrome', 'firefox', 'opera', 'brave', 'webview']);
    })();

    if (browserType === 'firefox') {
        const ff = firefoxVersion();
        return `Mozilla/5.0 (Android ${andVer}; Mobile; rv:${ff}) Gecko/${ff} Firefox/${ff}`;
    }
    if (browserType === 'samsung') {
        const sbv = samsungBrowserVersion(andMajor);
        return `Mozilla/5.0 (Linux; Android ${andVer}; ${device}) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/${sbv} Chrome/${chrome.str}${mobile} Safari/537.36`;
    }
    if (browserType === 'huawei') {
        const hv = `${randInt(13, 15)}.0.${randInt(1, 9)}.{randInt(100,999)}`;
        return `Mozilla/5.0 (Linux; Android ${andVer}; ${device}; HMSCore ${randInt(6, 6)}.${randInt(10, 15)}.0.${randInt(100, 999)}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chrome.str} HuaweiBrowser/${hv}${mobile} Safari/537.36`;
    }
    if (browserType === 'miui') {
        const mv = `${randInt(17, 20)}.${randInt(1, 9)}`;
        return `Mozilla/5.0 (Linux; Android ${andVer}; ${device}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chrome.str}${mobile} Safari/537.36 XiaoMi/MiuiBrowser/${mv}`;
    }
    if (browserType === 'opera') {
        const op = `${randInt(75, 82)}.0.${randInt(1000, 9999)}.${randInt(10, 99)}`;
        return `Mozilla/5.0 (${inner}) AppleWebKit/537.36 ${khtml} Chrome/${chrome.str}${mobile} Safari/537.36 OPR/${op}`;
    }
    if (browserType === 'brave') {
        return `Mozilla/5.0 (${inner}) AppleWebKit/537.36 ${khtml} Chrome/${chrome.str}${mobile} Safari/537.36 Brave/${chrome.major}`;
    }
    if (browserType === 'webview') {
        return `Mozilla/5.0 (${inner}) AppleWebKit/537.36 ${khtml} Version/4.0 Chrome/${chrome.str}${mobile} Safari/537.36`;
    }
    return `Mozilla/5.0 (${inner}) AppleWebKit/537.36 ${khtml} Chrome/${chrome.str}${mobile} Safari/537.36`;
};

// ─── BUILD iOS UA ─────────────────────────────────────────────────────────────
const buildIos = () => {
    // iOS version weighted - data real 2025
    // iOS 18 dominan, 17 masih banyak, 16 ada
    const iosVerWeighted = () => {
        const r = Math.random();
        if (r < 0.50) return { major: 18, minor: rand([0, 1, 2, 3, '3_1', '3_2']), webkit: '605.1.15', build: '15E148' };
        if (r < 0.80) return { major: 17, minor: rand([0, 1, 2, 3, 4, 5, '5_1']), webkit: '605.1.15', build: '15E148' };
        if (r < 0.95) return { major: 16, minor: rand([0, 1, 2, 3, 4, 5, 6, '7_10']), webkit: '605.1.15', build: '15E148' };
        return { major: 15, minor: rand([0, 1, 2, 3, 4, 5, 6]), webkit: '605.1.15', build: '15E148' };
    };

    const { major, minor, webkit, build } = iosVerWeighted();
    const os = `${major}_${minor}`;
    const type = rand(['safari', 'safari', 'safari', 'chrome', 'firefox', 'gsa']);

    if (type === 'safari')
        return `Mozilla/5.0 (iPhone; CPU iPhone OS ${os} like Mac OS X) AppleWebKit/${webkit} (KHTML, like Gecko) Version/${major}.${typeof minor === 'string' ? minor.split('_')[0] : minor} Mobile/${build} Safari/604.1`;
    if (type === 'chrome') {
        const cv = chromeVersionModern();
        return `Mozilla/5.0 (iPhone; CPU iPhone OS ${os} like Mac OS X) AppleWebKit/${webkit} (KHTML, like Gecko) CriOS/${cv.str} Mobile/${build} Safari/604.1`;
    }
    if (type === 'gsa') {
        // Google Search App - sangat umum di iOS (5.83% dari data real)
        const gsaV = `${randInt(340, 365)}.0.${randInt(700000000, 799999999)}`;
        return `Mozilla/5.0 (iPhone; CPU iPhone OS ${os} like Mac OS X) AppleWebKit/${webkit} (KHTML, like Gecko) GSA/${gsaV} Mobile/${build} Safari/604.1`;
    }
    const ff = `${randInt(120, 136)}.0`;
    return `Mozilla/5.0 (iPhone; CPU iPhone OS ${os} like Mac OS X) AppleWebKit/${webkit} (KHTML, like Gecko) FxiOS/${ff} Mobile/${build} Safari/604.1`;
};


// ═══════════════════════════════════════════════════════════════════════════════
// DESKTOP UA
// ═══════════════════════════════════════════════════════════════════════════════

// Chrome desktop version - spread 120-145, mayoritas 130-145
const chromeDesktopVersion = () => {
    const r = Math.random();
    // majoritas pakai versi baru
    let major;
    if (r < 0.08) major = randInt(120, 129);
    else if (r < 0.25) major = randInt(130, 134);
    else if (r < 0.50) major = randInt(135, 139);
    else major = randInt(140, 145);
    // Desktop Chrome selalu x.0.0.0 — tidak ada patch number
    return `${major}.0.0.0`;
};

// Firefox desktop version - 128 (ESR) atau 135-147 (stable)
const firefoxDesktopVersion = () => {
    const r = Math.random();
    if (r < 0.15) return '128.0'; // ESR channel - cukup umum
    return `${randInt(135, 147)}.0`;
};

// Mac OS X version - di UA Chrome selalu 10_15_7 (privacy freeze)
// Safari bisa 10_15_7 atau versi baru
const macOsVersion = (isSafari = false) => {
    if (!isSafari) return '10_15_7'; // Chrome/Firefox/Edge selalu ini
    // Safari kadang nulis versi asli
    return Math.random() < 0.7 ? '10_15_7' : rand(['14_7_1', '15_7_2', '15_7_4', '14_7', '15_6', '13_6_9']);
};

// Safari desktop version weighted
const safariDesktopVersion = () => {
    const r = Math.random();
    if (r < 0.45) return { major: 18, minor: rand([0, 1, 2, 3, '3_1', '3_2', '4', '5']), str: '' };
    if (r < 0.75) return { major: 17, minor: rand([0, 1, 2, 3, 4, 5, '5_1', '6']), str: '' };
    if (r < 0.90) return { major: 16, minor: rand([0, 1, 2, 3, 4, 5, 6]), str: '' };
    return { major: 15, minor: rand([0, 1, 2, 3, 4, 5, 6]), str: '' };
};

// ─── BUILD WINDOWS UA ────────────────────────────────────────────────────────
const buildWindows = () => {
    const browser = (() => {
        const r = Math.random();
        if (r < 0.55) return 'chrome';
        if (r < 0.75) return 'edge';
        if (r < 0.85) return 'firefox';
        if (r < 0.92) return 'opera';
        return 'brave';
    })();

    const platform = 'Windows NT 10.0; Win64; x64';

    if (browser === 'firefox') {
        const ff = firefoxDesktopVersion();
        return `Mozilla/5.0 (${platform}; rv:${ff}) Gecko/20100101 Firefox/${ff}`;
    }

    const cv = chromeDesktopVersion();

    if (browser === 'edge') {
        const edgeMajor = parseInt(cv);
        return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36 Edg/${edgeMajor}.0.0.0`;
    }
    if (browser === 'opera') {
        const oprMajor = randInt(108, 118);
        return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36 OPR/${oprMajor}.0.0.0`;
    }
    if (browser === 'brave') {
        return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36`;
    }
    // chrome default
    return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36`;
};

// ─── BUILD MAC UA ─────────────────────────────────────────────────────────────
const buildMac = () => {
    const browser = (() => {
        const r = Math.random();
        if (r < 0.43) return 'safari';
        if (r < 0.68) return 'chrome';
        if (r < 0.80) return 'firefox';
        if (r < 0.88) return 'edge';
        if (r < 0.94) return 'opera';
        return 'brave';
    })();

    if (browser === 'safari') {
        const sv = safariDesktopVersion();
        const osv = macOsVersion(true);
        const minorStr = typeof sv.minor === 'string' ? sv.minor.replace('_', '.').split('_')[0] : sv.minor;
        return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${osv}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${sv.major}.${minorStr} Safari/605.1.15`;
    }

    if (browser === 'firefox') {
        const ff = firefoxDesktopVersion();
        // Firefox Mac pakai titik, bukan underscore
        return `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:${ff}) Gecko/20100101 Firefox/${ff}`;
    }

    const cv = chromeDesktopVersion();
    const osv = macOsVersion(false);

    if (browser === 'edge') {
        const edgeMajor = parseInt(cv);
        return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${osv}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36 Edg/${edgeMajor}.0.0.0`;
    }
    if (browser === 'opera') {
        const oprMajor = randInt(108, 118);
        return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${osv}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36 OPR/${oprMajor}.0.0.0`;
    }
    // chrome / brave
    return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${osv}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36`;
};

// ─── BUILD LINUX UA ───────────────────────────────────────────────────────────
const buildLinux = () => {
    const browser = (() => {
        const r = Math.random();
        if (r < 0.60) return 'chrome';
        if (r < 0.85) return 'firefox';
        return 'brave';
    })();

    const platform = rand([
        'X11; Linux x86_64',
        'X11; Ubuntu; Linux x86_64',
        'X11; Fedora; Linux x86_64',
        'X11; Linux x86_64',
        'X11; Linux x86_64',
    ]);

    if (browser === 'firefox') {
        const ff = firefoxDesktopVersion();
        return `Mozilla/5.0 (${platform}; rv:${ff}) Gecko/20100101 Firefox/${ff}`;
    }

    const cv = chromeDesktopVersion();
    return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${cv} Safari/537.36`;
};

const userAgents = {
    mobile: {
        ios: () => buildIos(),
        android: () => buildAndroid(),
        random: () => Math.random() > 0.5 ? buildIos() : buildAndroid(),
    },
    desktop: {
        windows: () => buildWindows(),
        mac: () => buildMac(),
        linux: () => buildLinux(),
        random: () => {
            const r = Math.random();
            if (r < 0.55) return buildWindows();
            if (r < 0.85) return buildMac();
            return buildLinux();
        },
    },
};

export default userAgents;
