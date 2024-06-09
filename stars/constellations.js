const data = await fetch("./data/constellations.json").then((res) =>
	res.json(),
);

const splitLabels = (obj) => {
	const { abr, nr, ...rest } = obj;
	return {
		abr,
		nr,
		points: Object.values(rest).filter((x) => x),
	};
};

/**
 * @typedef {{abr: String, nr: String, points: number[]}} Constellation
 */
export const /**@type {Constellation[]}*/ constellations =
	data.map(splitLabels);
