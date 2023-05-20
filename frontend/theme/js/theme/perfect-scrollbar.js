import PerfectScrollbar from "../../pages/assets/lib/perfect-scrollbar/perfect-scrollbar";
import utils from "./Utils";
import is from '../../libs/is';
/*-----------------------------------------------
|   Perfect Scrollbar
-----------------------------------------------*/
utils.$document.ready(() => {

  if(is.ie() || is.edge()){
    const scrollbars = document.querySelectorAll('.perfect-scrollbar');
    if(scrollbars.length){
      $.each(scrollbars, (item, value) => {
        const $this = $(value);
        const userOptions = $this.data('options');
        const options = $.extend({
          wheelPropagation: true,
          suppressScrollX : true,
          suppressScrollY: false,
        }, userOptions);
        
        const ps = new PerfectScrollbar(value, options);
        ps.update();
      });
    }
  }
});
