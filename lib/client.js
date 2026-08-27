window.__ModuleLoader__.load({ id: "@huanlin/dsh-plugin-merge-tool-calls", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react = require("react");
react = __toESM(react);
let __deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
__deepseek_ai_dsh_client_ui_primitives = __toESM(__deepseek_ai_dsh_client_ui_primitives);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region src/types.ts
/** Runtime defaults applied when a half receives no config (defensive only). */
const DEFAULT_MERGE_CONFIG = {
	tools: [],
	groupBy: "adjacent",
	maxGroupSize: 8
};

//#endregion
//#region src/client/dictionaries.ts
/** All override-language dictionaries for the `NS` namespace. */
const dicts = {
	ja: {
		running: "実行中",
		failed: "失敗",
		stopped: "中断",
		expand: "展開",
		collapse: "折りたたむ",
		more: "+{n}",
		showLess: "残りを閉じる",
		mergedCount: "{n} 回の呼び出しを統合",
		countFiles: "{n} 個のファイル",
		countQueries: "{n} 回の検索",
		countCommands: "{n} 個のコマンド",
		countPrograms: "{n} 個のプログラム",
		countCalls: "{n} 回の呼び出し",
		"terminal.signal": "シグナル {signal}",
		"terminal.exitCode": "終了コード {code}",
		"terminal.running": "実行中",
		"terminal.failed": "失敗",
		"terminal.done": "完了",
		"terminal.copy": "コピー",
		"terminal.copied": "コピーしました",
		"terminal.noOutput": "出力なし",
		"terminal.collapseAria": "出力を折りたたむ",
		"terminal.collapse": "折りたたむ",
		"terminal.expandAria": "残り {n} 行の出力を展開",
		"terminal.expandRest": "… 残り {n} 行"
	},
	de: {
		running: "Läuft",
		failed: "Fehlgeschlagen",
		stopped: "Unterbrochen",
		expand: "Erweitern",
		collapse: "Einklappen",
		more: "+{n}",
		showLess: "Weniger anzeigen",
		mergedCount: "{n} Aufrufe zusammengeführt",
		countFiles: "{n} Dateien",
		countQueries: "{n} Suchanfragen",
		countCommands: "{n} Befehle",
		countPrograms: "{n} Programme",
		countCalls: "{n} Aufrufe",
		"terminal.signal": "Signal {signal}",
		"terminal.exitCode": "Exit-Code {code}",
		"terminal.running": "Läuft",
		"terminal.failed": "Fehlgeschlagen",
		"terminal.done": "Abgeschlossen",
		"terminal.copy": "Kopieren",
		"terminal.copied": "Kopiert",
		"terminal.noOutput": "Keine Ausgabe",
		"terminal.collapseAria": "Ausgabe einklappen",
		"terminal.collapse": "Einklappen",
		"terminal.expandAria": "Die restlichen {n} Ausgabezeilen ausklappen",
		"terminal.expandRest": "… {n} weitere Zeilen"
	},
	fr: {
		running: "En cours",
		failed: "Échec",
		stopped: "Interrompu",
		expand: "Développer",
		collapse: "Réduire",
		more: "+{n}",
		showLess: "Afficher moins",
		mergedCount: "{n} appels fusionnés",
		countFiles: "{n} fichiers",
		countQueries: "{n} recherches",
		countCommands: "{n} commandes",
		countPrograms: "{n} programmes",
		countCalls: "{n} appels",
		"terminal.signal": "Signal {signal}",
		"terminal.exitCode": "Code de sortie {code}",
		"terminal.running": "En cours",
		"terminal.failed": "Échec",
		"terminal.done": "Terminé",
		"terminal.copy": "Copier",
		"terminal.copied": "Copié",
		"terminal.noOutput": "Aucune sortie",
		"terminal.collapseAria": "Réduire la sortie",
		"terminal.collapse": "Réduire",
		"terminal.expandAria": "Déployer les {n} lignes de sortie restantes",
		"terminal.expandRest": "… {n} lignes restantes"
	},
	pt: {
		running: "Executando",
		failed: "Falhou",
		stopped: "Interrompido",
		expand: "Expandir",
		collapse: "Recolher",
		more: "+{n}",
		showLess: "Mostrar menos",
		mergedCount: "{n} chamadas mescladas",
		countFiles: "{n} arquivos",
		countQueries: "{n} pesquisas",
		countCommands: "{n} comandos",
		countPrograms: "{n} programas",
		countCalls: "{n} chamadas",
		"terminal.signal": "sinal {signal}",
		"terminal.exitCode": "código de saída {code}",
		"terminal.running": "Executando",
		"terminal.failed": "Falhou",
		"terminal.done": "Concluído",
		"terminal.copy": "Copiar",
		"terminal.copied": "Copiado",
		"terminal.noOutput": "Sem saída",
		"terminal.collapseAria": "Recolher saída",
		"terminal.collapse": "Recolher",
		"terminal.expandAria": "Expandir as {n} linhas de saída restantes",
		"terminal.expandRest": "… mais {n} linhas"
	},
	ko: {
		running: "실행 중",
		failed: "실패",
		stopped: "중단됨",
		expand: "펼치기",
		collapse: "접기",
		more: "+{n}",
		showLess: "더 적게 표시",
		mergedCount: "{n}번 호출 병합됨",
		countFiles: "파일 {n}개",
		countQueries: "검색 {n}회",
		countCommands: "명령 {n}개",
		countPrograms: "프로그램 {n}개",
		countCalls: "호출 {n}회",
		"terminal.signal": "신호 {signal}",
		"terminal.exitCode": "종료 코드 {code}",
		"terminal.running": "실행 중",
		"terminal.failed": "실패",
		"terminal.done": "완료",
		"terminal.copy": "복사",
		"terminal.copied": "복사됨",
		"terminal.noOutput": "출력 없음",
		"terminal.collapseAria": "출력 접기",
		"terminal.collapse": "접기",
		"terminal.expandAria": "나머지 {n}줄 출력 펼치기",
		"terminal.expandRest": "… 나머지 {n}줄"
	},
	ar: {
		running: "قيد التشغيل",
		failed: "فشل",
		stopped: "متوقف",
		expand: "توسيع",
		collapse: "طي",
		more: "+{n}",
		showLess: "إظهار أقل",
		mergedCount: "تم دمج {n} استدعاء",
		countFiles: "{n} ملف",
		countQueries: "{n} بحث",
		countCommands: "{n} أمر",
		countPrograms: "{n} برنامج",
		countCalls: "{n} استدعاء",
		"terminal.signal": "إشارة {signal}",
		"terminal.exitCode": "رمز الخروج {code}",
		"terminal.running": "قيد التشغيل",
		"terminal.failed": "فشل",
		"terminal.done": "اكتمل",
		"terminal.copy": "نسخ",
		"terminal.copied": "تم النسخ",
		"terminal.noOutput": "لا يوجد إخراج",
		"terminal.collapseAria": "طي الإخراج",
		"terminal.collapse": "طي",
		"terminal.expandAria": "توسيع {n} أسطر إخراج المتبقية",
		"terminal.expandRest": "… و{n} أسطر أخرى"
	},
	hi: {
		running: "चल रहा",
		failed: "विफल",
		stopped: "रोका गया",
		expand: "विस्तार करें",
		collapse: "संक्षिप्त करें",
		more: "+{n}",
		showLess: "कम दिखाएं",
		mergedCount: "{n} कॉल मर्ज किए गए",
		countFiles: "{n} फ़ाइलें",
		countQueries: "{n} खोज",
		countCommands: "{n} कमांड",
		countPrograms: "{n} प्रोग्राम",
		countCalls: "{n} कॉल",
		"terminal.signal": "सिग्नल {signal}",
		"terminal.exitCode": "एग्ज़िट कोड {code}",
		"terminal.running": "चल रहा",
		"terminal.failed": "विफल",
		"terminal.done": "पूर्ण",
		"terminal.copy": "कॉपी",
		"terminal.copied": "कॉपी हो गया",
		"terminal.noOutput": "कोई आउटपुट नहीं",
		"terminal.collapseAria": "आउटपुट संक्षिप्त करें",
		"terminal.collapse": "संक्षिप्त करें",
		"terminal.expandAria": "शेष {n} आउटपुट पंक्तियाँ विस्तृत करें",
		"terminal.expandRest": "… {n} और पंक्तियाँ"
	},
	id: {
		running: "Berjalan",
		failed: "Gagal",
		stopped: "Dihentikan",
		expand: "Bentangkan",
		collapse: "Lipat",
		more: "+{n}",
		showLess: "Tampilkan lebih sedikit",
		mergedCount: "{n} panggilan digabungkan",
		countFiles: "{n} file",
		countQueries: "{n} pencarian",
		countCommands: "{n} perintah",
		countPrograms: "{n} program",
		countCalls: "{n} panggilan",
		"terminal.signal": "sinyal {signal}",
		"terminal.exitCode": "kode keluar {code}",
		"terminal.running": "Berjalan",
		"terminal.failed": "Gagal",
		"terminal.done": "Selesai",
		"terminal.copy": "Salin",
		"terminal.copied": "Tersalin",
		"terminal.noOutput": "Tidak ada keluaran",
		"terminal.collapseAria": "Lipat keluaran",
		"terminal.collapse": "Lipat",
		"terminal.expandAria": "Bentangkan {n} baris keluaran tersisa",
		"terminal.expandRest": "… {n} baris lagi"
	},
	tr: {
		running: "Çalışıyor",
		failed: "Başarısız",
		stopped: "Durduruldu",
		expand: "Genişlet",
		collapse: "Daralt",
		more: "+{n}",
		showLess: "Daha az göster",
		mergedCount: "{n} çağrı birleştirildi",
		countFiles: "{n} dosya",
		countQueries: "{n} arama",
		countCommands: "{n} komut",
		countPrograms: "{n} program",
		countCalls: "{n} çağrı",
		"terminal.signal": "sinyal {signal}",
		"terminal.exitCode": "çıkış kodu {code}",
		"terminal.running": "Çalışıyor",
		"terminal.failed": "Başarısız",
		"terminal.done": "Tamamlandı",
		"terminal.copy": "Kopyala",
		"terminal.copied": "Kopyalandı",
		"terminal.noOutput": "Çıkış yok",
		"terminal.collapseAria": "Çıkışı daralt",
		"terminal.collapse": "Daralt",
		"terminal.expandAria": "Kalan {n} çıkış satırını genişlet",
		"terminal.expandRest": "… {n} satır daha"
	},
	vi: {
		running: "Đang chạy",
		failed: "Thất bại",
		stopped: "Đã dừng",
		expand: "Mở rộng",
		collapse: "Thu gọn",
		more: "+{n}",
		showLess: "Hiển thị ít hơn",
		mergedCount: "Đã gộp {n} lệnh gọi",
		countFiles: "{n} tệp",
		countQueries: "{n} lượt tìm kiếm",
		countCommands: "{n} lệnh",
		countPrograms: "{n} chương trình",
		countCalls: "{n} lượt gọi",
		"terminal.signal": "tín hiệu {signal}",
		"terminal.exitCode": "mã thoát {code}",
		"terminal.running": "Đang chạy",
		"terminal.failed": "Thất bại",
		"terminal.done": "Đã xong",
		"terminal.copy": "Sao chép",
		"terminal.copied": "Đã sao chép",
		"terminal.noOutput": "Không có đầu ra",
		"terminal.collapseAria": "Thu gọn đầu ra",
		"terminal.collapse": "Thu gọn",
		"terminal.expandAria": "Mở rộng {n} dòng đầu ra còn lại",
		"terminal.expandRest": "… còn {n} dòng"
	},
	th: {
		running: "กำลังทำงาน",
		failed: "ล้มเหลว",
		stopped: "ถูกขัดจังหวะ",
		expand: "ขยาย",
		collapse: "ย่อ",
		more: "+{n}",
		showLess: "แสดงน้อยลง",
		mergedCount: "รวม {n} การเรียก",
		countFiles: "{n} ไฟล์",
		countQueries: "{n} การค้นหา",
		countCommands: "{n} คำสั่ง",
		countPrograms: "{n} โปรแกรม",
		countCalls: "{n} การเรียก",
		"terminal.signal": "สัญญาณ {signal}",
		"terminal.exitCode": "รหัสออก {code}",
		"terminal.running": "กำลังทำงาน",
		"terminal.failed": "ล้มเหลว",
		"terminal.done": "เสร็จสิ้น",
		"terminal.copy": "คัดลอก",
		"terminal.copied": "คัดลอกแล้ว",
		"terminal.noOutput": "ไม่มีเอาต์พุต",
		"terminal.collapseAria": "ย่อเอาต์พุต",
		"terminal.collapse": "ย่อ",
		"terminal.expandAria": "ขยายเอาต์พุตอีก {n} บรรทัด",
		"terminal.expandRest": "… อีก {n} บรรทัด"
	},
	ru: {
		running: "Выполняется",
		failed: "Сбой",
		stopped: "Прервано",
		expand: "Развернуть",
		collapse: "Свернуть",
		more: "+{n}",
		showLess: "Показать меньше",
		mergedCount: "Объединено вызовов: {n}",
		countFiles: "{n} файлов",
		countQueries: "{n} поисков",
		countCommands: "{n} команд",
		countPrograms: "{n} программ",
		countCalls: "{n} вызовов",
		"terminal.signal": "сигнал {signal}",
		"terminal.exitCode": "код выхода {code}",
		"terminal.running": "Выполняется",
		"terminal.failed": "Сбой",
		"terminal.done": "Завершено",
		"terminal.copy": "Копировать",
		"terminal.copied": "Скопировано",
		"terminal.noOutput": "Нет вывода",
		"terminal.collapseAria": "Свернуть вывод",
		"terminal.collapse": "Свернуть",
		"terminal.expandAria": "Показать оставшиеся {n} строк вывода",
		"terminal.expandRest": "… ещё {n} строк"
	},
	it: {
		running: "In esecuzione",
		failed: "Non riuscito",
		stopped: "Interrotto",
		expand: "Espandi",
		collapse: "Comprimi",
		more: "+{n}",
		showLess: "Mostra meno",
		mergedCount: "{n} chiamate unite",
		countFiles: "{n} file",
		countQueries: "{n} ricerche",
		countCommands: "{n} comandi",
		countPrograms: "{n} programmi",
		countCalls: "{n} chiamate",
		"terminal.signal": "segnale {signal}",
		"terminal.exitCode": "codice di uscita {code}",
		"terminal.running": "In esecuzione",
		"terminal.failed": "Non riuscito",
		"terminal.done": "Completato",
		"terminal.copy": "Copia",
		"terminal.copied": "Copiato",
		"terminal.noOutput": "Nessun output",
		"terminal.collapseAria": "Comprimi output",
		"terminal.collapse": "Comprimi",
		"terminal.expandAria": "Espandi le restanti {n} righe di output",
		"terminal.expandRest": "… altre {n} righe"
	},
	nl: {
		running: "Actief",
		failed: "Mislukt",
		stopped: "Onderbroken",
		expand: "Uitklappen",
		collapse: "Inklappen",
		more: "+{n}",
		showLess: "Minder tonen",
		mergedCount: "{n} aanroepen samengevoegd",
		countFiles: "{n} bestanden",
		countQueries: "{n} zoekopdrachten",
		countCommands: "{n} opdrachten",
		countPrograms: "{n} programma's",
		countCalls: "{n} aanroepen",
		"terminal.signal": "signaal {signal}",
		"terminal.exitCode": "exit-code {code}",
		"terminal.running": "Actief",
		"terminal.failed": "Mislukt",
		"terminal.done": "Voltooid",
		"terminal.copy": "Kopiëren",
		"terminal.copied": "Gekopieerd",
		"terminal.noOutput": "Geen uitvoer",
		"terminal.collapseAria": "Uitvoer inklappen",
		"terminal.collapse": "Inklappen",
		"terminal.expandAria": "De overige {n} uitvoerregels uitklappen",
		"terminal.expandRest": "… nog {n} regels"
	},
	sv: {
		running: "Kör",
		failed: "Misslyckades",
		stopped: "Avbruten",
		expand: "Expandera",
		collapse: "Komprimera",
		more: "+{n}",
		showLess: "Visa mindre",
		mergedCount: "{n} anrop sammanslagna",
		countFiles: "{n} filer",
		countQueries: "{n} sökningar",
		countCommands: "{n} kommandon",
		countPrograms: "{n} program",
		countCalls: "{n} anrop",
		"terminal.signal": "signal {signal}",
		"terminal.exitCode": "slutkod {code}",
		"terminal.running": "Kör",
		"terminal.failed": "Misslyckades",
		"terminal.done": "Klar",
		"terminal.copy": "Kopiera",
		"terminal.copied": "Kopierades",
		"terminal.noOutput": "Ingen utdata",
		"terminal.collapseAria": "Komprimera utdata",
		"terminal.collapse": "Komprimera",
		"terminal.expandAria": "Expandera de återstående {n} utdataraderna",
		"terminal.expandRest": "… {n} fler rader"
	},
	pl: {
		running: "Działa",
		failed: "Nie powiodło się",
		stopped: "Przerwano",
		expand: "Rozwiń",
		collapse: "Zwiń",
		more: "+{n}",
		showLess: "Pokaż mniej",
		mergedCount: "Połączono {n} wywołań",
		countFiles: "{n} plików",
		countQueries: "{n} wyszukań",
		countCommands: "{n} poleceń",
		countPrograms: "{n} programów",
		countCalls: "{n} wywołań",
		"terminal.signal": "sygnał {signal}",
		"terminal.exitCode": "kod wyjścia {code}",
		"terminal.running": "Działa",
		"terminal.failed": "Nie powiodło się",
		"terminal.done": "Ukończono",
		"terminal.copy": "Kopiuj",
		"terminal.copied": "Skopiowano",
		"terminal.noOutput": "Brak wyjścia",
		"terminal.collapseAria": "Zwiń wyjście",
		"terminal.collapse": "Zwiń",
		"terminal.expandAria": "Rozwiń pozostałe {n} wierszy wyjścia",
		"terminal.expandRest": "…jeszcze {n} wierszy"
	},
	"zh-HK": {
		running: "執行中",
		failed: "失敗",
		stopped: "已中斷",
		expand: "展開",
		collapse: "收起",
		more: "+{n}",
		showLess: "收起其餘",
		mergedCount: "已合併 {n} 次呼叫",
		countFiles: "{n} 個檔案",
		countQueries: "{n} 次搜尋",
		countCommands: "{n} 條命令",
		countPrograms: "{n} 段程式碼",
		countCalls: "{n} 次呼叫",
		"terminal.signal": "訊號 {signal}",
		"terminal.exitCode": "退出碼 {code}",
		"terminal.running": "執行中",
		"terminal.failed": "失敗",
		"terminal.done": "已完成",
		"terminal.copy": "複製",
		"terminal.copied": "已複製",
		"terminal.noOutput": "無輸出",
		"terminal.collapseAria": "收起輸出",
		"terminal.collapse": "收起",
		"terminal.expandAria": "展開其餘 {n} 行輸出",
		"terminal.expandRest": "… 其餘 {n} 行"
	},
	"zh-TW": {
		running: "執行中",
		failed: "失敗",
		stopped: "已中斷",
		expand: "展開",
		collapse: "收起",
		more: "+{n}",
		showLess: "收起其餘",
		mergedCount: "已合併 {n} 次呼叫",
		countFiles: "{n} 個檔案",
		countQueries: "{n} 次搜尋",
		countCommands: "{n} 條命令",
		countPrograms: "{n} 段程式碼",
		countCalls: "{n} 次呼叫",
		"terminal.signal": "訊號 {signal}",
		"terminal.exitCode": "退出碼 {code}",
		"terminal.running": "執行中",
		"terminal.failed": "失敗",
		"terminal.done": "已完成",
		"terminal.copy": "複製",
		"terminal.copied": "已複製",
		"terminal.noOutput": "無輸出",
		"terminal.collapseAria": "收起輸出",
		"terminal.collapse": "收起",
		"terminal.expandAria": "展開其餘 {n} 行輸出",
		"terminal.expandRest": "… 其餘 {n} 行"
	},
	"zh-MO": {
		running: "執行中",
		failed: "失敗",
		stopped: "已中斷",
		expand: "展開",
		collapse: "收起",
		more: "+{n}",
		showLess: "收起其餘",
		mergedCount: "已合併 {n} 次呼叫",
		countFiles: "{n} 個檔案",
		countQueries: "{n} 次搜尋",
		countCommands: "{n} 條命令",
		countPrograms: "{n} 段程式碼",
		countCalls: "{n} 次呼叫",
		"terminal.signal": "訊號 {signal}",
		"terminal.exitCode": "退出碼 {code}",
		"terminal.running": "執行中",
		"terminal.failed": "失敗",
		"terminal.done": "已完成",
		"terminal.copy": "複製",
		"terminal.copied": "已複製",
		"terminal.noOutput": "無輸出",
		"terminal.collapseAria": "收起輸出",
		"terminal.collapse": "收起",
		"terminal.expandAria": "展開其餘 {n} 行輸出",
		"terminal.expandRest": "… 其餘 {n} 行"
	}
};

//#endregion
//#region src/client/locales.ts
/** Product copy for the merged tool-call rows. */
const zh = {
	running: "进行中",
	failed: "失败",
	stopped: "已中断",
	expand: "展开",
	collapse: "折叠",
	more: "+{n}",
	showLess: "收起其余",
	mergedCount: "已合并 {n} 次调用",
	countFiles: "{n} 个文件",
	countQueries: "{n} 次搜索",
	countCommands: "{n} 条命令",
	countPrograms: "{n} 段代码",
	countCalls: "{n} 次调用",
	copy: "复制",
	copied: "已复制",
	"terminal.signal": "信号 {signal}",
	"terminal.exitCode": "退出码 {code}",
	"terminal.running": "运行中",
	"terminal.failed": "失败",
	"terminal.done": "已完成",
	"terminal.copy": "复制",
	"terminal.copied": "已复制",
	"terminal.noOutput": "无输出",
	"terminal.collapseAria": "收起输出",
	"terminal.collapse": "折叠",
	"terminal.expandAria": "展开其余 {n} 行输出",
	"terminal.expandRest": "… 其余 {n} 行",
	"read.window": "显示 {shown} / {total} 行",
	"read.collapseAria": "收起内容",
	"read.expandAria": "展开其余 {count} 行",
	"read.expandRest": "… 其余 {count} 行",
	"search.paths": "{shown} 个路径",
	"search.paths.truncated": "显示 {shown} / 共 {total} 个路径",
	"search.matches": "{shown} 处匹配 · {files} 个文件",
	"search.matches.truncated": "显示 {shown} / 共 {total} 处匹配 · {files} 个文件",
	"search.noResults": "无结果",
	"search.collapseAria": "收起结果",
	"search.expandAria": "展开其余 {count} 行结果",
	"search.expandRest": "… 其余 {count} 行",
	"diff.collapseAria": "收起差异",
	"diff.expandAria": "展开其余 {count} 行差异",
	"diff.expandRest": "… 其余 {count} 行",
	"diff.files": "{count} 个文件",
	"web.noResults": "未找到结果",
	"web.sourcesTruncated": "来源列表已截断",
	"web.http": "HTTP",
	"web.contentTruncated": "内容已截断",
	"markdown.footnotes": "脚注"
};
const en = {
	running: "Running",
	failed: "Failed",
	stopped: "Interrupted",
	expand: "Expand",
	collapse: "Collapse",
	more: "+{n}",
	showLess: "Show fewer",
	mergedCount: "{n} calls merged",
	countFiles: "{n} Files",
	countQueries: "{n} Queries",
	countCommands: "{n} Commands",
	countPrograms: "{n} Programs",
	countCalls: "{n} Calls",
	copy: "Copy",
	copied: "Copied",
	"terminal.signal": "signal {signal}",
	"terminal.exitCode": "exit code {code}",
	"terminal.running": "Running",
	"terminal.failed": "Failed",
	"terminal.done": "Done",
	"terminal.copy": "Copy",
	"terminal.copied": "Copied",
	"terminal.noOutput": "No output",
	"terminal.collapseAria": "Collapse output",
	"terminal.collapse": "Collapse",
	"terminal.expandAria": "Expand the remaining {n} output lines",
	"terminal.expandRest": "… {n} more lines",
	"read.window": "Showing {shown} of {total} lines",
	"read.collapseAria": "Collapse content",
	"read.expandAria": "Expand {count} more lines",
	"read.expandRest": "… {count} more lines",
	"search.paths": "{shown} paths",
	"search.paths.truncated": "Showing {shown} of {total} paths",
	"search.matches": "{shown} matches · {files} files",
	"search.matches.truncated": "Showing {shown} of {total} matches · {files} files",
	"search.noResults": "No results",
	"search.collapseAria": "Collapse results",
	"search.expandAria": "Expand {count} more result lines",
	"search.expandRest": "… {count} more lines",
	"diff.collapseAria": "Collapse diff",
	"diff.expandAria": "Expand {count} more diff lines",
	"diff.expandRest": "… {count} more lines",
	"diff.files": "{count} files",
	"web.noResults": "No results found",
	"web.sourcesTruncated": "Source list truncated",
	"web.http": "HTTP",
	"web.contentTruncated": "Content truncated",
	"markdown.footnotes": "Footnotes"
};
const NS = "merge-tool-calls";

//#endregion
//#region src/client/tool-names.ts
/**
* The built-in tool universe this plugin shadows by default, plus the
* variant-classification vocabulary mirroring ui-tool's tool-call model.
*
* The keyed `tool.call.toolview` slot dispatches on the exact wire tool name,
* so a shadowed registration is needed per name (there is no wildcard). This
* list names every shipped tool whose row belongs to the generic ToolRow
* family — a variant title/icon plus read/search/diff/terminal/web card or
* IN/OUT text — which the merged row reproduces faithfully.
*
* Deliberately excluded: tools with custom row cards this plugin does not
* replicate (`skill`, `cordis_define`, and the live `cordis_run` /
* `cordis_stop` / `cordis_undefine` rows), and `todo_write` /
* `ask_user_question` whose summary formatting is tool-specific. They keep
* their built-in rows unless the user names them in the `tools` config
* explicitly.
* @module
*/
/** Wire tool names merged by default (empty `tools` config = this list). */
const ALL_TOOL_NAMES = [
	"read",
	"grep",
	"glob",
	"edit",
	"write",
	"bash",
	"pwsh",
	"web_search",
	"web_fetch",
	"run_code",
	"cordis_package_inspect",
	"cordis_runtime_inspect"
];
/** Figma row titles per variant (design literals, not translatable copy). */
const VARIANT_TITLES = {
	search: "Search",
	read: "Read",
	bash: "Bash",
	write: "Write",
	edit: "Edit",
	code: "Code",
	others: "Tool call"
};
/**
* Known tool name -> row variant (mirrors ui-tool's classification table,
* minus the run-control verbs: their rows are custom and not shadowed).
*/
const TOOL_VARIANTS = {
	bash: "bash",
	pwsh: "bash",
	read: "read",
	web_fetch: "read",
	web_search: "search",
	grep: "search",
	glob: "search",
	write: "write",
	edit: "edit",
	run_code: "code",
	cordis_package_inspect: "read",
	cordis_runtime_inspect: "read"
};
/** Tool-owned titles refining a generic row variant (mirrors ui-tool). */
const TOOL_TITLES = {
	cordis_package_inspect: "Inspect",
	cordis_runtime_inspect: "Inspect",
	pwsh: "Pwsh"
};
/** Classify a tool name into its row variant (mirrors ui-tool). */
function classifyTool(toolName) {
	return TOOL_VARIANTS[toolName] ?? "others";
}

//#endregion
//#region src/client/card-model.ts
/**
* Parse the call head paired with one immutable Tool block.
* @param block - running or settled Tool block.
* @returns the Tool name and object arguments, or null when unavailable.
*/
function parsedArgsOf(block) {
	const call = "kind" in block ? block.call : block;
	if (call === null) return null;
	let value;
	try {
		value = JSON.parse(call.argsRaw);
	} catch {
		return null;
	}
	if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
	return {
		name: call.name,
		args: value
	};
}
/**
* Read the exact single text block consumed by first-party card derivations.
* @param block - settled Tool result.
* @returns its text, or undefined for any other content layout.
*/
function singleResultText(block) {
	if (block.content.length !== 1) return void 0;
	const only = block.content[0];
	return only?.type === "text" ? only.text : void 0;
}
/** True when a settled terminal card reports a failing exit (mirrors ui-tool). */
function terminalFailed(model) {
	const { exitCode, signal, running } = model.card;
	return running !== true && (exitCode !== void 0 && exitCode !== 0 || signal !== void 0);
}
/**
* Flatten a settled result's content blocks to display text.
* @param node - settled result node.
* @returns joined text (may be empty).
*/
function resultText(node) {
	const parts = [];
	for (const block of node.content) if (block.type === "text") parts.push(block.text);
	else parts.push(JSON.stringify(block, null, 2));
	if (parts.length === 0 && node.error !== void 0) parts.push(`${node.error.name}: ${node.error.code}`);
	return parts.join("\n");
}
function firstLine(text) {
	const nl = text.indexOf("\n");
	return nl === -1 ? text : text.slice(0, nl);
}
/** Strip the workspace root from a workspace-rooted absolute path (display only). */
function relativizeToCwd(text, cwd) {
	if (cwd === void 0 || cwd === "") return text;
	const root = cwd.replace(/[/\\]+$/, "");
	if (text.startsWith(`${root}/`) || text.startsWith(`${root}\\`)) return text.slice(root.length + 1);
	return text;
}
/**
* Resolve a Workspace-relative path into the Host-facing spelling (local
* mirror of `@deepseek-ai/dsh-util-workspace-path`'s `resolveWorkspacePath`:
* that static utility package is not a dynamic client bundle row, so the
* browser half carries this one-function copy).
* @param cwd - Session Workspace root, when known.
* @param path - Absolute or Workspace-relative path.
* @returns an absolute path when a Workspace root is available, otherwise the original path.
*/
function resolveWorkspacePath(cwd, path) {
	if (path.startsWith("/") || /^[A-Za-z]:[/\\]/.test(path) || path.startsWith("\\\\")) return path;
	if (cwd === void 0 || cwd === "") return path;
	return `${cwd.replace(/[/\\]+$/, "")}/${path.replace(/^[/\\]+/, "")}`;
}
/**
* Abbreviate a POSIX home directory for display (local mirror of
* `@deepseek-ai/dsh-util-workspace-path`'s `abbreviateHomePath`).
* @param path - Absolute or already-short display path.
* @param home - Host account home; absent skips abbreviation.
* @returns `~` or `~/…` for the POSIX home and its descendants, otherwise `path`.
*/
function abbreviateHomePath(path, home) {
	if (home === void 0 || home === "") return path;
	if (/^[A-Za-z]:[/\\]/.test(path) || path.startsWith("\\\\") || /^[A-Za-z]:[/\\]/.test(home) || home.startsWith("\\\\")) return path;
	const root = home.replace(/\/+$/, "");
	if (root === "" || root === "/") return path;
	if (path.replace(/\/+$/, "") === root) return "~";
	if (path.startsWith(`${root}/`)) return `~${path.slice(root.length)}`;
	return path;
}
function parseArgs(argsRaw) {
	try {
		const parsed = JSON.parse(argsRaw);
		return typeof parsed === "object" && parsed !== null ? parsed : void 0;
	} catch {
		return;
	}
}
function pickString(args, keys) {
	for (const key of keys) {
		const value = args[key];
		if (typeof value === "string" && value !== "") return value;
	}
}
/** Summary key preference per row variant (args-derived, mirrors ui-tool). */
const SUMMARY_KEYS = {
	bash: ["description", "command"],
	read: [
		"path",
		"file_path",
		"url"
	],
	search: [
		"query",
		"pattern",
		"url"
	],
	write: ["path", "file_path"],
	edit: ["path", "file_path"],
	code: ["description"],
	others: []
};
function deriveSummary(variant, argsRaw) {
	const parsed = parseArgs(argsRaw);
	if (parsed === void 0) return firstLine(argsRaw);
	if (variant === "search" && Array.isArray(parsed.queries)) {
		const queries = parsed.queries.filter((query) => typeof query === "string" && query !== "");
		if (queries.length > 0) return queries.map(firstLine).join(", ");
	}
	const picked = pickString(parsed, SUMMARY_KEYS[variant]);
	if (picked !== void 0) return firstLine(picked);
	for (const value of Object.values(parsed)) if (typeof value === "string" && value !== "") return firstLine(value);
	return firstLine(argsRaw);
}
/** Path keys only — never `url` (web_fetch lands on the read variant). */
const FILE_PATH_KEYS = ["path", "file_path"];
/** File-tool variants whose summary may be an openable workspace path. */
const FILE_PATH_VARIANTS = new Set([
	"read",
	"write",
	"edit"
]);
function deriveFilePath(variant, argsRaw) {
	if (!FILE_PATH_VARIANTS.has(variant)) return void 0;
	const parsed = parseArgs(argsRaw);
	if (parsed === void 0) return void 0;
	return pickString(parsed, FILE_PATH_KEYS)?.split("\n")[0];
}
function deriveBody(variant, argsRaw) {
	if (argsRaw === "") return null;
	const parsed = parseArgs(argsRaw);
	if (parsed === void 0) return argsRaw;
	if (variant === "code") {
		const code = parsed.code;
		if (typeof code === "string" && code !== "") return code;
	}
	return JSON.stringify(parsed, null, 2);
}
/** Derive the row model for one call of a grouped tool. */
function callRowModel(toolName, block, cwd, home) {
	const done = "kind" in block;
	const argsRaw = (done ? block.call?.argsRaw : block.argsRaw) ?? "";
	const state = !done ? "running" : block.error?.code === "interrupted" ? "stopped" : block.isError ? "error" : "ok";
	const variant = classifyTool(toolName);
	const terminal = terminalCardOf(block, cwd);
	const read = readCardOf(block, cwd, home);
	const diff = diffCardOf(block);
	const search = searchCardOf(block);
	const web = webCardOf(block);
	const base = argsRaw === "" ? block.callId : abbreviateHomePath(relativizeToCwd(deriveSummary(variant, argsRaw), cwd), home);
	const toolTitle = TOOL_TITLES[toolName];
	const argsSummary = variant === "others" && toolName !== "" && toolTitle === void 0 ? `${toolName} · ${base}` : base;
	const filePath = deriveFilePath(variant, argsRaw);
	const output = done ? resultText(block) || null : null;
	const errorSummary = state === "error" && output !== null ? firstLine(output) : null;
	const summary = terminal?.description ?? argsSummary;
	const body = filePath !== void 0 ? null : deriveBody(variant, argsRaw);
	const finalState = state === "ok" && terminal !== null && terminalFailed(terminal) ? "error" : state;
	const expandable = terminal !== null || diff !== null || read !== null || search !== null || web !== null || body !== null || output !== null;
	return {
		state: finalState,
		variant,
		title: toolTitle ?? VARIANT_TITLES[variant],
		summary,
		body,
		output,
		errorSummary,
		filePath,
		expandable,
		terminal,
		diff,
		read,
		search,
		web
	};
}
/** Read-card derivation, or null when this call is not a read card (mirrors ui-tool). */
function readCardOf(block, cwd, home) {
	if (block.parentCallId !== void 0 || !("kind" in block) || block.isError) return null;
	const parsed = parsedArgsOf(block);
	if (parsed?.name !== "read") return null;
	const { file_path: path, offset, limit } = parsed.args;
	if (typeof path !== "string" || path.trim() === "") return null;
	if (offset !== void 0 && (typeof offset !== "number" || !Number.isInteger(offset) || offset < 1)) return null;
	if (limit !== void 0 && (typeof limit !== "number" || !Number.isInteger(limit) || limit < 1)) return null;
	const meta = readMeta(block.meta);
	if (meta === null) return null;
	const text = singleResultText(block);
	if (text === void 0) return null;
	if (/^<path>[^\n]*<\/path>\n<type>file<\/type>\n<content>\n([\s\S]*)\n<\/content>$/u.exec(text)?.[1] === void 0) return null;
	return {
		label: abbreviateHomePath(relativizeToCwd(meta.path, cwd), home),
		lines: meta.lines,
		totalLines: meta.totalLines,
		lang: meta.lang
	};
}
function readMeta(meta) {
	if (typeof meta !== "object" || meta === null || Array.isArray(meta)) return null;
	const { path, offset, lines, totalLines, lang } = meta;
	if (typeof path !== "string" || typeof offset !== "number" || !Number.isInteger(offset) || offset < 1) return null;
	if (typeof totalLines !== "number" || !Number.isInteger(totalLines) || totalLines < 0 || !Array.isArray(lines)) return null;
	if (lang !== void 0 && typeof lang !== "string") return null;
	const narrowed = [];
	let previous = offset - 1;
	for (const line of lines) {
		if (typeof line !== "object" || line === null || Array.isArray(line)) return null;
		const { number, text } = line;
		if (typeof number !== "number" || !Number.isInteger(number) || number < 1 || number <= previous) return null;
		if (number > totalLines || typeof text !== "string") return null;
		previous = number;
		narrowed.push({
			number,
			text
		});
	}
	return {
		path,
		lines: narrowed,
		totalLines,
		...lang === void 0 ? {} : { lang }
	};
}
function isValidFiles(files) {
	return Array.isArray(files) && files.every((file) => typeof file === "object" && file !== null && typeof file.path === "string" && Array.isArray(file.matches) && file.matches.every((match) => typeof match === "object" && match !== null && typeof match.lineNumber === "number" && typeof match.line === "string"));
}
function flattenContent(content) {
	const text = content.filter((block) => block.type === "text" && typeof block.text === "string").map((block) => block.text).join("\n");
	return text === "" ? void 0 : text;
}
/** Search-card derivation, or null when this call is not a search card (mirrors ui-tool). */
function searchCardOf(block) {
	if (block.parentCallId !== void 0 || !("kind" in block) || block.isError) return null;
	const parsed = parsedArgsOf(block);
	if (parsed === null || parsed.name !== "grep" && parsed.name !== "glob") return null;
	const { pattern, path } = parsed.args;
	if (typeof pattern !== "string") return null;
	if (parsed.name === "grep" && pattern === "") return null;
	if (parsed.name === "glob" && pattern.trim() === "") return null;
	if (path !== void 0 && (typeof path !== "string" || path.trim() === "")) return null;
	if (parsed.name === "grep") {
		const include = parsed.args.include;
		if (include !== void 0 && typeof include !== "string") return null;
	}
	if (typeof block.meta !== "object" || block.meta === null || Array.isArray(block.meta)) return null;
	const meta = block.meta;
	if (typeof meta.truncated !== "boolean") return null;
	if (typeof meta.total !== "number" || !Number.isInteger(meta.total) || meta.total < 0) return null;
	const common = {
		truncated: meta.truncated,
		total: meta.total
	};
	const recovery = meta.truncated ? flattenContent(block.content) : void 0;
	if (meta.shape === "matches") {
		if (!isValidFiles(meta.files)) return null;
		return {
			recovery,
			card: {
				kind: "matches",
				files: meta.files,
				...common
			}
		};
	}
	if (meta.shape !== "paths") return null;
	if (!Array.isArray(meta.paths) || !meta.paths.every((path$1) => typeof path$1 === "string")) return null;
	return {
		recovery,
		card: {
			kind: "paths",
			paths: meta.paths,
			...common
		}
	};
}
/** Narrow a result metadata `diffs` to well-formed hunks (mirrors ui-tool). */
function narrowDiffs(diffs) {
	if (!Array.isArray(diffs) || diffs.length === 0) return null;
	const out = [];
	for (const hunk of diffs) {
		if (typeof hunk !== "object" || hunk === null) return null;
		const { path, oldText, newText } = hunk;
		if (typeof path !== "string") return null;
		if (oldText !== null && typeof oldText !== "string") return null;
		if (typeof newText !== "string") return null;
		out.push({
			path,
			oldText,
			newText
		});
	}
	return out;
}
function intendedDiff(block) {
	const parsed = parsedArgsOf(block);
	if (parsed === null) return null;
	if (parsed.name === "str_replace_editor") {
		const { command, path: path$1, file_text: fileText, old_str: oldText$1, new_str: newText$1 } = parsed.args;
		if (typeof path$1 !== "string" || path$1.trim() === "") return null;
		if (command === "create") {
			if (fileText !== void 0 && typeof fileText !== "string") return null;
			return {
				tool: "str_replace_editor",
				diff: {
					path: path$1,
					oldText: null,
					newText: fileText ?? ""
				}
			};
		}
		if (command === "str_replace") {
			if (oldText$1 !== void 0 && typeof oldText$1 !== "string") return null;
			if (newText$1 !== void 0 && typeof newText$1 !== "string") return null;
			return {
				tool: "str_replace_editor",
				diff: {
					path: path$1,
					oldText: oldText$1 ?? null,
					newText: newText$1 ?? ""
				}
			};
		}
		return null;
	}
	const { file_path: path } = parsed.args;
	if (typeof path !== "string" || path.trim() === "") return null;
	if (parsed.name === "write") {
		const { content } = parsed.args;
		return typeof content === "string" ? {
			tool: "write",
			diff: {
				path,
				oldText: null,
				newText: content
			}
		} : null;
	}
	if (parsed.name !== "edit") return null;
	const { old_string: oldText, new_string: newText, replace_all: replaceAll } = parsed.args;
	if (typeof oldText !== "string" || typeof newText !== "string") return null;
	if (replaceAll !== void 0 && typeof replaceAll !== "boolean") return null;
	return {
		tool: "edit",
		diff: {
			path,
			oldText: oldText || null,
			newText
		}
	};
}
function appliedDiffs(meta) {
	if (typeof meta !== "object" || meta === null || Array.isArray(meta)) return null;
	const diffs = meta.diffs;
	if (!Array.isArray(diffs)) return null;
	if (diffs.length === 0) return "empty";
	return narrowDiffs(diffs);
}
/** Diff-card derivation, or null when this call is not a diff card (mirrors ui-tool). */
function diffCardOf(block) {
	if (block.parentCallId !== void 0) return null;
	const intended = intendedDiff(block);
	if (intended === null) return null;
	if (!("kind" in block)) return { card: { diffs: [intended.diff] } };
	if (intended.tool === "str_replace_editor") return null;
	if (block.isError) return null;
	const applied = appliedDiffs(block.meta);
	if (applied === null || applied === "empty") return intended.tool === "write" ? { card: { diffs: [intended.diff] } } : null;
	return { card: { diffs: applied } };
}
function shellCallOf(name, args) {
	if (name !== "bash" && name !== "pwsh") return null;
	const { command, description, timeoutMs, workdir, run_in_background: background } = args;
	if (typeof command !== "string" || command.trim() === "") return null;
	if (timeoutMs !== void 0 && (typeof timeoutMs !== "number" || !Number.isFinite(timeoutMs) || timeoutMs <= 0)) return null;
	if (workdir !== void 0 && typeof workdir !== "string") return null;
	if (background !== void 0 && typeof background !== "boolean") return null;
	if (description === void 0) return {
		command,
		description: void 0,
		workdir: void 0,
		persistent: true,
		background: false
	};
	if (typeof description !== "string" || description.trim() === "") return null;
	return {
		command,
		description,
		workdir,
		persistent: false,
		background: background === true
	};
}
/**
* Parse the result text's trailing exit-status marker (mirrors the shell
* renderer's literal contract without importing that Host-only package).
* @param text - rendered shell result text.
* @returns output with a trailing exit-code or signal marker extracted.
*/
function parseExitStatus(text) {
	const signal = /\n\[killed by signal: ([^\]\n]+)\]$/.exec(text);
	if (signal?.[1] !== void 0) return {
		output: text.slice(0, signal.index),
		signal: signal[1]
	};
	const exit = /\n\[exit code: (\d+)\]$/.exec(text);
	if (exit?.[1] !== void 0) return {
		output: text.slice(0, exit.index),
		exitCode: Number(exit[1])
	};
	return {
		output: text,
		exitCode: 0
	};
}
/**
* Collapse `.` and `..` segments so the prompt label names the directory the
* command actually ran in (local mirror of ui-tool's terminal normalization).
* @param path - a joined or absolute path, possibly carrying `.`/`..` segments.
* @returns the same path with those segments resolved.
*/
function normalizeSegments(path) {
	if (!/(?:^|[/\\])\.\.?(?:[/\\]|$)/.test(path)) return path;
	const separator = path.includes("\\") && !path.includes("/") ? "\\" : "/";
	const rooted = /^[/\\]/.test(path);
	const drive = /^[A-Za-z]:/.exec(path)?.[0] ?? "";
	const body = collapse(path.slice(drive.length), rooted || drive !== "", separator);
	const leading = rooted ? separator : "";
	return drive === "" ? `${leading}${body}` : `${drive}${rooted ? leading : separator}${body}`;
}
function collapse(body, rooted, separator = "/") {
	const kept = [];
	for (const segment of body.split(/[/\\]/)) {
		if (segment === "" || segment === ".") continue;
		if (segment === "..") {
			if (kept.length > 0 && kept[kept.length - 1] !== "..") kept.pop();
			else if (!rooted) kept.push(segment);
			continue;
		}
		kept.push(segment);
	}
	return kept.join(separator);
}
/**
* Resolve a shell call's workdir for display: an absolute path is used as-is,
* a relative one joins under the session workspace, and an omitted one IS the
* session workspace.
* @param workdir - the raw call's workdir, if any.
* @param sessionCwd - the session workspace root, if the caller knows it.
* @returns the working directory for the prompt label, or undefined.
*/
function resolveTerminalCwd(workdir, sessionCwd) {
	if (workdir === void 0 || workdir === "") return sessionCwd;
	if (sessionCwd === void 0 || sessionCwd === "") return normalizeSegments(workdir);
	return normalizeSegments(resolveWorkspacePath(sessionCwd, workdir));
}
/** Terminal-card derivation, or null when this call is not a terminal card (mirrors ui-tool). */
function terminalCardOf(block, sessionCwd) {
	if (block.parentCallId !== void 0) return null;
	const parsed = parsedArgsOf(block);
	if (parsed === null) return null;
	if (parsed.name !== "bash" && parsed.name !== "pwsh") return null;
	const call = shellCallOf(parsed.name, parsed.args);
	if (call === null || call.background) return null;
	const cwd = resolveTerminalCwd(call.workdir, sessionCwd);
	if (!("kind" in block)) return {
		description: call.description,
		card: {
			command: call.command,
			cwd,
			output: void 0,
			exitCode: void 0,
			signal: void 0,
			running: true
		}
	};
	if (block.isError || call.persistent) return null;
	const output = singleResultText(block);
	if (output === void 0) return null;
	const status = parseExitStatus(output);
	return {
		description: call.description,
		card: {
			command: call.command,
			cwd,
			output: status.output,
			exitCode: status.exitCode,
			signal: status.signal,
			running: false
		}
	};
}
/** Web-card derivation, or null when this call is not a web card (mirrors ui-tool). */
function webCardOf(block) {
	if (block.parentCallId !== void 0 || !("kind" in block) || block.isError) return null;
	const parsed = parsedArgsOf(block);
	if (parsed === null) return null;
	if (parsed.name === "web_search") {
		const { queries } = parsed.args;
		if (!Array.isArray(queries) || queries.length === 0) return null;
		if (!queries.every((query) => typeof query === "string" && query.trim() !== "")) return null;
	} else if (parsed.name === "web_fetch") {
		const { url } = parsed.args;
		if (typeof url !== "string" || url.trim() === "") return null;
	} else return null;
	if (typeof block.meta !== "object" || block.meta === null || Array.isArray(block.meta)) return null;
	const meta = block.meta;
	if (typeof meta.truncated !== "boolean") return null;
	if (parsed.name === "web_search") {
		const sources = webSources(meta.sources);
		if (sources === null || meta.answer !== void 0 && typeof meta.answer !== "string") return null;
		return {
			kind: "search",
			answer: meta.answer,
			sources,
			truncated: meta.truncated
		};
	}
	if (typeof meta.url !== "string") return null;
	if (typeof meta.statusCode !== "number" || !Number.isInteger(meta.statusCode)) return null;
	return {
		kind: "fetch",
		url: meta.url,
		statusCode: meta.statusCode,
		truncated: meta.truncated
	};
}
function webSources(value) {
	if (!Array.isArray(value)) return null;
	const sources = [];
	for (const source of value) {
		if (typeof source !== "object" || source === null) return null;
		const { url, title, snippet, publishedAt } = source;
		if (typeof url !== "string") return null;
		if (title !== void 0 && typeof title !== "string") return null;
		if (snippet !== void 0 && typeof snippet !== "string") return null;
		if (publishedAt !== void 0 && typeof publishedAt !== "string") return null;
		sources.push({
			url,
			...title === void 0 ? {} : { title },
			...snippet === void 0 ? {} : { snippet },
			...publishedAt === void 0 ? {} : { publishedAt }
		});
	}
	return sources;
}

//#endregion
//#region src/client/merge-run.ts
/** Tool-call node kind registered by ui-chat's built-in tool definition. */
const TOOL_CALL_KIND = "tool-call";
/** Extract a root call block from any chat node, when it is a tool-call node. */
function toolRootOf(node) {
	if (node.kind !== TOOL_CALL_KIND) return null;
	const root = node.data.root;
	return typeof root === "object" && root !== null ? root : null;
}
/** The wire tool name of a call in either lifecycle form (mirrors ui-tool). */
function callNameOf(block) {
	return "kind" in block ? block.call?.name ?? "" : block.name;
}
/** Whether the call's wire name is one of the grouped tools (empty = all). */
function isGroupedTool(name, tools) {
	return tools.length === 0 || tools.includes(name);
}
/** Step identity of a node's location; undefined when the node is not step-bound. */
function stepIdOf(node) {
	const location = node.location;
	return location.kind === "step" ? `${location.turn.turn}:${location.step.step}` : void 0;
}
/**
* Compute the merged group this call belongs to.
*
* 1. Locates this call's node in the chat order; null when it is not a chat
*    tool-call node (e.g. a read dispatched as a subcall). The node key
*    format stays a ui-conversation internal, so the seat finds itself by
*    scanning the store for the tool-call node owning its call id instead of
*    recomputing the key.
* 2. Walks backward/forward to the maximal consecutive run containing it. A
*    call continues the run when it is a grouped tool AND same-tool-same-run:
*    the identical wire name, or a sibling of the same known variant family
*    (grep+glob, bash+pwsh, read+web_fetch…). Unknown names (variant
*    `others`) only merge with themselves, so unrelated tools never share a
*    card (`adjacent`: any consecutive run; `step`: same agent step as this
*    call).
* 3. Partitions the run into `maxGroupSize`-sized groups; this call is the
*    group's first only when it heads one of those partitions. Truncation
*    therefore never orphans a call: the excess starts its own group.
*
* @param order - chat node key order.
* @param nodes - chat node store.
* @param myCallId - the call id of the seat asking about itself.
* @param tools - grouped wire tool names; empty means every tool.
* @param groupBy - grouping mode.
* @param maxGroupSize - per-group cap.
* @returns the group partition, or null when the call is not a chat tool-call node.
*/
function readRun(order, nodes, myCallId, tools, groupBy, maxGroupSize) {
	const myIndex = myIndexOf(order, nodes, myCallId);
	if (myIndex < 0) return null;
	const myRoot = rootAtNode(order, nodes, myIndex);
	if (myRoot === null) return null;
	const myName = callNameOf(myRoot);
	const myVariant = classifyTool(myName);
	const size = Math.max(1, maxGroupSize);
	const rootAt = (index) => rootAtNode(order, nodes, index);
	const myStep = groupBy === "step" ? stepIdOfNodeAt(order, nodes, myIndex) : void 0;
	const inGroup = (index) => {
		const root = rootAt(index);
		if (root === null || !isGroupedTool(callNameOf(root), tools)) return false;
		const name = callNameOf(root);
		if (name !== myName) {
			if (myVariant === "others" || classifyTool(name) !== myVariant) return false;
		}
		if (groupBy !== "step") return true;
		return myStep !== void 0 && stepIdOfNodeAt(order, nodes, index) === myStep;
	};
	let start = myIndex;
	while (start > 0 && inGroup(start - 1)) start--;
	let end = myIndex;
	while (end < order.length - 1 && inGroup(end + 1)) end++;
	const groupStart = start + Math.floor((myIndex - start) / size) * size;
	const groupEnd = Math.min(groupStart + size, end + 1);
	const blocks = [];
	for (let index = groupStart; index < groupEnd; index++) {
		const root = rootAt(index);
		if (root !== null) blocks.push(root);
	}
	return {
		isFirst: myIndex === groupStart,
		blocks
	};
}
/** Index in the chat order of the tool-call node owning `callId`; -1 when absent. */
function myIndexOf(order, nodes, callId) {
	for (let index = 0; index < order.length; index++) {
		const key = order[index];
		if (key === void 0) continue;
		const node = nodes.get(key);
		if (node?.kind !== TOOL_CALL_KIND) continue;
		if (toolRootOf(node)?.callId === callId) return index;
	}
	return -1;
}
function rootAtNode(order, nodes, index) {
	const key = order[index];
	const node = key === void 0 ? void 0 : nodes.get(key);
	return node === void 0 ? null : toolRootOf(node);
}
function stepIdOfNodeAt(order, nodes, index) {
	const key = order[index];
	const node = key === void 0 ? void 0 : nodes.get(key);
	return node === void 0 ? void 0 : stepIdOf(node);
}

//#endregion
//#region src/client/rows.tsx
/** Chat rows show a capped card; the details panel stays the full-height surface. */
const CHAT_READ_MAX_LINES = 8;
const CHAT_SEARCH_MAX_LINES = 8;
const CHAT_DIFF_MAX_LINES = 8;
/** Variant leading icons (figma table); all glyphs render at 14 inside the 16px leading box. */
const VARIANT_ICONS = {
	search: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, { size: 14 }),
	read: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconBrowseOutline16, { size: 14 }),
	bash: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconApiOutline14, { size: 14 }),
	write: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconEditOutline16, { size: 14 }),
	edit: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconEditOutline16, { size: 14 }),
	code: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, { size: 14 }),
	others: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.IconSparkle16, { size: 14 })
};
/**
* Per-variant locale key for the merged-count summary (`{n} Files`, `{n}
* Commands`, …). Replaces the first call's file path on the main row when the
* run merges more than one call, so the main row reads `Read · 5 Files` and
* the file paths move to the collapsed child rows.
*/
const VARIANT_COUNT_KEY = {
	read: "countFiles",
	write: "countFiles",
	edit: "countFiles",
	search: "countQueries",
	bash: "countCommands",
	code: "countPrograms",
	others: "countCalls"
};
/** Leading-slot state substitution, mirroring the shipped row. */
function leadingFor(state, icon) {
	switch (state) {
		case "error": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.StateDot, { state: "error" });
		case "stopped": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.StateDot, { state: "warning" });
		default: return icon;
	}
}
/** Visually hidden run-state label (the StateDot and sweep are colour-only). */
function stateStatus(state, t) {
	switch (state) {
		case "running": return t("running");
		case "error": return t("failed");
		case "stopped": return t("stopped");
		default: return null;
	}
}
/** TerminalBlock display copy from the plugin's own dictionary. */
function terminalLabels(t) {
	return {
		signal: (signal) => t("terminal.signal", { signal }),
		exitCode: (code) => t("terminal.exitCode", { code }),
		running: t("terminal.running"),
		failed: t("terminal.failed"),
		done: t("terminal.done"),
		copy: t("terminal.copy"),
		copied: t("terminal.copied"),
		noOutput: t("terminal.noOutput"),
		collapseAria: t("terminal.collapseAria"),
		collapse: t("terminal.collapse"),
		expandAria: (hidden) => t("terminal.expandAria", { n: hidden }),
		expand: (hidden) => t("terminal.expandRest", { n: hidden })
	};
}
/** ReadBlock display copy from the plugin's own dictionary. */
function readLabels(t) {
	return {
		window: (shown, total) => t("read.window", {
			shown,
			total
		}),
		copy: t("copy"),
		copied: t("copied"),
		collapseAria: t("read.collapseAria"),
		expandAria: (count) => t("read.expandAria", { count }),
		collapse: t("collapse"),
		expand: (count) => t("read.expandRest", { count })
	};
}
/** SearchBlock display copy from the plugin's own dictionary. */
function searchLabels(t) {
	return {
		pathsSummary: (shown, total, truncated) => t(truncated ? "search.paths.truncated" : "search.paths", {
			shown,
			total
		}),
		matchesSummary: (shown, total, files, truncated) => t(truncated ? "search.matches.truncated" : "search.matches", {
			shown,
			total,
			files
		}),
		copy: t("copy"),
		copied: t("copied"),
		noResults: t("search.noResults"),
		collapseAria: t("search.collapseAria"),
		expandAria: (count) => t("search.expandAria", { count }),
		collapse: t("collapse"),
		expand: (count) => t("search.expandRest", { count })
	};
}
/** DiffBlock display copy from the plugin's own dictionary. */
function diffLabels(t) {
	return {
		copy: t("copy"),
		copied: t("copied"),
		collapseAria: t("diff.collapseAria"),
		expandAria: (count) => t("diff.expandAria", { count }),
		collapse: t("collapse"),
		expand: (count) => t("diff.expandRest", { count }),
		files: (count) => t("diff.files", { count })
	};
}
/** WebBlock display copy from the plugin's own dictionary. */
function webLabels(t) {
	return {
		noResults: t("web.noResults"),
		sourcesTruncated: t("web.sourcesTruncated"),
		http: t("web.http"),
		contentTruncated: t("web.contentTruncated"),
		markdown: {
			code: {
				copyLabel: t("copy"),
				copiedLabel: t("copied")
			},
			footnotes: t("markdown.footnotes")
		}
	};
}
/** One call's expanded-body card, mirroring the built-in ToolRow body. */
function CardBody({ model, home, t }) {
	if (model.terminal !== null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.TerminalBlock, {
		...model.terminal.card,
		home,
		maxLines: Infinity,
		labels: terminalLabels(t)
	});
	if (model.diff !== null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.DiffBlock, {
		...model.diff.card,
		labels: diffLabels(t),
		maxLines: CHAT_DIFF_MAX_LINES
	});
	if (model.read !== null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.ReadBlock, {
		...model.read,
		labels: readLabels(t),
		maxLines: CHAT_READ_MAX_LINES
	});
	if (model.search !== null) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.SearchBlock, {
		...model.search.card,
		labels: searchLabels(t),
		maxLines: CHAT_SEARCH_MAX_LINES
	}), model.search.recovery !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "mtc-recovery",
		children: model.search.recovery
	})] });
	if (model.web !== null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.WebBlock, {
		...model.web,
		labels: webLabels(t)
	});
	const hasBody = model.body !== null;
	const hasOutput = model.output !== null;
	if (!hasBody && !hasOutput) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "mtc-io-card",
		children: [
			hasBody && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "mtc-io-section",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-io-label",
					children: "IN"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-io-text",
					children: model.body
				})]
			}),
			hasBody && hasOutput && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "mtc-io-divider",
				"aria-hidden": true
			}),
			hasOutput && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "mtc-io-section",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-io-label",
					children: "OUT"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-io-text",
					"data-error": model.state === "error" || void 0,
					children: model.output
				})]
			})
		]
	});
}
/**
* The run's main card: the first call's chrome (variant title/icon + state)
* plus, for a single call, its expandable content card. For a merged run the
* main row's collapsed summary is the count (`Read · 5 Files`) and the
* expanded body is the child-rows block (passed in as `children`); the first
* call is rendered as the first child row so every file path lands on a child
* row, never on the main row.
*/
const RowCard = (0, react.memo)(function RowCard$1({ toolName, block, cwd, home, openFile, inspect, t, mergedCount, children }) {
	const model = callRowModel(toolName, block, cwd, home);
	const [expanded, setExpanded] = (0, react.useState)(false);
	const hasChildren = mergedCount > 0;
	const expandable = model.expandable || hasChildren;
	const open = expanded && expandable;
	const status = stateStatus(model.state, t);
	const failureLine = model.state === "error" ? model.errorSummary ?? null : null;
	const summaryText = hasChildren && failureLine === null ? t(VARIANT_COUNT_KEY[model.variant], { n: String(mergedCount + 1) }) : failureLine ?? model.summary;
	const fileLink = !hasChildren && model.filePath !== void 0 && openFile !== void 0 && failureLine === null;
	const openFileClick = (event) => {
		event.stopPropagation();
		if (model.filePath !== void 0) openFile(model.filePath);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "mtc-row",
		"data-state": model.state,
		"data-variant": model.variant,
		"data-merged": hasChildren || void 0,
		children: [
			status !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "mtc-visually-hidden",
				children: status
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
				rowClassName: "mtc-title-row",
				titleClassName: "mtc-title",
				leadingClassName: "mtc-leading",
				chevronClassName: "mtc-chevron",
				icon: leadingFor(model.state, VARIANT_ICONS[model.variant]),
				title: model.title,
				open,
				expandable,
				expandOnRowClick: true,
				keepContentWhenOpen: true,
				onToggle: () => {
					setExpanded((value) => !value);
				},
				collapsedContent: summaryText !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-sep",
					"aria-hidden": true
				}), fileLink ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mtc-summary-link",
					onClick: openFileClick,
					children: summaryText
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-summary",
					children: summaryText
				})] }),
				children: !hasChildren && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "mtc-card-body",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBody, {
						model,
						home,
						t
					}), inspect !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mtc-inspect",
						onClick: inspect,
						children: "Inspect"
					})]
				})
			}),
			hasChildren && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "mtc-children-collapse",
				"data-open": open || void 0,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "mtc-children",
					children
				})
			}),
			hasChildren && open && inspect !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mtc-inspect",
				onClick: inspect,
				children: "Inspect"
			})
		]
	});
});
/**
* One compact continuation row: the main row's tail structure ([sep dot][path]).
* An expandable call toggles the inline content card on click (mirroring the
* main row's whole-row disclosure); a read/write/edit-family path additionally
* renders as an open-file link (the sidebar preview) that stops propagation,
* exactly like the main row's summary link.
*/
const ChildRow = (0, react.memo)(function ChildRow$1({ toolName, block, cwd, home, openFile, t }) {
	const model = callRowModel(toolName, block, cwd, home);
	const [open, setOpen] = (0, react.useState)(false);
	const stateLabel = stateStatus(model.state, t);
	const expandable = model.expandable;
	const toggle = () => {
		setOpen((value) => !value);
	};
	const openFileClick = (event) => {
		event.stopPropagation();
		if (model.filePath !== void 0) openFile(model.filePath);
	};
	const onRowKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggle();
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "mtc-child",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: "mtc-child-row",
			"data-open": expandable && open || void 0,
			"data-static": expandable ? void 0 : true,
			role: expandable ? "button" : void 0,
			tabIndex: expandable ? 0 : void 0,
			"aria-expanded": expandable ? open : void 0,
			onClick: expandable ? toggle : void 0,
			onKeyDown: expandable ? onRowKeyDown : void 0,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-sep",
					"aria-hidden": true
				}),
				model.filePath !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mtc-child-path-link",
					onClick: openFileClick,
					children: model.summary
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-child-path",
					children: model.summary
				}),
				stateLabel !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mtc-child-state",
					"data-error": model.state === "error" || void 0,
					children: stateLabel
				})
			]
		}), expandable && open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "mtc-child-body",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBody, {
				model,
				home,
				t
			})
		})]
	});
});
/**
* The shadowed toolview: renders the merged run card for the run's first call,
* nothing for continuation calls, and a plain single row when this call is not
* a chat tool-call node.
*
* Child-row alignment is measured at runtime, not hardcoded: the main row's
* separator dot sits after a variable-width title ("Read"/"Search"/"Bash"/…),
* so its column depends on the rendered font. A layout effect measures the
* dot's offset from the card root (once, plus on reflow via ResizeObserver)
* and indents the children so their dots and paths land on the main row's
* columns — no font/title constants to keep in sync.
*/
function MergedToolRow({ callId, toolName, block, cwd, home, openFile, inspect, t, cfg, useChat }) {
	const run = useChat((snapshot) => readRun(snapshot.order, snapshot.nodes, callId, cfg.tools, cfg.groupBy, cfg.maxGroupSize));
	const rootRef = (0, react.useRef)(null);
	/** Main separator dot's left offset from the card root; null before first measure. */
	const [sepLeft, setSepLeft] = (0, react.useState)(null);
	(0, react.useLayoutEffect)(() => {
		const root = rootRef.current;
		if (root === null) return;
		const sep = root.querySelector(".mtc-row .mtc-sep");
		if (sep === null) return;
		const measure = () => {
			setSepLeft(Math.round(sep.getBoundingClientRect().left - root.getBoundingClientRect().left));
		};
		measure();
		const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
		observer?.observe(root);
		return () => {
			observer?.disconnect();
		};
	}, [run === null ? null : run.blocks[0]?.callId ?? null]);
	if (run === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RowCard, {
		toolName,
		block,
		cwd,
		home,
		openFile,
		inspect,
		t,
		mergedCount: 0
	});
	if (!run.isFirst) return null;
	const hasChildren = run.blocks.length > 1;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: "mtc-root",
		"data-tool": toolName,
		ref: rootRef,
		style: sepLeft === null ? void 0 : { ["--mtc-sep-left"]: `${sepLeft}px` },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RowCard, {
			toolName,
			block: run.blocks[0] ?? block,
			cwd,
			home,
			openFile,
			inspect,
			t,
			mergedCount: run.blocks.length - 1,
			children: hasChildren && run.blocks.map((child) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChildRow, {
				toolName,
				block: child,
				cwd,
				home,
				openFile,
				t
			}, child.callId))
		})
	});
}

//#endregion
//#region src/client/styles.ts
/**
* One scoped stylesheet injected for the lifetime of the client activation.
*
* Two jobs:
*  1. The empty-seat collapse rule: the shadowed toolview renders `null` for
*     every non-first call of a merged run. The built-in `ToolCallTree` still
*     wraps that null in its `.callRow` div, and the renderer wraps every
*     toolview in an empty `<div data-slot="tool.call.toolview">` (display:
*     contents), so the seat's `.flowItem` is never `:empty` itself and the
*     built-in `.flowItem:empty { display:none }` rule does not fire. This
*     rule extends the same intent ("a renderer may decline its row") to a
*     tool seat whose toolview rendered nothing.
*  2. The plugin's own `.mtc-*` chrome for the merged card and its child rows.
*
* All colors come from the shared `--dsw-*` tokens (never literals).
*/
const CSS = `
/* A tool-call seat whose toolview declined to render (merged-run continuation
   calls) must not consume the flow column's gap. The empty toolview slot
   wrapper is the decline signal; the callRow around it always exists. */
[data-chat-flow-kind="tool-call"]:has([data-slot="tool.call.toolview"]:empty) { display: none; }

.mtc-root { display: flex; flex-direction: column; min-width: 0; }
.mtc-row { display: flex; flex-direction: column; min-width: 0; }
.mtc-row[data-state='running'] .mtc-title-row { position: relative; overflow: hidden; }
.mtc-row[data-state='running'] .mtc-title-row::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 300px;
  background: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--dsw-alias-bg-base) 60%, transparent) 55%, transparent 100%);
  animation: dsh-mtc-sweep 2.6s ease-out infinite;
  pointer-events: none;
}
@keyframes dsh-mtc-sweep {
  0% { left: -300px; }
  90%, 100% { left: 100%; }
}

.mtc-title { font-weight: 400; }
.mtc-sep { flex: none; width: 2px; height: 2px; border-radius: 1px; margin: 0 8px; background: var(--dsw-alias-label-caption); }
.mtc-summary {
  flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 14px; line-height: 24px; color: var(--dsw-alias-label-tertiary);
}
.mtc-summary-link {
  flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  margin: 0; padding: 0; border: none; background: none; font: inherit; text-align: left;
  font-size: 14px; line-height: 24px; color: var(--dsw-alias-label-secondary);
  text-decoration: underline; text-decoration-color: var(--dsw-alias-label-quaternary);
  text-underline-offset: 3px; cursor: pointer;
}
.mtc-summary-link:hover { color: var(--dsw-alias-label-primary); text-decoration-color: currentColor; }
.mtc-summary-error { color: var(--dsw-alias-state-error-primary); }
.mtc-summary-suffix { flex: none; margin-left: 4px; white-space: nowrap; font-size: 14px; line-height: 24px; color: var(--dsw-alias-label-tertiary); }

.mtc-card-body { margin: 4px 0 4px 4px; min-width: 0; }
.mtc-recovery { margin: 4px 0 4px 4px; white-space: pre-wrap; overflow-wrap: anywhere; font: var(--dsw-font-xs-13); color: var(--dsw-alias-label-tertiary); }
/* IN/OUT text card for calls without a card primitive (mirrors ToolRow). */
.mtc-io-card {
  display: flex; flex-direction: column; min-width: 0;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px;
  background: var(--dsw-alias-bg-base);
}
.mtc-io-section { display: flex; gap: 10px; padding: 8px 12px; min-width: 0; }
.mtc-io-label {
  flex: none; font-size: 11px; line-height: 16px; font-weight: 600;
  color: var(--dsw-alias-label-tertiary);
}
.mtc-io-text {
  flex: 1 1 auto; min-width: 0; white-space: pre-wrap; overflow-wrap: anywhere;
  font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary);
}
.mtc-io-text[data-error] { color: var(--dsw-alias-state-error-primary); }
.mtc-io-divider { height: 1px; background: var(--dsw-alias-border-l2); }
.mtc-inspect {
  display: inline-flex; align-self: flex-start; align-items: center; gap: 4px;
  margin: 4px 0 2px 4px; padding: 2px 8px;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 999px;
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-secondary);
  font-size: 11px; line-height: 16px; cursor: pointer;
  opacity: 0; transition: opacity 100ms ease;
}
.mtc-root:hover .mtc-inspect, .mtc-inspect:focus-visible { opacity: 1; }
.mtc-inspect:hover { background: var(--dsw-alias-interactive-bg-hover-solid); color: var(--dsw-alias-label-primary); }

/* Compact child rows: each is the main row's tail structure — [sep dot][path].
   The dot/path column is set at runtime by the component (it measures the
   main row's sep offset and sets the --mtc-sep-left custom property on the
   root); this is only the pre-measure fallback.

   The .mtc-children-collapse wrapper animates the block's height with a
   grid-template-rows 0fr↔1fr transition (children stay in the DOM while
   collapsing, so the slide is smooth instead of popping out). The vertical
   margin lives on the wrapper (not .mtc-children) so it doesn't leak past the
   0fr row when collapsed.

   The sep-left indent lives on .mtc-child-row (not .mtc-children) so the
   expanded .mtc-child-body can align back to the root's left edge via a plain
   4px margin. When the indent was on .mtc-children + a negative-margin
   pull-back on .mtc-child-body, the body's left portion was clipped by
   .mtc-children's overflow:hidden (which is required for the grid collapse
   animation). */
.mtc-children-collapse {
  display: grid;
  grid-template-rows: 0fr;
  margin: 0;
  transition: grid-template-rows 200ms ease-out, margin 200ms ease-out;
}
.mtc-children-collapse[data-open] {
  grid-template-rows: 1fr;
  margin: 2px 0;
}
.mtc-children {
  display: flex; flex-direction: column; gap: 1px;
  margin: 0;
  min-width: 0; min-height: 0; overflow: hidden;
  opacity: 0;
  transition: opacity 150ms ease-out;
}
.mtc-children-collapse[data-open] .mtc-children {
  opacity: 1;
  transition: opacity 150ms ease-out 50ms;
}
.mtc-child { display: flex; flex-direction: column; min-width: 0; }
.mtc-child-row {
  display: flex; align-items: center; gap: 0; min-width: 0; height: 20px;
  margin: 0 0 0 var(--mtc-sep-left, 61px); padding: 0; border: 0; border-radius: 4px; background: none;
  font: inherit; text-align: left; color: var(--dsw-alias-label-secondary); cursor: pointer;
}
.mtc-child-row:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.mtc-child-row[data-static] { cursor: default; }
.mtc-child-row[data-static]:hover { background: none; color: var(--dsw-alias-label-secondary); }
.mtc-child-row .mtc-sep { margin: 0 8px 0 0; }
.mtc-child-path {
  flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 14px; line-height: 20px;
}
/* Read-family child paths are open-file links (sidebar preview), same affordance
   as the main row's summary link. */
.mtc-child-path-link {
  flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  margin: 0; padding: 0; border: none; background: none; font: inherit; text-align: left;
  font-size: 14px; line-height: 20px; color: var(--dsw-alias-label-secondary);
  text-decoration: underline; text-decoration-color: var(--dsw-alias-label-quaternary);
  text-underline-offset: 3px; cursor: pointer;
}
.mtc-child-path-link:hover { color: var(--dsw-alias-label-primary); text-decoration-color: currentColor; }
.mtc-child-state { flex: none; font-size: 11px; line-height: 16px; color: var(--dsw-alias-label-tertiary); }
.mtc-child-state[data-error] { color: var(--dsw-alias-state-error-primary); }
/* The expanded child card aligns to the main card body's column (root + 4px).
   No negative-margin pull-back is needed because .mtc-children no longer
   carries the sep-left indent — only .mtc-child-row does. */
.mtc-child-body { margin: 2px 0 2px 4px; min-width: 0; }

.mtc-visually-hidden {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap;
}
`;
/** Install the stylesheet and return its disposer. */
function installStyles() {
	const style = document.createElement("style");
	style.setAttribute("data-merge-tool-calls-style", "");
	style.textContent = CSS;
	document.head.appendChild(style);
	return () => {
		style.remove();
	};
}

//#endregion
//#region src/client/index.ts
/** Required services: the slot registry (toolview shadowing) and locale. */
const inject = ["slots", "locale"];
/**
* Register one shadowed toolview per grouped tool.
* @param ctx - client root context.
* @param config - row config; defaults apply when the loader passes none.
*/
function apply(ctx, config = {}) {
	const cfg = {
		...DEFAULT_MERGE_CONFIG,
		...config
	};
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "merge-tool-calls: dictionaries");
	ctx.effect(installStyles, "merge-tool-calls: styles");
	ctx.effect(() => {
		let dispose;
		const sync = () => {
			dispose?.();
			dispose = void 0;
			const store = ctx.get("betterLocale");
			if (store !== void 0) dispose = store.register(NS, dicts);
		};
		sync();
		const unsubscribe = ctx.locale.subscribe(sync);
		return () => {
			unsubscribe();
			dispose?.();
		};
	}, "merge-tool-calls: better-locale override dicts");
	const toolNames = cfg.tools.length === 0 ? ALL_TOOL_NAMES : [...new Set(cfg.tools)];
	for (const tool of toolNames) ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({
		name: "tool.call.toolview",
		key: tool,
		priority: -1,
		locale: NS,
		inject: () => ({ cfg })
	}, MergedToolRow));
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map