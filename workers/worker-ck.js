var javascripture={};javascripture.data={};javascripture.data.kjv={};javascripture.data.web={};javascripture.data.greek={};javascripture.data.hebrew={};javascripture.api={};importScripts("../data/kjvdwyer7.js");importScripts("../data/hebrew6.js");importScripts("../data/greek4.js");importScripts("../data/bible.js");importScripts("../data/strongsObjectWithFamilies.js");importScripts("../api/word.js");importScripts("../api/searchApi.js");importScripts("../api/reference.js");self.addEventListener("message",function(e){var t;e.data.task==="search"&&(t=javascripture.api.search.getReferences(e.data.parameters));e.data.task==="reference"&&(t=javascripture.api.reference.getThreeChapters(e.data.parameters));t&&self.postMessage({task:e.data.task,parameters:e.data.parameters,result:t})},!1);