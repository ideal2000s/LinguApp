const config = {
  isRTL: false,
  isFluid: false,
  isDark: false
};

const isChecked = key => JSON.parse(localStorage.getItem(key));
const isNull = key => (JSON.parse(localStorage.getItem(key)) === null);

isNull('isRTL') && localStorage.setItem('isRTL', config.isRTL);
isNull('isFluid') && localStorage.setItem('isFluid', config.isFluid);
isNull('isDark') && localStorage.setItem('isDark', config.isDark);

const isDark = isChecked('isDark');
const isRTL = isChecked('isRTL');
const isFluid = isChecked('isFluid');

$("#dark").prop('checked', isDark);
$("#rtl").prop('checked', isRTL);
$("#fluid").prop('checked', isFluid);

const storage = { isDark, isRTL, isFluid };

export default storage;