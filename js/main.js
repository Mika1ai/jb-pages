$(document).ready(function () {
   //slider btns blocker
   (function () {
      const sliderControls = document.querySelectorAll('.slider-control');
      const btnBlockers = document.querySelectorAll('.btn-blocker');
      const secondaryControl = document.querySelector('.featured-in__next-btn--hidden') || false;
      sliderControls.forEach(btn => {
         btn.addEventListener('click', () => {
            btnBlockers.forEach(blocker => {
               blocker.style.display = 'block';
               if (secondaryControl) {
                  secondaryControl.style.display = 'none';
                  setTimeout(() => {
                     secondaryControl.style.display = 'block';
                  }, +secondaryControl.getAttribute('data-duration'))
               }
               setTimeout(() => {
                  blocker.style.display = 'none';
               }, +blocker.getAttribute('data-duration'))
            })
         })
      })
   }());
   (function () {
      const menu = document.querySelector('.w-nav[data-collapse="all"] .w-nav-menu');
      menu.style.display = 'block';
      const links = document.querySelectorAll('.menu__link');
      links.forEach(link => {
         link.style.minWidth = getComputedStyle(link).width;
      })
      menu.style.display = 'none';
   }());

   setMinSizes();
   window.addEventListener('resize', function () {
      setMinSizes();
      // filterMenuToggler();
   });

   function setMinSizes() {
      const links = document.querySelectorAll('.hor-nav__link, .vendors-type__slide_link, .card__link');
      if (links.length > 0) {
         links.forEach(link => {
            link.style.minWidth = 'unset';
            link.style.minHeight = 'unset';
            link.style.minWidth = getComputedStyle(link).width;
            link.style.minHeight = getComputedStyle(link).height;
         })
      }
   }

   $(".input--date").focus(function () {
      $(this).attr("type", "date");
   });

   $(".input--date").blur(function () {
      $(this).attr("type", "text");
   });

   $('.nav-link[data-preloader="true"], .sec3-link-wrp, .footer__logo, .menu__link, .brand').click(function () {
      $('.hidden-link').get(0).click()
      var link = $(this).attr("href");
      setTimeout(function () {
         window.location.href = link;
      }, 300);
      return false;
   });

   const links2 = document.querySelectorAll(".sec3-link-wrp");
   const images = document.querySelectorAll(".links-image");
   imagesToggler(0);
   for (let linkIndex = 0; linkIndex < links2.length; linkIndex++) {
      const link = links2[linkIndex];
      link.addEventListener("mouseenter", () => {
         imagesToggler(linkIndex);
      });
   }

   function imagesToggler(linkIndex) {
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
         const image = images[imageIndex];
         image.classList.remove("links-image--active");
         if (imageIndex % links2.length === linkIndex) {
            image.classList.add("links-image--active");
         }
      }
   }

   $('.hero__slider:nth-of-type(1)').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      fade: true,
      time: 1200,
      autoplaySpeed: 5000
   });
   $('.hero__slider:nth-of-type(2)').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      fade: true,
      time: 1200,
      autoplaySpeed: 4000
   });
   $('.hero__slider:nth-of-type(3)').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      fade: true,
      time: 1200,
      autoplaySpeed: 6000
   });

   var this_quiz = $('.quiz');
   var valid_forms = $('.quiz, #wf-form-remodal-form');
   // var error_msg = '<div class="input-error">This field required</div>';
   // var email_error_msg = '<div class="input-error">This field required</div>';

   this_quiz.slick({
      infinite: false,
      dots: false,
      fade: true,
      speed: 1000,
      draggable: false,
      swipe: false,
      adaptiveHeight: true,
      prevArrow: '.quiz__prev',
      nextArrow: '.quiz__next_',
   });

   $('.quiz .quiz__next').on('click', function (e) {
      var canNextSlide = true;
      var this_quiz_step_wrp = $(e.target).closest('.quiz_step-wrp');
      var req_list = this_quiz_step_wrp.find('[required]');

      if (req_list.length > 0) {
         req_list.each(function (ndx, element) {
            if (!$(element).val()) {
               canNextSlide = false;
               // $(element).closest('.step__input-wrp').append(error_msg);
               addErrorMsg($(element));
            } else {
               if ($(element).attr('type') == 'email' && !validateEmail($(element).val())) {
                  canNextSlide = false;
                  addErrorMsg($(element), 'Incorrect email');
               }
            }
         });
      }

      if (canNextSlide) {
         this_quiz.slick('slickNext');
         $('.input-error').remove();
      }
   });

   //validator
   var textField = ".input[type=text]:required";
   var emailField = ".input[type=email]:required";
   var telField = ".input[type=tel]:required";
   var selectField = "select:required";
   var textareaField = "textarea:required";
   var radioField = "input[type=radio]:required";

   valid_forms.find(telField).mask("999 999-9999");
   valid_forms.find(radioField).change(function (elem) {
      radioInputManage($(elem.target))
   });
   valid_forms.find(radioField).blur(function (elem) {
      radioInputManage($(elem.target))
   });
   valid_forms.find(textField).change(function (elem) {
      textInputManage($(elem.target))
   });
   valid_forms.find(textField).keyup(function (elem) {
      textInputManage($(elem.target))
   });
   valid_forms.find(textField).blur(function (elem) {
      textInputManage($(elem.target))
   });
   valid_forms.find(textareaField).change(function (elem) {
      textInputManage($(elem.target))
   });
   valid_forms.find(textareaField).keyup(function (elem) {
      textInputManage($(elem.target))
   });
   valid_forms.find(textareaField).blur(function (elem) {
      textInputManage($(elem.target))
   });

   valid_forms.find(emailField).keyup(function (elem) {
      emailInputManage($(elem.target));
   });
   valid_forms.find(emailField).change(function (elem) {
      emailInputManage($(elem.target));
   });
   valid_forms.find(emailField).blur(function (elem) {
      emailInputManage($(elem.target));
   });
   valid_forms.find(telField).keyup(function (elem) {
      telInputManage($(elem.target));
   });
   valid_forms.find(telField).change(function (elem) {
      telInputManage($(elem.target));
   });
   valid_forms.find(telField).blur(function (elem) {
      telInputManage($(elem.target));
   });
   valid_forms.find(selectField).change(function (elem) {
      textInputManage($(elem.target))
   });

   function radioInputManage(element) {
      if (element.val()) {
         removeErrorMsg(element);
      } else {
         removeErrorMsg(element);
         addErrorMsg(element);
      }
   }

   function textInputManage(element) {
      if (element.val()) {
         removeErrorMsg(element);
      } else {
         removeErrorMsg(element);
         addErrorMsg(element);
      }
   }

   function emailInputManage(element) {
      if (element.val()) {
         if (validateEmail(element.val())) {
            removeErrorMsg(element);
         } else {
            removeErrorMsg(element);
            addErrorMsg(element, 'Incorrect email');
         }
      } else {
         removeErrorMsg(element);
         addErrorMsg(element);
      }
   }

   /*tel input manager*/
   function telInputManage(element) {
      if (element.val()) {
         if (validateTel(element.val())) {
            removeErrorMsg(element);
         } else {
            removeErrorMsg(element);
            addErrorMsg(element, 'Incorrect phone number');
         }
      } else {
         removeErrorMsg(element);
         addErrorMsg(element);
      }
   }

   function addErrorMsg(element, msg = 'This field required') {
      console.log(element);
      var e_msg = '<div class="input-error">' + msg + '</div>';
      // element.closest('.step__input-wrp').append(e_msg);
      if (element.closest('.step__input-wrp').length > 0) {
         element.closest('.step__input-wrp').append(e_msg);
      } else if (element.closest('.remodal__input-wrp').length > 0) {
         element.closest('.remodal__input-wrp').append(e_msg);
      }
   }

   function removeErrorMsg(element) {
      // console.log(element);
      if (element.closest('.step__input-wrp').length > 0) {
         element.closest('.step__input-wrp').find('.input-error').remove();
      } else if (element.closest('.remodal__input-wrp').length > 0) {
         element.closest('.remodal__input-wrp').find('.input-error').remove();
      }
   }

   function validateEmail($email) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test($email);
   }

   /*tel validator*/
   function validateTel(tel) {
      if ("" === tel || tel.search("_") !== -1) {
         return false
      }
      return true;
   }

   $('#wf-form-remodal-form button').on('click', function (e) {
      // e.preventDefault();
      var this_form = $('#wf-form-remodal-form');
      var req_list = this_form.find('[required]');
      var canSubmit = true;
      if (req_list.length > 0) {
         req_list.each(function (ndx, element) {
            var val = $(element).val();
            // if ( !$(element).val() ) {
            if (!val) {
               canSubmit = false;
               // $(element).closest('.step__input-wrp').append(error_msg);
               addErrorMsg($(element));
            } else {
               if ($(element).attr('type') == 'email' && !validateEmail($(element).val())) {
                  canSubmit = false;
                  addErrorMsg($(element), 'Incorrect email');
               }
               if ($(element).attr('type') == 'tel' && !validateTel($(element).val())) {
                  canSubmit = false;
                  addErrorMsg($(element), 'Incorrect phone number');
               }
            }
         });
      }

      if (!canSubmit) {
         e.preventDefault();
         // this_form.trigger('submit');
      }
   });

   //thank you remodal
   function openRemodal(remodal_id) {
      $.remodal.lookup[$('[data-remodal-id=' + remodal_id + ']').data('remodal')].open();
   }

   function closeRemodal(remodal_id) {
      $.remodal.lookup[$('[data-remodal-id=' + remodal_id + ']').data('remodal')].close();
   }

   $('.reviews__slider').slick({
      infinite: true,
      dots: true,
      prevArrow: '.reviews__slider-prev',
      nextArrow: '.reviews__slider-next',
      adaptiveHeight: true
   });

   var use_lbchtml = false;
   $('.w-lightbox, .vendor-gallery__image, .contact__image').on('click', lbchtml);

   function lbchtml() {
      let lc = $('.w-lightbox-caption:last');
      lc.html(lc.html(lc.text()).text());
      if (!use_lbchtml) {
         $(".w-lightbox-content").bind('DOMSubtreeModified', function () {
            use_lbchtml = true;
            let lc = $('.w-lightbox-caption:last');
            if (lc && 'new' !== lc.attr('data-new')) {
               lc.attr('data-new', 'new');
               let t_lc = lc.html(lc.html(lc.text()).text());
               lc.css({'opacity': 1});
            }
         });
      }
   }

   $('#fonts-loader').remove();

   //zoomio
   document.onkeydown = function (e) {
      //arrow left = 37
      //arrow right = 39

      let keyCode = e.keyCode;
      if (37 === keyCode) {
         let modalCropper2PrevBtn = $('.remodal.remodal--popup.remodal-is-opened').find('.remodal__photo-popup__slider_inner');
         if (modalCropper2PrevBtn.length > 0) {
            modalCropper2PrevBtn.each(function (k, v) {
               if (v.style.display === 'flex') {
                  $(v).find('.hilly-slider-control--prev').trigger('click')
               }
            });
         }
      }
      if (39 === keyCode) {
         let modalCropper2NextBtn = $('.remodal.remodal--popup.remodal-is-opened').find('.remodal__photo-popup__slider_inner');
         if (modalCropper2NextBtn.length > 0) {
            modalCropper2NextBtn.each(function (k, v) {
               if (v.style.display === 'flex') {
                  $(v).find('.hilly-slider-control--next').trigger('click')
               }
            });
         }
      }
   }

   function redMore() {
      const textBox = document.querySelectorAll('.photo-popup__slider-text:not(.no-line-clamp)');
      const btnRedMore = document.querySelectorAll('.btn-redmore-photo');

      // console.log(textBox.length, btnRedMore.length);
      if (textBox.length > 0 && btnRedMore.length > 0 && textBox.length === btnRedMore.length) {
         textBox.forEach((e, i) => {
            //console.log(i, e);
            btnRedMore[i].addEventListener('click', () => {
               // document.querySelector('.photo-popup__slider-text-icon_wrp').style.marginBottom = "0";
               textBox[i].classList.add('no-line-clamp');
               textBox[i].style.maxHeight = "3000px";
               btnRedMore[i].style.opacity = '0';
               btnRedMore[i].style.height = '0px';
               btnRedMore[i].style.zIndex = '-1';
               $(btnRedMore[i]).remove();
               setTimeout(() => {
               }, 200)
            })
         });
      }
   }

   redMore();

   //SmoothScroll
   if (document.body.clientWidth > 1000) {
      SmoothScroll({
         animationTime: 1000, // [ms]
         stepSize: 100, // [px]
         accelerationDelta: 20,
         accelerationMax: 5,
         keyboardSupport: true,
         arrowScroll: 50, // [px]
         touchpadSupport: false,
      });
   }
});

function setPlan(slug) {
   $('[data-remodal-id=vendor-reg]').find('input[name=plan]').val(slug);
}

function removePlan() {
   $('[data-remodal-id=vendor-reg]').find('input[name=plan]').val('');
}


// START old main.js file

// var insta_block = $('#insta_w');
// if (insta_block) {
//     var csrf_p = window.csrf_param;
//     var csrf_t = window.csrf_token;
//     var data = {};
//     data[csrf_p] = csrf_t;
//     $.ajax({
//         type: 'post',
//         url: '/query/insta',
//         dataType: 'html',
//         data: data,
//         success: function(data) {
//             insta_block.html(data);
//         },
//         cache: false
//     });
// }

(function () {
   const menuBtn = document.querySelector('.menu-btn__lines');
   const body = document.querySelector('body');
   menuBtn.addEventListener('click', () => {
      body.classList.toggle('overflow-hidden');
   });
}());


var wedding_submission_form = $('#wf-form-quiz');

if (wedding_submission_form) {
   wedding_submission_form.find('.wedding_submission_form_submit').on('click', function () {
      var csrf_p = window.csrf_param;
      var csrf_t = window.csrf_token;
      var form_data = wedding_submission_form.serialize();
      form_data += '&' + csrf_p + '=' + csrf_t;
      $.ajax({
         type: 'post',
         url: '/query/wedding-submission',
         // dataType: 'json',
         data: form_data,
         success: function (data) {
            console.log(data);
         },
         cache: false
      });
   });


   $('input[type=checkbox]').on('change', function (e) {
      var this_chkbx = $(e.target);
      var temp_block = $('.' + this_chkbx.attr('name').replace('[]', '') + '-block');
      if (this_chkbx && this_chkbx.prop('checked')) {
         if (temp_block && temp_block.hasClass('block-hidden')) {
            temp_block.removeClass('block-hidden');
         }
      } else {
         if (temp_block && !temp_block.hasClass('block-hidden')) {
            temp_block.addClass('block-hidden');
         }
      }
   });
}


$('#footer-email-form, #index-email-form, #hiw-email-form').on('submit', function (e) {
   e.preventDefault();
   var csrf_p = window.csrf_param;
   var csrf_t = window.csrf_token;
   var spform = $(e.target);
   var form_data = spform.serialize();
   form_data += '&' + csrf_p + '=' + csrf_t;
   $.ajax({
      type: 'post',
      url: '/query/send-pulse',
      // dataType: 'json',
      data: form_data,
      success: function (data) {
         // console.log(data);
         // spform.closest('.w-form').find('.w-form-done').show();
         openRemodal('thanks-message');
      },
      cache: false
   });
});


$(document).ready(function () {
   const TABLET_WIDTH = 991;

   // if (document.documentElement.clientWidth > TABLET_WIDTH) {

   function heightFunction() {
      const togglers = document.querySelectorAll('.real-weddings__filters-toggler_category, .real-weddings__filters_heading');
      const dd = document.querySelector('.real-weddings__filters');
      const removeFilters = document.querySelector('.remove-filters');
      const cancelBtn = document.querySelector('[data-action="cancel"]');
      const ddHeight = window.innerWidth > TABLET_WIDTH ? dd.clientHeight + 'px' : 'auto';
      // cancelBtn.addEventListener('click', () => {
      //     dd.style.height = '0px';
      //     if (window.innerWidth <= TABLET_WIDTH) {
      //         dd.style.maxHeight = '0px';
      //     }
      // })
      document.querySelector('[data-action="apply"]').addEventListener('click', () => {
         dd.style.height = '0px';
         if (window.innerWidth <= TABLET_WIDTH) {
            dd.style.maxHeight = '0px';
         }
      });
      cancelBtn.addEventListener('click', () => {
         dd.style.height = '0px';
         if (window.innerWidth <= TABLET_WIDTH) {
            dd.style.maxHeight = '0px';
         }
      });
      dd.style.height = '0px';
      if (window.innerWidth <= TABLET_WIDTH) {
         dd.style.maxHeight = '0px';
      }
      togglers.forEach(tg => {
         tg.addEventListener('click', () => {
            if (dd.style.height !== '0px') {
               dd.style.height = '0px';
               if (window.innerWidth <= TABLET_WIDTH) {
                  dd.style.maxHeight = '0px';
               }
            } else {
               dd.style.height = ddHeight;
               dd.style.maxHeight = '';
            }
         })
      })
   };

   // }

   function slickInitWP() {
      $('.real-weddings__post_slider:nth-child(1)').not('.slick-initialized').slick({
         time: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 4000,
         fade: true,
         arrows: false,
         swipe: false,
      });
      $('.real-weddings__post_slider:nth-child(2)').not('.slick-initialized').slick({
         time: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 2800,
         fade: true,
         arrows: false,
         swipe: false,
      });
      $('.real-weddings__post_slider:nth-child(3)').not('.slick-initialized').slick({
         time: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 3000,
         fade: true,
         arrows: false,
         swipe: false,
      });
      $('.real-weddings__post_slider:nth-child(4)').not('.slick-initialized').slick({
         time: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 2200,
         fade: true,
         arrows: false,
         swipe: false,
      });
   };

   //добавление кнопки LoadMore в пагинации
   function buttonLoadMore() {
      if ($(window).width() > 991) {
         if (!$('.preferred-vendors__nav_link.preferred-vendors__nav_link--pages').last().hasClass('disabled')) {
            $('.LM_btn').remove();
            $('#pager-container').after('<a href="' + $('.link_pagi').last().attr('href') + '" class="btn w-button LM_btn" data-preloader="true">LOAD MORE<span class="btn__arrow-icon"> </span></a>')
         }
      } else {
         if (!$('.preferred-vendors__nav_link.preferred-vendors__nav_link--pages').last().hasClass('disabled')) {
            $('.LM_btn').remove();
            $('#pager-container').before('<a href="' + $('.link_pagi').last().attr('href') + '" class="btn w-button LM_btn" data-preloader="true">LOAD MORE<span class="btn__arrow-icon"> </span></a>')
         }
      }
   }

   //получить Get параметры
   $.urlParam = function (name, sorce) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(sorce);
      if (results == null) {
         return null;
      } else {
         return decodeURI(results[1]) || 0;
      }
   }

   //---    START real-weddings || blog-posts pages    ---
   if (window.location.pathname.replaceAll("/", "") === "real-weddings" || window.location.pathname.replaceAll("/", "") === 'blog-posts') {
      $('select').niceSelect();
      $('.editor-picks__slider').slick({
         infinite: true,
         speed: 600,
         variableWidth: true,
         draggable: false,
         swipe: true,
         touchMove: false,
         slidesToScroll: 1,
         prevArrow: '.editor-picks__prev',
         nextArrow: '.editor-picks__next',
      });

      function filterMenuToggler() {
         console.log('filterMenuToggler');
         if (document.documentElement.clientWidth <= TABLET_WIDTH) {
            const togglers = document.querySelectorAll('.real-weddings__filters-col_heading');
            const dropdowns = document.querySelectorAll('.real-weddings__filters-colors, .real-weddings__filters-checkboxes');
            let ddHeights = [];
            for (let i = 0; i < togglers.length; i++) {
               dropdowns[i].classList.remove('closed');
               ddHeights.push(dropdowns[i].clientHeight);
               dropdowns[i].classList.add('closed');
               togglers[i].addEventListener('click', () => {
                  if (togglers[i].classList.contains('closed')) {
                     togglers[i].classList.remove('closed');
                     // dropdowns[i].style.height = ddHeights[i] + 'px';
                     dropdowns[i].style.height = 'auto';
                     dropdowns[i].classList.remove('closed');
                  } else {
                     togglers[i].classList.add('closed');
                     dropdowns[i].style.height = '0px';
                     dropdowns[i].classList.add('closed');
                  }
               });
            }
         }
      }

      filterMenuToggler();

      Webflow.push(function () {
         let l = $('.slider .featured-in__slider--prev');
         let r = $('.slider .featured-in__slider--next');
         $('.featured-in__sliders-controls')
            .on('click', '.featured-in__prev', function () {
               l.trigger('tap');
            })
            .on('click', '.featured-in__next', function () {
               r.trigger('tap');
            });
      });


      function invisibleTrigger(trigger, btn, time) {
         $(trigger).click(function (e) {
            $(btn).trigger('tap');
            $(trigger).hide();
            setTimeout(function () {
               $(trigger).show();
            }, time);
         });
      }

      invisibleTrigger('.featured-in__next-btn--invisible', '.featured-in__slider--next', 800);
      invisibleTrigger('.editor-picks__slider-control--invisible', '.editor-picks__next', 600);

      function detectswipe(el, func) {
         swipe_det = new Object();
         swipe_det.sX = 0;
         swipe_det.sY = 0;
         swipe_det.eX = 0;
         swipe_det.eY = 0;
         var min_x = 20; //min x swipe for horizontal swipe
         var max_x = 40; //max x difference for vertical swipe
         var min_y = 40; //min y swipe for vertical swipe
         var max_y = 50; //max y difference for horizontal swipe
         var direc = '';
         ele = document.querySelector(el);
         ele.addEventListener(
            'touchstart',
            function (e) {
               var t = e.touches[0];
               swipe_det.sX = t.screenX;
               swipe_det.sY = t.screenY;
            },
            false
         );
         ele.addEventListener(
            'touchmove',
            function (e) {
               //e.preventDefault();
               var t = e.touches[0];
               swipe_det.eX = t.screenX;
               swipe_det.eY = t.screenY;
            },
            false
         );
         ele.addEventListener(
            'touchend',
            function (e) {
               //horizontal detection
               if (
                  (swipe_det.eX - min_x > swipe_det.sX || swipe_det.eX + min_x < swipe_det.sX) &&
                  (swipe_det.eY < swipe_det.sY + max_y && swipe_det.sY > swipe_det.eY - max_y)
               ) {
                  if (swipe_det.eX > swipe_det.sX) direc = 'r';
                  else direc = 'l';
               }
               //vertical detection
               if (
                  (swipe_det.eY - min_y > swipe_det.sY || swipe_det.eY + min_y < swipe_det.sY) &&
                  (swipe_det.eX < swipe_det.sX + max_x && swipe_det.sX > swipe_det.eX - max_x)
               ) {
                  if (swipe_det.eY > swipe_det.sY) direc = 'd';
                  else direc = 'u';
               }
               if (direc != '') {
                  if (typeof func == 'function') func(el, direc);
               }
               direc = '';
            },
            false
         );
      }

      function trendingSliderSwipe(el, d) {
         if (d === 'l') {
            document.querySelector('.featured-in__next').click();
         }
         if (d === 'r') {
            document.querySelector('.featured-in__prev').click();
         }
      }

      if (document.querySelector('.slider-wrp')) {
         detectswipe('.slider-wrp', trendingSliderSwipe);
      }

      const categoryBlock = document.querySelector(".local-vendors__filter-tag_wrp");
      if (categoryBlock && window.innerWidth > 991) {
         var $bl = $(".real-weddings__blog"),
            $th = $(".local-vendors__filter-tag_wrp"),
            blW = $bl.outerWidth(),
            blSW = $bl[0].scrollWidth,
            wDiff = blSW / blW - 1, // widths difference ratio
            mPadd = 60, // Mousemove Padding
            damp = 20, // Mousemove response softness
            mX = 0, // Real mouse position
            mX2 = 0, // Modified mouse position
            posX = 0,
            mmAA = blW - mPadd * 2, // The mousemove available area
            mmAAr = blW / mmAA; // get available mousemove fidderence ratio
         $bl.mousemove(function (e) {
            mX = e.pageX - this.offsetLeft;
            mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
         });
         setInterval(function () {
            posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"
            $th.css({marginLeft: -posX * wDiff});
         }, 10);
      }


      buttonLoadMore(); //добавление кнопки LoadMore на странице real-weddings и blog-posts
      slickInitWP(); //инициализация слика на странице real-weddings
      heightFunction(); //меню фильтров

      // отправка фильтра через pajax
      $('#linkPagerCategory')
         .on('pjax:start', function () {
            //$('.process_gif').fadeIn(); //показать прелоадер
         })
         .on('pjax:end', function () {
            //после сброса - очищаем url от GET запроса и выбор фильтра
            if ($.urlParam('resetV', window.location.href)) {
               let originUrl = window.location.origin;
               let pathUrl = window.location.pathname;
               // window.history.replaceState('name', '', originUrl+pathUrl+'#filter-form');
               window.history.replaceState('name', '', originUrl + pathUrl);
               $(':input', '#filter-form')
                  .not(':button, :submit, :reset, :hidden')
                  .removeAttr('checked')
                  .removeAttr('selected');
               $('.w-checkbox').find('.w-checkbox-input').removeClass('w--redirected-checked');
               //удаляем из ссылок пагинации get параметр resetV
               $('.link_pagi').each(function () {
                  let newUrl = $(this).attr('href').replace('resetV=reset&', '');
                  $(this).attr('href', newUrl);
               });

               let pagiHrefs = $('.real-weddings__nav [href]');
               if (pagiHrefs.length > 0) {
                  pagiHrefs.each(function() {
                     let newPagiUrl = $( this ).attr('href');
                     let newPagiUrlArr = getUrlVars(newPagiUrl);
                     // console.log($( this ).attr('href'));
                     if (newPagiUrlArr['page']) {
                        newPagiUrl = '/' + window.location.pathname.replaceAll("/", "") + '?page=' + newPagiUrlArr['page'];
                        if (newPagiUrlArr['per-page']) {
                           newPagiUrl = newPagiUrl + '&per-page=' + newPagiUrlArr['per-page'];
                        }
                     }
                     $( this ).attr('href', newPagiUrl);
                  });
               }
               $('input[name=searchby]').val('');
            }
            //прокрутка при переключении страниц
            if ($.urlParam('page', window.location.href)) {
               $('html, body').animate({
                  scrollTop: $(this).offset().top
               }, 10);
            }
            //$('.process_gif').fadeOut();
            // Webflow.destroy();
            if ($('.featured-in__sliders-controls').eq(0).length > 0) {
               $('.featured-in__sliders-controls').eq(0).unbind();
            }
            if ($('.featured-in__sliders-controls').eq(1).length > 0) {
               $('.featured-in__sliders-controls').eq(1).unbind();
            }
            buttonLoadMore();
            heightFunction();
            slickInitWP();
            $('select').niceSelect();
            filterMenuToggler();
            Webflow.ready();
         });
   }
   //---    END real-weddings || blog-posts pages    ---

   //---    START how-it-works page    ---
   if (window.location.pathname.replaceAll("/", "") === "howitworks") {
      window.addEventListener('scroll', function () {
         //isMapVisible(document.querySelector('.how-it-works__map-wrp'));
      });
      const CURSOR_TRANSFORM = getComputedStyle(document.querySelector('.how-it-works__sec6_cursor')).transform;
      productsAnimation();
      mapBulletsBlinking();

      function isMapVisible(target) {
         var targetPosition = {
               top: window.pageYOffset + target.getBoundingClientRect().top,
               left: window.pageXOffset + target.getBoundingClientRect().left,
               right: window.pageXOffset + target.getBoundingClientRect().right,
               bottom: window.pageYOffset + target.getBoundingClientRect().bottom
            },
            windowPosition = {
               top: window.pageYOffset,
               left: window.pageXOffset,
               right: window.pageXOffset + document.documentElement.clientWidth,
               bottom: window.pageYOffset + document.documentElement.clientHeight
            };
         if (targetPosition.bottom > windowPosition.top &&
            targetPosition.top < windowPosition.bottom &&
            targetPosition.right > windowPosition.left &&
            targetPosition.left < windowPosition.right) {
            showMap('svg', '.map__border', '.map__states-borders path')
         }
      };

      function showMap(mapSelector, mapBorderSelector, mapStatesBordersSelector) {
         const map = document.querySelector(mapSelector);
         const mapBorder = map.querySelector(mapBorderSelector);
         const mapStatesBorders = map.querySelectorAll(mapStatesBordersSelector);
         mapBorder.style.opacity = 1;
         setTimeout(() => {
            for (let i = 0; i < mapStatesBorders.length; i++) {
               mapStatesBorders[i].style.transitionDelay = `${i * 50}ms`;
               mapStatesBorders[i].style.opacity = 1;
            }
         }, 1000)
      }

      //how-it-works__map_bullet--active
      function mapBulletsBlinking() {
         let bullets = document.querySelectorAll('.how-it-works__map_bullet:not(.how-it-works__map_bullet--active)');
         let activeBullets = document.querySelectorAll('.how-it-works__map_bullet--active');
         for (let i = 0; i < bullets.length / 3.5; i++) {
            bullets[Math.floor(Math.random() * bullets.length)].classList.add('how-it-works__map_bullet--active');
            bullets = document.querySelectorAll('.how-it-works__map_bullet:not(.how-it-works__map_bullet--active)');
         }
         activeBullets = document.querySelectorAll('.how-it-works__map_bullet--active');
         setInterval(changeActiveBullet, 800);
      }

      function changeActiveBullet() {
         let bullets = document.querySelectorAll('.how-it-works__map_bullet:not(.how-it-works__map_bullet--active)');
         let activeBullets = document.querySelectorAll('.how-it-works__map_bullet--active');
         activeBullets[Math.floor(Math.random() * activeBullets.length)].classList.remove('how-it-works__map_bullet--active');
         bullets[Math.floor(Math.random() * bullets.length)].classList.add('how-it-works__map_bullet--active');
      }

      function productsAnimation() {
         let delay = 2500;
         const trackItems = document.querySelectorAll('.how-it-works__product');
         let i = 0;
         const interval = setInterval(() => {
            if (i > trackItems.length) {
               i = 0;
            }
            goToCategory(i);
            i++;
         }, delay);
      }

      function goToCategory(index) {
         const duration = 2000;
         const cursor = document.querySelector('.how-it-works__sec6_cursor');
         const track = document.querySelector('.how-it-works__products');
         const trackItems = document.querySelectorAll('.how-it-works__product');
         const productsCategories = document.querySelectorAll('.product-category');
         const cursorDeltaY = parseFloat(getComputedStyle(productsCategories[0]).height) + parseFloat(getComputedStyle(productsCategories[0]).marginBottom);
         const trackDeltaX = parseFloat(getComputedStyle(trackItems[0]).width) + parseFloat(getComputedStyle(trackItems[0]).marginRight)
         if (index === trackItems.length) {
            resetProducts();
         } else {
            track.style.transform = `translateX(-${index * trackDeltaX}px)`;
            setTimeout(() => {
               cursor.style.transform = `translate(0px, ${(index) * cursorDeltaY}px)`;
            }, duration / 3);
            setTimeout(() => {
               for (let i = 0; i <= index; i++) {
                  productsCategories[i].classList.add('product-category--active');
                  trackItems[i].classList.add('how-it-works__product--active');
               }
            }, duration * 2 / 3);
         }
      }

      function resetProducts() {
         const trackItems = document.querySelectorAll('.how-it-works__product');
         const productsCategories = document.querySelectorAll('.product-category');
         const cursor = document.querySelector('.how-it-works__sec6_cursor');
         const track = document.querySelector('.how-it-works__products');
         const trackDeltaX = parseFloat(getComputedStyle(trackItems[0]).width) + parseFloat(getComputedStyle(trackItems[0]).marginRight)
         track.style.transform = `translateX(-${trackItems.length * trackDeltaX}px)`;
         cursor.style.transform = CURSOR_TRANSFORM;
         for (let i = 0; i < productsCategories.length; i++) {
            productsCategories[i].classList.remove('product-category--active');
            trackItems[i].classList.remove('how-it-works__product--active');
         }
      }
   }
   //---    END how-it-works page    ---

});

function getUrlVars(url) {
   var vars = {}, hash;
   var hashes = decodeURIComponent(url).slice(url.indexOf('?') + 1).split('&');
   for(var i = 0; i < hashes.length; i++)
   {
      hash = hashes[i].split('=');
      vars[hash[0]] = hash[1];
   }
   return vars;
}

//показ всех типов вендоров в квизе /submission#wf-form-quiz
$('.show_all_vendors').click(function () {
   let btnSH = $(this).closest('.btn_block__showhide');
   let vendor = $(this).closest('.step__slim-content').find('.vend_type');
   const heightSB = $('.show_all_vendors').closest('.slick-list').height();
   const heightVTB = $('.show_all_vendors').closest('.step__form').height();
   if (btnSH.hasClass('show_btn')) {
      btnSH.removeClass('show_btn');
      vendor.removeClass('hide-dn');
      let $this = $(this);
      setTimeout(function () {
         vendor.removeClass('hide');
         // $this.text('Hide').hide();
         $this.slideUp();
      }, 100);
   }
   // else {
   //     btnSH.addClass('show_btn');
   //     $(this).text('Show all vendor types');
   //     vendor.each(function(){
   //         if (!$(this).find('input').is(':checked')) {
   //             $(this).addClass('hide');
   //         }
   //     });
   // }
   let $this = $(this);
   setTimeout(function () {
      $this.closest('.slick-list').css('height', (heightSB - heightVTB) + $this.closest('.step__form').height());
   }, 400);
});


//hover by photos - open photo modal
$('.card__additional').on('click', function (e) {
   let target = $(e.target);
   if (!target.hasClass('additional__p_link_vendor')) {
      let cardAdditional = target.closest('.card__additional');
      // console.log(cardAdditional);
      let prevWGS = cardAdditional.prev('.WGS');
      // console.log(prevWGS);
      prevWGS.trigger('click');
   }
});

//поделится в соц сетях
$('[data-btn="shareList"]').click(function () {
   let slideBlock = '';
   let curURL = '';
   let imgURL = '';
   let curTitle = '';
   let theText = '';
   let links = [];
   let slidePopup = 1;
   let slidePar = $(this).closest('[data-place="wrap_slide"]').find("[data-slide]");
   let slideIndex = slidePar.attr('data-slide');
   let remodalSlideBlock = $(this).closest('[data-place="slider"]');
   let curPost = $(this).closest('[data-place="post"]');

   if (slideIndex != undefined && slideIndex.length > 0) {
      console.log('slide')
      if (slidePar.hasClass('PCPH')) {
         slidePopup = 4;
      }
      if (slidePar.hasClass('WGS')) {
         slidePopup = 3
      }
      if (window.location.pathname.replace('/', '').indexOf('gallery') >= 0) {
         if (slidePar.hasClass('WGS')) {
            slidePopup = 1
         }
      }

      slideBlock = $('[data-remodal-id=photo-popup' + slidePopup + ']').find('.remodal__photo-popup__slider_inner[data-slide=' + slideIndex + ']');
      //let slideURL = slideBlock.find('[data-place="slide_href"]').text();

      let idSlide = $(this).closest('[data-place="wrap_slide"]').find("[data-images]").attr('data-images');
      curURL = encodeURIComponent(window.location.origin + '/photo/' + idSlide);
      //curURL = encodeURIComponent(location.href.replace('#', '') + '?data-slide=' + slideIndex + '&data-popup=' + slidePopup+ '#photo-popup'+slidePopup); //ссылка на фото в слайде поста
      imgURL = window.location.origin + slideBlock.find('[data-place="slide_img"]').attr('src');
      curTitle = slideBlock.find('[data-place="slide_title"]').text();
      theText = slideBlock.find('[data-place="slide_text"] p').text();

      slideBlock.find('[data-place="slide_links"] a').each(function () {
         links.push('<a href="' + $(this).attr('href') + '">' + $(this).text() + '</a>');
         $(this).attr('href');
         $(this).text();
         //links = links.toString();
      });

   }

   if (remodalSlideBlock != undefined && remodalSlideBlock.length > 0) {
      console.log('remodal share is');
      //для ремодалов
      let idImg = remodalSlideBlock.attr("data-slide");
      let idRem = remodalSlideBlock.attr("data-rem");
      let attrSlide = $('[data-slide=' + idImg + '][data-popup=' + idRem + ']').attr('data-images');
      console.log(idImg + ' - ' + idRem);
      //для постов
      let attrSlidePost = $('[data-slide=' + idImg + '][data-popup=' + idRem + ']').find('img').attr('data-images');
      curURL = encodeURIComponent(window.location.origin + '/photo/' + attrSlidePost);

      //для страницы /photo/howitwork
      if (window.location.pathname.replace('/', '').indexOf('howitworks') >= 0) {
         if (window.location.pathname.replace('/', '').indexOf('howitworks') == 0) {
            curURL = encodeURIComponent(window.location.origin + '/photo/howitworks-' + attrSlide);
         } else {
            curURL = encodeURIComponent(window.location.origin + window.location.pathname);
         }
      }
      //для главной
      if (window.location.pathname.length <= 1) {
         curURL = encodeURIComponent(window.location.origin + '/photo/mainpage-' + attrSlide);
      }
      //для mainpage
      if (window.location.pathname.replace('/', '').indexOf('mainpage') >= 0) {
         curURL = encodeURIComponent(window.location.origin + window.location.pathname);
      }
      //для photo
      if (window.location.pathname.replace('/', '').indexOf('photo') == 0) {
         curURL = encodeURIComponent(window.location.origin + window.location.pathname);
      }

      imgURL = window.location.origin + remodalSlideBlock.find('[data-place="slide_img"]').attr('src');
      curTitle = remodalSlideBlock.find('[data-place="slide_title"]').text();
      theText = remodalSlideBlock.find('[data-place="slide_text"] p').text();
   }


   if (curPost != undefined && curPost.length > 0 && slideIndex == undefined) {
      console.log('post')
      // ************* START для свадеб ******************
      curURL = encodeURIComponent(window.location.origin + curPost.find('[data-place="post_href"]').attr('href'));
      imgURL = encodeURI(window.location.origin + curPost.find('[data-place="post_img"]').attr('src'));
      curTitle = encodeURIComponent(curPost.find('[data-place="post_title"]').text());
      theText = curPost.find('[data-place="post_text"] p').text();
      // ************* END для свадеб ******************

      if (curPost.find('[data-place="post_href"]').attr('href') == undefined) {
         curURL = window.location.href;
      }
   }

   if (theText.length > 90) {
      theText = encodeURIComponent(theText.substring(0, 90) + '...');
   } else if (theText.length > 0) {
      theText = encodeURIComponent(theText);
   } else {
      theText = curTitle;
   }
   let openURL = curURL;
   //theText = theText+' Authors: '+links;
   console.log('openURL - ' + openURL + ' curTitle - ' + curTitle + ' imgURL - ' + imgURL + ' theText - ' + theText);


   if ($(this).hasClass('fb')) {
      //openURL = 'http://www.facebook.com/sharer.php?s=100&p[url]='+curURL+'&p[title]='+curTitle+'&p[summary]='+theText+'&p[images][0]='+imgURL;
      openURL = 'http://www.facebook.com/sharer.php?u=' + curURL + '&title=' + curTitle + '&description=' + theText + '&picture=' + imgURL;
   }
   if ($(this).hasClass('lnk')) {
      openURL = 'https://www.linkedin.com/shareArticle?mini=true&url=' + curURL;
   }
   if ($(this).hasClass('tw')) {
      openURL = 'http://twitter.com/share?text=' + curTitle + '&url=' + curURL;
   }
   if ($(this).hasClass('pin')) {
      openURL = 'https://pinterest.com/pin/create/button/?url=' + curURL + '&media=' + imgURL + '&description=' + curTitle;
   }

   //for copy current URL
   if ($(this).hasClass('copy')) {
      let copyTxt = decodeURIComponent(curURL);
      let $tmp = $("<textarea>");
      $("body").append($tmp);
      $tmp.val(copyTxt).select();
      document.execCommand("copy");
      $tmp.remove();
      alert("You have successfully copied the URL of this post!");
      return false;
   }

   window.open(openURL, curTitle, 'toolbar=0, status=0, width=640, height=640');
   return false;
});

$(document).on('closing', '.remodal', function (e) {
   console.log('remodal closing');
   //history.pushState(null, '', location.pathname);
   history.replaceState({}, location.href, location.pathname);
});


function disableZoom() {
   console.log('disableZoom');
   let imgBlock = document.querySelectorAll('.remodal__photo-popup__slider-img_wrp');
   if (window.screen.width >= 1368) {
      document.querySelector('#zoomiocontainer').style.zIndex = '-1';
      document.querySelector('#zoomiocontainer').classList.add('closes-zom');
      imgBlock.forEach((img, index) => {
         let imgZoom = img.querySelector('.remodal__photo-popup__slider-img');
         imgZoom.classList.remove('sampleimage');
      })
   }
}

function enableZoom(img) {
   console.log('enableZoom');
   document.querySelector('#zoomiocontainer').classList.remove('closes-zom');
   if (window.screen.width >= 1368) {
      if (document.querySelector('#zoomiocontainer img')) {
         document.querySelector('#zoomiocontainer img').remove();
      }
      document.querySelector('#zoomiocontainer').style.zIndex = '10000';
      let imgZoom = img.querySelector('.remodal__photo-popup__slider-img');
      imgZoom.classList.add('sampleimage');
      jQuery(function ($) { // on DOM load
         $('.sampleimage').zoomio({
            fadeduration: 500,
            fixedcontainer: true,
         })
      })
   }
}

function modalPopup() {
   console.log('modalPopup');
   const imgBlock = document.querySelectorAll('.remodal__photo-popup__slider-img_wrp');
   var popupPhoto = $('.popup-photo__mob');
   const closedIconSection = document.querySelector('[data-close="section"]');
   var closedIconPopup = $('[data-close="popup"]');
   var remodal = $('.remodal--popup');
   if (closedIconSection != null) {
      closedIconSection.addEventListener('click', () => {
         disableZoom();
      });
   }
   closedIconPopup.on('click', () => {
      popupPhoto.removeClass('click');
      popupPhoto.css({"overflow": ""});
      popupPhoto.closest('.remodal-wrapper').scrollTop(0);
      disableZoom();
   });
   imgBlock.forEach((img, index) => {
      img.addEventListener('click', (e) => {
         let thisPopupPhoto = $(e.target).closest('.popup-photo__mob');
         thisPopupPhoto.addClass('click');
         thisPopupPhoto.css({"overflow": "hidden"});
         enableZoom(img);
      })
   })
}

function modalPopupPhotoPage() {
   console.log('modalPopupPhotoPage');
   const imgBlock = document.querySelectorAll('.remodal__photo-popup__slider-img_wrp');
   const sectionPhoto = document.querySelector('.section--photo');
   const popupPhoto = document.querySelector('.popup-photo__mob');
   const closedIconSection = document.querySelector('[data-close="section"]');
   const closedIconPopup = document.querySelector('[data-close="popup"]');
   const remodal = document.querySelector('.remodal--popup');
   closedIconSection.addEventListener('click', () => {
      history.replaceState({}, location.href, location.pathname);
      if (window.screen.width >= 1368) {
         document.querySelector('#zoomiocontainer').style.zIndex = '-1';
         document.querySelector('#zoomiocontainer').classList.add('closes-zom');
         imgBlock.forEach((img, index) => {
            let imgZoom = img.querySelector('.remodal__photo-popup__slider-img');
            imgZoom.classList.remove('sampleimage');
         })
      }
      sectionPhoto.classList.remove('click');
      let $prevBtn = $('.remodal__photo-popup__slider_inner .hilly-slider-control--prev');
      $prevBtn.attr('href', $prevBtn.attr('href').replace('?open=1', ''));
      let $nextBtn = $('.remodal__photo-popup__slider_inner .hilly-slider-control--next');
      $nextBtn.attr('href', $nextBtn.attr('href').replace('?open=1', ''));
   });
   closedIconPopup.addEventListener('click', () => {
      popupPhoto.classList.remove('click');
      remodal.style.overflow = '';
      let $prevBtn = $('.remodal__photo-popup__slider_inner .hilly-slider-control--prev');
      $prevBtn.attr('href', $prevBtn.attr('href').replace('?open=1', ''));
      let $nextBtn = $('.remodal__photo-popup__slider_inner .hilly-slider-control--next');
      $nextBtn.attr('href', $nextBtn.attr('href').replace('?open=1', ''));
   });
   imgBlock.forEach((img, index) => {
      img.addEventListener('click', () => {
         let $prevBtn = $(img).closest('.remodal__photo-popup__slider_inner').find('.hilly-slider-control--prev');
         $prevBtn.attr('href', $prevBtn.attr('href') + '?open=1');
         let $nextBtn = $(img).closest('.remodal__photo-popup__slider_inner').find('.hilly-slider-control--next');
         $nextBtn.attr('href', $nextBtn.attr('href') + '?open=1');

         document.querySelector('#zoomiocontainer').classList.remove('closes-zom');
         if (window.screen.width >= 1368) {
            if (document.querySelector('#zoomiocontainer img')) {
               document.querySelector('#zoomiocontainer img').remove();
            }
            document.querySelector('#zoomiocontainer').style.zIndex = '9999';
            let imgZoom = img.querySelector('.remodal__photo-popup__slider-img');
            imgZoom.classList.add('sampleimage');
            jQuery(function ($) { // on DOM load
               $('.sampleimage').zoomio({
                  fadeduration: 500,
               })
            })
         }
         if (index == 0) {
            sectionPhoto.classList.add('click');
         } else if (index == 1) {
            popupPhoto.classList.add('click');
            remodal.style.overflow = 'hidden';
         }
      })
   })
}

function openRemodal(e, $popup1remodal, $tag) {
   e.preventDefault();
   console.log('openRemodal');
   let $thisSlide = e.target.tagName !== $tag ? $(e.target).find($tag) : $(e.target);
   if ($tag == 'A') {
      $thisSlide = e.target.tagName !== $tag ? $(e.target).closest($tag) : $(e.target);
   }
   let $thisSlideNum = parseInt($thisSlide.attr('data-slide')) ?? 0;
   // $popup1slick.slick('slickGoTo', $thisSlideNum);
   $popup1remodal.remodal().open();
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').css({"display": "none"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider-img_box').css({"opacity": "0"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "0"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "0"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "0"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "0"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "0"});

   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').css({"display": "flex"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider-img_box').css({"opacity": "1"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "1"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "1"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "1"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "1"});
   $popup1remodal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "1"});
}

function photoPopupNext(e) {
   console.log('photoPopupNext');
   disableZoom();
   let thisBtn = $(e.target);
   let thisSlider = thisBtn.closest('.remodal__photo-popup__slider');
   let thisSlideNum = parseInt(thisBtn.closest('.remodal__photo-popup__slider_inner').attr('data-slide'));
   var nextSlideNum = thisSlideNum + 1;
   if (thisSlider.find('[data-slide=' + nextSlideNum + ']').length === 0) {
      nextSlideNum = 0;
   }
   let s1 = thisSlider.find('.remodal__photo-popup__slider_inner[data-slide=' + thisSlideNum + ']');
   let s2 = thisSlider.find('.remodal__photo-popup__slider_inner[data-slide=' + nextSlideNum + ']');
   // s1.css({"opacity":"0"});
   s1.find('.remodal__photo-popup__slider-img_box').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "0"});
   var screenWidth = $(window).width();
   var isClickClass = s1.closest('.remodal__photo-popup.popup-photo__mob').hasClass('click');
   if (screenWidth > 479 && !isClickClass) {
      s2.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "0"});
      s1.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "0"});
   }
   setTimeout(function () {
      s1.css({"display": "none"});
      s1.closest('.remodal-wrapper').scrollTop(0);
      s2.css({"display": "flex"});
      setTimeout(function () {
         // s2.css({"opacity":"1"});
         s2.find('.remodal__photo-popup__slider-img_box').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "1"});
         if (screenWidth > 479) {
            s2.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "1"});
            s1.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "1"});
         }
      }, 300);
   }, 300);
   if ($('.remodal__photo-popup.popup-photo__mob.click').length > 0) {
      s2.find('.remodal__photo-popup__slider-img_wrp').trigger('click');
   }
}

function photoPopupPrev(e) {
   console.log('photoPopupPrev');
   disableZoom();
   let thisBtn = $(e.target);
   let thisSlider = thisBtn.closest('.remodal__photo-popup__slider');
   let thisSlideNum = parseInt(thisBtn.closest('.remodal__photo-popup__slider_inner').attr('data-slide'));
   var nextSlideNum = thisSlideNum - 1;
   if (nextSlideNum < 0) {
      nextSlideNum = thisSlider.find('[data-slide]').length - 1;
   }
   let s1 = thisSlider.find('.remodal__photo-popup__slider_inner[data-slide=' + thisSlideNum + ']');
   let s2 = thisSlider.find('.remodal__photo-popup__slider_inner[data-slide=' + nextSlideNum + ']');
   // s1.css({"opacity":"0"});
   s1.find('.remodal__photo-popup__slider-img_box').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "0"});
   s1.find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "0"});
   var screenWidth = $(window).width();
   var isClickClass = s1.closest('.remodal__photo-popup.popup-photo__mob').hasClass('click');
   if (screenWidth > 479 && !isClickClass) {
      s2.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "0"});
      s1.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "0"});
   }
   setTimeout(function () {
      s1.css({"display": "none"});
      s1.closest('.remodal-wrapper').scrollTop(0);
      s2.css({"display": "flex"});
      setTimeout(function () {
         // s2.css({"opacity":"1"});
         s2.find('.remodal__photo-popup__slider-img_box').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "1"});
         s2.find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "1"});
         if (screenWidth > 479) {
            s2.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "1"});
            s1.find('.remodal__photo-popup__slider_content_wrp').find('.remodal__photo-popup__slider_btn_wrp.remodal__photo-popup__slider_btn_wrp--padding').css({"opacity": "1"});
         }
      }, 300);
   }, 300);
   if ($('.remodal__photo-popup.popup-photo__mob.click').length > 0) {
      s2.find('.remodal__photo-popup__slider-img_wrp').trigger('click');
   }
}

$(document).on('opening', '.remodal', function () {
   console.log('opening - remodal');
   let modal = $(this);
   let $thisSlideNum = 0;
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').css({"display": "none"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider-img_box').css({"opacity": "0"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "0"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "0"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "0"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "0"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide]').find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "0"});

   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').css({"display": "flex"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider-img_box').css({"opacity": "1"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-title').css({"opacity": "1"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.additional__p').css({"opacity": "1"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.preferred-vendors__post_category').css({"opacity": "1"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.photo-popup__slider-text-icon_wrp').css({"opacity": "1"});
   modal.find('.remodal__photo-popup__slider_inner[data-slide=' + $thisSlideNum + ']').find('.remodal__photo-popup__slider_content_wrp').find('.btn-redmore-photo').css({"opacity": "1"});
});


$('.remodal__photo-popup__slider_inner:not([data-page=photo])').swipe({ //исключая страниц /photo/
   swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
      console.log('swipe main');
      if (phase == "start") { // сработает в начале swipe

      }
      if (phase == "end") { //сработает через 20 пикселей то число которое выбрали в threshold
         if (direction == 'left') { //сработает при движении влево
            photoPopupNext(event);
         }
         if (direction == 'right') { //сработает при движении вправо
            photoPopupPrev(event);
         }
         if (direction == 'up') { //сработает при движении вверх

         }
         if (direction == 'down') { //сработает при движении вниз

         }
      }
   },
   triggerOnTouchEnd: false,
   threshold: 30 // сработает через 20 пикселей
});

if (window.screen.width > 991 && (window.location.pathname.indexOf('/post/') >= 0 || window.location.pathname.indexOf('/wedding/') >= 0)) {
   $('.cz--hor__column.cz--hor__column--right.latest-news__slider-wrp').swipe({ //исключая страниц /photo/
      swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
         console.log('swipe for post or wedding');
         if (phase == "start") { // сработает в начале swipe

         }
         if (phase == "end") { //сработает через 20 пикселей то число которое выбрали в threshold
            if (direction == 'left') { //сработает при движении влево
               $('.latest-news__-ontrols.pc-only .latest-news__next').trigger('click');
            }
            if (direction == 'right') { //сработает при движении вправо
               $('.latest-news__-ontrols.pc-only .latest-news__prev').trigger('click');
            }
            if (direction == 'up') { //сработает при движении вверх

            }
            if (direction == 'down') { //сработает при движении вниз

            }
         }
      },
      triggerOnTouchEnd: false,
      threshold: 30 // сработает через 20 пикселей
   });
}

function preloadImage() {
   console.log('preloadImage');
   var unLoadedImage = $('[data-src]').eq(0);
   if (unLoadedImage.length > 0) {
      var thisImg = new Image();
      thisImg.src = unLoadedImage.attr('data-src');
      thisImg.onload = function () {
         if (unLoadedImage.attr('data-src')) {
            unLoadedImage.attr('src', unLoadedImage.attr('data-src'));
            unLoadedImage.removeAttr('data-src')
         }
         isLoadImage(unLoadedImage);
         preloadImage();
      };
   }
}

$(document).ready(function () {
   var allA = $('a');
   if (allA.length > 0) {
      allA.each(function (i, e) {
         let thisA = $(e);
         if (thisA.attr('href') && thisA.attr('href').toLowerCase().includes('instagram')) {
            thisA.attr('target', '_blank');
         }
      });
   }
});
