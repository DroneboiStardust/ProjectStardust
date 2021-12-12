var d = {
	head: {
		main: /(Player)?Vehicle;(\-)\d+~(\-)\d+;\d+\|\d+\|/,
		pos: s=>s.match(/(\-)\d+~(\-)\d+/)[0].split(`~`),
		r: s=>s.split(`;`)[2].match(/^\d+/)[0],
	},
	body: {
		main: s=>{
			let a = s.split(`:`);
			a.pop();
			return a;
		},
		name: 0,
		pos: a=>a[1].split(`~`),
		r: 2,
		p1: 3,
		cg: a=>{
			if(a[4]===`-1`)return null;
			let x = [];
			a[4].split(``).forEach(e=>x.push(parseInt(e)));
			return x;
		},
		control: 5,
		paint: 6,
		flip: 7,
	},
}

export function sto(s,sandbox){
	const head = s.match(d.head.main)[0];
	const parts = d.body.main(s.replace(head,``));
	const headPos = d.head.pos(head);
	
console.log(head,parts)

	var partArray = [];
	parts.forEach(e=>{
		const a = e.split(`;`);
		console.log(a)
		const pos = d.body.pos(a);
		partArray.push({
			name: a[0],
			x: parseInt(pos[0]),
			y: parseInt(pos[1]),
			r: parseInt(a[2]),
			p1: parseInt(a[3]),
			cg: d.body.cg(a),
			paint: parseInt(a[5]),
			control: parseInt(a[6]),
			flip: parseInt(a[7]),
		});
	});
	
	return {
		sandbox: sandbox ? true : false,
		x: parseInt(headPos[0]),
		y: parseInt(headPos[1]),
		r: parseInt(d.head.r(head)),
		parts: partArray,
	}
}

export function ots(o){
	var headName = `Vehicle`
	var partStr=``;
	o.parts.forEach(p=>{
		if(p.name===`Core`)headName=`PlayerVehicle`;
		partStr=+`${p.name};${p.x}~${p.y};${p.r};${p.p1};${p.cg.join(``)};${p.paint};${p.control};${p.flip}:`
	});
	return `${headName};${o.x}~${o.y};${o.r}|${o.parts.length}|${partStr.join(``)}`;
}
