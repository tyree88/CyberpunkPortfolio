export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","fonts/font-loader.css","images/cyberpunk-bg-gradient.svg"]),
	mimeTypes: {".svg":"image/svg+xml",".css":"text/css"},
	_: {
		client: {start:"_app/immutable/entry/start.BGcLPIWg.js",app:"_app/immutable/entry/app.BYBc8HuM.js",imports:["_app/immutable/entry/start.BGcLPIWg.js","_app/immutable/chunks/za2WiF9E.js","_app/immutable/chunks/CttmvTml.js","_app/immutable/entry/app.BYBc8HuM.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CttmvTml.js","_app/immutable/chunks/D41oQucZ.js","_app/immutable/chunks/9SUMy7P2.js","_app/immutable/chunks/sJvjt_mF.js","_app/immutable/chunks/CRGuz1Sg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
