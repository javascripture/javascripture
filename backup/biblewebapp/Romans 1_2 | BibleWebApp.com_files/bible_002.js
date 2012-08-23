bible.versionLang = {};
bible.versionLang['en'] = { name: 'English' };
bible.versionLang['comm_en'] = { name: 'Commentaries/Notes' };
bible.versionLang['el'] = { name: 'Ελληνικά (Greek)' };
bible.versionLang['he'] = { name: 'עִברִית (Hebrew)' };
bible.versionLang['es'] = { name: 'Español', en:'Spanish' };
bible.versionLang['zh-TW'] = { name: '繁體中文 (Traditional)', en: 'Chinese (Traditional)' };
bible.versionLang['zh-CN'] = { name: '简体中文 (Simplified)', en: 'Chinese (Simplified)' };
bible.versionLang['ar'] = { name: 'العربية (Arabic)', en: 'Arabic' };
bible.versionLang['de'] = { name: 'Deutsch (German)', en: 'German' };
bible.versionLang['ru'] = { name: 'Pyccкий (Russian)', en: 'Russian' };
bible.versionLang['go'] = { name: 'Google', en: 'Google' };
bible.versionLang['co'] = { name: 'Coptic' };

bible.versions = {};
// ENGLISH
bible.versions['en_kjv'] = { name: 'King James Version †', abbr: 'KJV', copyright: 'King James Version 2003, <a href="http://www.crosswire.org/">Crosswire</a>', lang: 'en' };
bible.versions['en_nasb'] = { name: 'New American Standard Bible †', abbr: 'NASB', copyright: '<a href="http://www.lockman.org">New American Standard Bible</a><br/>Copyright &copy; 1960, 1962, 1963, 1968, 1971, 1972, 1973, 1975, 1977, 1995 by the Lockman Foundation.', lang: 'en' };
bible.versions['en_net'] = { name: 'New English Translation †', abbr: 'NET', copyright: '<a href="http://www.bible.org/">New English Translation</a><br />Copyright &copy; 1996 - 2007 by Biblical Studies Press, LLC', lang: 'en' };
bible.versions['en_abp'] = { name: 'Apostlic Bible Polyglot†', abbr: 'ABP', copyright: '<a href="http://http://apostolicbible.com/">Apostolic Bible Polyglot</a><br />Copyright 1996 by Charles Van der Pool. Download PDFs or purchase the printed edition at <a href="http://apostolicbible.com">apostolicbible.com</a>', lang: 'en' };

if (window.location.href.toString().indexOf("local") > -1) {
	bible.versions['en_esv'] = { name: 'English Standard Version', abbr: 'ESV', copyright: '<a href="http://www.esv.org/">English Standard Version</a><br/>Copyright © 2001 by Crossway Bibles, a division of Good News Publishers', lang: 'en' };
	bible.versions['en_goo'] = { name: 'GooVersion', abbr: 'GOO', copyright: 'Google <a href="http://translate.google.com/">Translate</a> Overlords', lang: 'en' };
}
console.log('oeb check', window.location.href.toString().indexOf('en_oeb'));
if (window.location.href.toString().indexOf('en_oeb') > -1 || window.location.href.toString().indexOf("local") > -1) {
	bible.versions['en_oeb'] = { name: 'Open English Bible', abbr: 'OEB', copyright: '<a href="http://www.openenglishbible.com/">Open English Bible</a> Draft Edition<br />Licensed under a <a href="http://creativecommons.org/licenses/by/3.0/us/">Creative Commons Attribution 3.0 United States License</a>.', lang: 'en' };
}

// NOTES
bible.versions['comm_en_net_notes'] = { name: 'NET Notes', abbr: 'NETNotes', copyright: '<a href="http://www.bible.org/">New English Translation</a><br />Copyright &copy; 1996 - 2007 by Biblical Studies Press, LLC', lang: 'comm_en' };
bible.versions['comm_en_mhc'] = { name: 'Matthew Henry Commentary', abbr: 'MHC', copyright: 'Crosswire', lang: 'comm_en' };
bible.versions['comm_en_scofield'] = { name: 'Scofield Reference Notes', abbr: 'SCO', copyright: 'Crosswire', lang: 'comm_en' };
// ARABIC
bible.versions['ar_svd'] = { name: 'Smith & Van Dyke', abbr: 'ASVD', copyright: 'Public Domain', lang: 'ar' };
// GREEK
bible.versions['el_tisch'] = { name: 'Tischendorf NT †', abbr: 'Tisch', copyright: 'Public domain', lang: 'el', error: 'he_wlc' };
bible.versions['el_wh'] = { name: 'Westcott/Hort, UBS4 variants †', abbr: 'GNTWH', copyright: 'The Westcott-Hort edition of 1881', lang: 'el', error: 'el_lxx' };
bible.versions['el_tr'] = { name: 'Textus Receptus (1550/1894) †', abbr: 'GNTTR', copyright: 'Stephens 1550, with variants of Scrivener 1894', lang: 'el', error: 'el_lxx' };
bible.versions['el_byz'] = { name: 'Byzantine/Majority Text (2000) †', abbr: 'GNTBYZ', copyright: 'Maurice A. Robinson and William G. Pierpont, 2000', lang: 'el', error: 'el_lxx' };
bible.versions['el_lxx'] = { name: 'Septuagint (LXX)', abbr: 'LXX', copyright: 'From Unbound Bible CCAT', lang: 'el', error: 'el_tisch' };
bible.versions['el_abp'] = { name: 'Apostlic Bible Polyglot', abbr: 'ABPGR', copyright: '<a href="http://http://apostolicbible.com/">Apostolic Bible Polyglot</a><br />Copyright 1996 by Charles Van der Pool. Download PDFs or purchase the printed edition at <a href="http://apostolicbible.com">apostolicbible.com</a>', lang: 'el', error: 'el_tisch' };

// HEBREW
bible.versions['he_wlc'] = { name: 'Westminster Leningradex Codex †', abbr: 'WLC', copyright: 'Public domain', lang: 'he', error: 'el_tisch' };
bible.versions['he_bhs'] = { name: 'Biblia Hebraica Stuttgartensia', abbr: 'BHS', copyright: 'CCAT (University of Pennsylvania)', lang: 'he', error: 'el_tisch' };
// OTHERS
bible.versions['es_rv'] = { name: 'Reina Valera', abbr: 'RV', copyright: 'Public Domain 1909', lang: 'es' };
bible.versions['de_lu1912'] = { name: 'Luther (1912)', abbr: 'LU1912', copyright: 'Public Domain 1912', lang: 'de' };
bible.versions['ru_syn'] = { name: 'Russian Synodal (1876)', abbr: 'RU-SYN', copyright: 'Public Domain', lang: 'ru' };
bible.versions['zhtw_ncv'] = { name: 'Chinese NCV (Traditional)', abbr: 'NCV-T', copyright: 'Public Domain', lang: 'zh-TW' };
bible.versions['zhtw_un'] = { name: 'Chinese Union (Traditional)', abbr: 'UN-T', copyright: 'Public Domain', lang: 'zh-TW' };
bible.versions['zhcn_ncv'] = { name: 'Chinese NCV (Simplifed)', abbr: 'NCV-S', copyright: 'Public Domain', lang: 'zh-CN' };
bible.versions['zhcn_un'] = { name: 'Chinese Union (Simplifed)', abbr: 'UN-S', copyright: 'Public Domain', lang: 'zh-CN' };
bible.versions['co_sah'] = { name: 'Sahidic Coptic', abbr: 'SAH', copyright: '<a href="http://www.sahidica.org">Sahidica</a> - A New Edition of the New Testament in Sahidic Coptic. Copyright (c)2000-2006 by J Warren Wells. All rights reserved.', lang: 'co' };