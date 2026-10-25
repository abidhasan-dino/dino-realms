DINO REALMS — CLOUDFLARE PAGES + D1 DATABASE

এই প্যাকেজে index.html, Pages Functions API এবং D1 schema আছে।

সংযুক্ত ফিচার (D1 bind + schema চালু করার পর):
- Browser localStorage autosave প্রতি ৫ সেকেন্ডে
- একই playerId দিয়ে Cloudflare D1-এ save sync/load
- Player profile-এর নাম/ID browser-এ রাখা হয়; বয়স সার্ভারে পাঠানো হয় না
- D1-এ visit event গণনা (প্রতি browser session-এ একবার)
- D1 leaderboard-এ score submit এবং top 100 fetch
- Owner endpoint ইচ্ছাকৃতভাবে badge দেয় না; নিরাপদ authentication/allowlist ছাড়া OWNER badge চালু করা হয়নি

DEPLOY STEPS:
1) ZIP extract করুন। GitHub repository-র root-এ index.html, schema.sql, wrangler.toml, _headers এবং functions/ রাখুন।
2) Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git; Framework preset None, build command ফাঁকা, build output directory . দিন।
3) Cloudflare D1-এ dino-realms-db নামে database তৈরি করুন। schema.sql-এর সব SQL D1 Console-এ চালান।
4) Pages project > Settings > Bindings > Add > D1 database: variable name অবশ্যই DB, তারপর dino-realms-db নির্বাচন করুন।
5) Save/Deploy বা redeploy করুন। Wrangler দিয়ে deploy করলে wrangler.toml-এ আসল database_id বসাতে হবে। Dashboard Git deploy-এর ক্ষেত্রে UI binding-ই ব্যবহার করুন।
6) Deploy শেষে /api/leaderboard খুলে দেখুন; D1 binding/schema ঠিক থাকলে JSON response আসবে।

গুরুত্বপূর্ণ সীমাবদ্ধতা ও নিরাপত্তা:
- Database সেটআপ না করা পর্যন্ত online save/leaderboard/visits কাজ করবে না; browser localStorage save চলবে।
- এই starter API playerId client থেকে নেয়, তাই এটি production-grade authentication নয়; কেউ অনুকরণ করতে পারে। Public launch-এর আগে Cloudflare Access বা proper authenticated login, rate limiting এবং server-side validation যোগ করুন।
- OWNER badge endpoint disabled থাকবে যতক্ষণ না verified login + server-side allowlist সেটআপ করা হয়। শুধু নাম দিয়ে owner যাচাই করা নিরাপদ নয়।
- visits টেবিলের count unique মানুষ নয়; session-এ পাঠানো visit event-এর সংখ্যা।
- বর্তমান গেম 2D canvas runner; পূর্ণ 3D open-world নয়।
