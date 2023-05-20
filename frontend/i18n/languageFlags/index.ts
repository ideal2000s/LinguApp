import _bulgaria from 'i18n/countryFlags/Bulgaria.svg';
import _denmark from 'i18n/countryFlags/Denmark.svg';
import _germany from 'i18n/countryFlags/Germany.svg';
import _unitedKingdom from 'i18n/countryFlags/United Kingdom.svg';
import _spain from 'i18n/countryFlags/Spain.svg';
import _france from 'i18n/countryFlags/France.svg';
import _italy from 'i18n/countryFlags/Italy.svg';
import _lithuania from 'i18n/countryFlags/Lithuania.svg';
import _latvia from 'i18n/countryFlags/Latvia.svg';
import _norway from 'i18n/countryFlags/Norway.svg';
import _netherlands from 'i18n/countryFlags/Netherlands.svg';
import _poland from 'i18n/countryFlags/Poland.svg';
import _portugal from 'i18n/countryFlags/Portugal.svg';
import _romania from 'i18n/countryFlags/Romania.svg';
import _russia from 'i18n/countryFlags/Russia.svg';
import _somalia from 'i18n/countryFlags/Somalia.svg'; //so
import _serbia from 'i18n/countryFlags/Serbia.svg'; //sr
import _sweden from 'i18n/countryFlags/Sweden.svg'; //sv
import _kenya from 'i18n/countryFlags/Kenya.svg'; //sw
import _turkey from 'i18n/countryFlags/Turkey.svg'; //tr
import _ukraine from 'i18n/countryFlags/Ukraine.svg'; //uk

const localeFlags = [
  ['bg', _bulgaria],
  ['da', _denmark],
  ['de', _germany],
  ['en', _unitedKingdom],
  ['es', _spain],
  ['fr', _france],
  ['it', _italy],
  ['lt', _lithuania],
  ['lv', _latvia],
  ['nb', _norway],
  ['nl', _netherlands],
  ['pl', _poland],
  ['pt', _portugal],
  ['ro', _romania],
  ['ru', _russia],
  ['so', _somalia],
  ['sr', _serbia],
  ['sv', _sweden],
  ['sw', _kenya],
  ['tr', _turkey],
  ['uk', _ukraine]
].reduce((acc, curr) => acc.set(curr[0], encodeURI(curr[1])), new Map<string, string>());

export default localeFlags;
