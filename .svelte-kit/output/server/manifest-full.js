export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","fonts/font-loader.css","images/cyberpunk-bg-gradient.svg","images/cyberware/Ultimate Upscale Raw.svg","images/cyberware/body-silhouette.svg","images/cyberware/cyber-grid.svg","images/cyberware/scan-frame.svg","images/cyberware/ultimate-upscale-raw.jpg","images/cyberware/x-ray-body.gif","images/cyberware/x-ray-body.jpg"]),
	mimeTypes: {".svg":"image/svg+xml",".css":"text/css",".jpg":"image/jpeg",".gif":"image/gif"},
	_: {
		client: {start:"_app/immutable/entry/start.BqqkDe0m.js",app:"_app/immutable/entry/app.KF2fDScG.js",imports:["_app/immutable/entry/start.BqqkDe0m.js","_app/immutable/chunks/C-LRRRRK.js","_app/immutable/chunks/DXGxV7KH.js","_app/immutable/entry/app.KF2fDScG.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DXGxV7KH.js","_app/immutable/chunks/dsJHhbWx.js","_app/immutable/chunks/DSY1Qbj5.js","_app/immutable/chunks/B_foRMtK.js","_app/immutable/chunks/CcpB7xR6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/my-life",
				pattern: /^\/my-life\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
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
