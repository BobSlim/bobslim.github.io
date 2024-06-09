import { names as overrideNames } from "./names.js";
import { constellations } from "./data/constellations.js";

export const getData = async () => {
	const allStarData = await Promise.all([
		fetch("./data/bsc5p_radec.json").then((res) => res.json()),
		fetch("./data/bsc5p_spectral_extra.json").then((res) => res.json()),
		fetch("./data/bsc5p_names.json").then((res) => res.json()),
	]);
	const [stars, extra, names] = allStarData;
	const /**@type {StarData[]} */ returnVal = stars.map((x) => {
			const matchedExtra = extra.find((y) => {
				return y.i === x.i;
			});
			let overrideName = overrideNames[x.i];
			if (!overrideName) {
				const matchedNames = names.find((y) => {
					return y.i === x.i;
				});
				const foundName = matchedNames.n.filter((x) =>
					x.startsWith("NAME"),
				);
				overrideName = foundName
					.map((x) => x.split(" ").slice(1).join(" "))
					.join("/ ");
			}
			const returnedPoint = {
				...matchedExtra,
				...x,
				commonName: overrideName,
			};
			return returnedPoint;
		});
	return returnVal;
};

export const getStarInfo = (/**@type {StarData[]}*/ stars) => {
	const STAR_DECLINATION = stars
		.map((x) => x.d)
		.filter((x) => !Number.isNaN(x));
	const STAR_ASCENSION = stars
		.map((x) => x.r)
		.filter((x) => !Number.isNaN(x));
	const STAR_LUMINOSITY = stars.map((x) => x.N).sort((a, b) => b - a);
	return {
		max_d: Math.max(...STAR_DECLINATION),
		min_d: Math.min(...STAR_DECLINATION),
		max_r: Math.max(...STAR_ASCENSION),
		min_r: Math.min(...STAR_ASCENSION),
		max_N: Math.max(...STAR_LUMINOSITY),
		min_N: Math.min(...STAR_LUMINOSITY),
	};
};

const ascensionToPercent = ({ r }) => (r / (Math.PI * 2)) * 400;
const declinationToPercent = ({ d }) => d * (50 / (Math.PI / 2)) + 50;
export const getStarCoords = (star) => {
	return {
		x: ascensionToPercent(star),
		y: declinationToPercent(star),
	};
};

export const renderStar = (/**@type {StarData}*/ star) => {
	const el = document.createElement("div");
	el.classList.add("star");
	const { x, y } = getStarCoords(star);
	el.style.left = `${x}%`;
	el.style.top = `${y}%`;
	el.dataset.i = star.i;
	el.dataset.n = star.n;
	el.style.outlineWidth = `${6 - Math.floor(star.b)}px`;
	el.style.outlineStyle = "solid";
	el.innerText = star.commonName || star.i;
	if (star.b < 2) {
		el.classList.add("star--bright");
	}
	const kToRgb = (k) => `rgb(${k.r * 255}, ${k.g * 255}, ${k.b * 255})`;
	const kToRgba = (k, a) =>
		`rgba(${k.r * 255}, ${k.g * 255}, ${k.b * 255}, ${a})`;
	let rgb;
	if (star.K) {
		rgb = kToRgb(star.K);
		el.style.backgroundColor = rgb;
		el.style.outlineColor = kToRgba(star.K, 0.5) ?? "";
	}
	return el;
};

const getStarById = (/**@type {StarData[]}*/ stars) => (i) =>
	stars.find((x) => x.i === i);
const getConstellationStarData =
	(/**@type {StarData[]}*/ stars) =>
	(
		/**@type {import("./constellations.js").Constellation[]}*/ constellations,
	) => {
		return constellations.map((x) => {
			return {
				...x,
				points: x.points.map(getStarById(stars)),
			};
		});
	};

export const constellar = await (async () => {
	const stars = await getData();
	return getConstellationStarData(stars)(constellations);
})();

/**
 * @typedef RGB
 * @prop {number} R
 * @prop {number} G
 * @prop {number} B
 */
/**
 * @typedef StarData
 * @prop {number} i ID
 * @prop {string} n name
 * @prop {number} p distance
 * @prop {number} r right ascension, radians
 * @prop {number} d declination, radians
 * @prop {RGB} K color, rgb
 * @prop {number} N luminosity
 * @prop {number} b apparent brightness
 */
