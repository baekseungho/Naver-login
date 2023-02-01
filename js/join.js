// input에 focus가 in 됐을 때 그것의 부모 .inputbox에게 .inputboxact 클래스를 준다. (border)
$('input').focusin(function(){
  $(this).parent('.inputbox').addClass('inputboxact');
});
$('input').focusout(function(){
  $(this).parent('.inputbox').removeClass('inputboxact');
});

let idveri, pwveri, pwchkveri, nameveri, birthveri, genderveri, phoneveri, addressveri = false;
// 아이디
// #userid input에서 focusout 됐을 때 그것의 글자수가 0이라면 (조건) 
// #userid .warn에 '필수 정보입니다.' 라고 쓴다(실행문)
$('#userid input').focusout(function(){
  let len = $(this).val().length;
  idveri = false;
  if(len == 0){
    $('#userid .warn').html('<span class="text-red">필수 정보 입니다.</span>');
  }else if(len < 5 || len > 20){
    $('#userid .warn').html('<span class="text-red">5~20자의 영문소문자만 사용가능합니다.</span>');
  }else{
    $('#userid .warn').html('<span class="text-green">믓진 아이디네요!</span>');
    idveri = true;
  }
});

// 비밀번호
$('#userpw input').focusout(function(){
  let len = $(this).val().length;
  pwveri = false;

  if(len == 0){
    $('#userpw .inputbox p').empty();
    $('#userpw .warn').html('<span class="text-red">필수 정보 입니다.</span>');
    $('#userpw img').attr("src","./images/m_icon_pw_step_01.png");
  }else if(len < 8 || len > 16 ){
    $('#userpw .warn').html('<span class="text-red">8~16자 영문 대 소문자,숫자, 특수문자를 사용하세요.</span>');
    $('#userpw img').attr("src","./images/m_icon_pw_step_10.png");
    $('#userpw .inputbox p').html('<span class="text-red">사용불가</span>');
  }else{
    pwveri = true;
    $('#userpw .warn').empty();
    $('#userpw img').attr("src","./images/m_icon_pw_step_04.png");
    $('#userpw .inputbox p').html('<span class="text-green">안전</span>');
  }
});

// 비밀번호 재확인
$('#userpw-chk input').focusout(function(){
  userpwchk = $('#userpw-chk input').val();
  userpw = $('#userpw input').val();
  pwchkveri = false;

  if(userpwchk.length == 0){
    $('#userpw-chk .warn').html('<span class="text-red">필수 정보 입니다.</span>');
    $('#userpw-chk .inputbox img').attr("src","./images/m_icon_pw_step_02.png")
  }else if(userpw != userpwchk){
    $('#userpw-chk .warn').html('<span class="text-red">비밀번호가 일치하지 않습니다.</span>');
    $('#userpw-chk .inputbox img').attr("src","./images/m_icon_pw_step_02.png")
  }else{
    pwchkveri = true;
    $('#userpw-chk .inputbox img').attr("src","./images/m_icon_pw_step_07.png");
    $('#userpw-chk .warn').empty();
  }
});

// 이름
$('#username input').focusout(function(){
  let username = $('#username input').val();
  nameveri = false;
  // JS 정규 표현식 입력값을 체크
  // 형식 : /정규식/
  // 문자와 숫자가 아닌 것
  let reg = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g;
  if(username.length == 0){
    $('#username .warn').html('<span class="text-red">필수 정보 입니다.</span>');
  }else if(reg.test(username)) {
    // 정규식을 만족하면 true 만족하지 않으면 false 반환
    $('#username .warn').html('<span class="text-red">한글과 영문 대 소문자를 사용하세요. (특수기호 사용 불가)</span>');
  }else{
    nameveri = true;
    $('#username .warn').empty();
  }
});

// 생년월일
// #year, #month, #date에서 focusout됐을 때 (실행할 함수)
// #year의 value length가 숫자 4가 아니라면(조건1)
// #birth .warn 빨간 글씨로 "태어난 년도 4자리를 정확하게 입력하세요."

function para(text){
  $('#birth .warn').html('<span class="text-red">' + text + '</span>')
}

$('#year, #month, #date').focusout(function(){
  let year = $('#year').val();
  let month = $('#month').val();
  let date = $('#date').val();
  

  // 현재 날짜 및 시간
  let now = new Date();
  console.log(now);
  // Date 객체의 getTime() 메서드 1970년 1월 1일 00시 00분 00초 UTC(세계표준시)를 기준으로 경과한 밀리초를 반환
  let nowstramp = now.getTime();
  //현재 날짜 및 시간에서 현재 연도의 네 자리값을 변수에 할당
  now = now.getFullYear();
  console.log(now);

  let birth = new Date(year, month, date);
  birth = birth.getTime();
  birthveri = false;

  if(year.length != 4){
    //$('#birth .warn').html('<span class="text-red">태어난 년도4자리를 정확하게 입력하세요.</span>');
    para('태어난 년도4자리를 정확하게 입력하세요.');
  }else if(month.length == 0){
    //$('#birth .warn').html('<span class="text-red">태어난 월을 선택해주세요.</span>');
    para('태어난 월을 선택해주세요.');
  }else if(date.length == 0 || date > 31 || date < 1){
    //$('#birth .warn').html('<span class="text-red">태어난 일(날짜) 두자리를 정확하게 입력하세요.</span>');
    para('태어난 일(날짜) 두자리를 정확하게 입력하세요.')
  }else if((isNaN(year)==true) || (isNaN(month)==true) || (isNaN(date)==true)){
    //$('#birth .warn').html('<span class="text-red">생년월일을 다시 확인해주세요.</span>')
    para('생년월일을 다시 확인해주세요.')
  }else if(now-year > 100){
    //$('#birth .warn').html('<span class="text-red">정말이세요..?</span>')
    para('정말이세요..?')
  }else if(nowstramp < birth){
    //$('#birth .warn').html('<span class="text-red">미래에서 오셨군요!!</span>')
    para('미래에서 오셨군요!!')
  }else{
    birthveri = true;
    //$('#birth .warn').empty();
    para("");
  }
});

//성별
//#gender .inputbox를 클릭했을 때
$('#gender .inputbox').click(function(e){
  // radio의 기본 클릭동작 해제
  e.preventDefault();
  $("#gender .inputbox").removeClass('btn-primary');
  //removeAttr : 속성을 remove
  $("#gender .inputbox input").removeAttr('checked');
  // 내가 클릭하는 .inputbox한테 클래스,속성 추가
  $(this).addClass('btn-primary');
  $(this).children('input[type="radio"]').attr('checked', 'checked');
  genderveri = true;
});

//이메일
$('#usermail input').focusout(function(){
  let usermail = $(this).val();
  // JS 정규 표현식 입력값을 체크
  // 형식 : /정규식/
  // 문자와 숫자가 아닌 것
  let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  mailveri = true;
  if(usermail.length == 0){
    $('#usermail .warn').empty();
  }else if(!regExp.test(usermail)) {
    $('#usermail .warn').html('<span class="text-red">이메일 주소를 다시 확인해주세요.</span>');
    mailveri = false;
  }else{
    $('#usermail .warn').empty();
    mailveri = true;
  }
});

// 휴대전화
// #phonenum input에서 focusout 됐을 때
// 그것의 value.length가 0이라면 (조건1)
// #phone .warn "필수 정보입니다." (실행문1)
$('#phonenum input').focusout(function(){
  // let phonenum = $(this).val();
  if($(this).val().length==0){
    $('#phone .warn').html('<span class="text-red">필수 정보 입니다.</span>')
  }else {
    $('#phone .warn').empty();
  }
});

// #veribtn을 클릭 했을 때
$('#veribtn').click(function(){
  // #phonenum input value length가 10-11자리가 아니라면(조건1)
  let verifi = $('#phonenum input').val();
  verifi = verifi.replace(/[^0-9]/g, '');
  $('#phonenum input').val(verifi);

  let veri1;
  if(verifi.length<10 || verifi.length>11){
    veri1 = false;
  } else {
    veri1 = true;
  }

  let veri2;
  if(!isNaN(verifi)) {
    veri2 = true;
  } else {
    veri2 = false;
  }

  // 1. 인증번호를 형식에 맞게 입력하면 인증번호를 발급
  // 2. 인증번호를 발급 받으면 인증번호 입력칸을 활성화
  // 3. 전화번호를 형식에 맞지 않게 입력했을 경우 인증번호 입력칸 비활성화
  if(veri1 == true && veri2 == true){
    $('#phone .warn').html('<span class="text-green">휴대전화 인증번호 발송<br>인증번호를 발송했습니다.(유효시간 30분)<br>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.<br></span>');
    $('.disinput').removeClass('disinput');
    $('#veritext').removeAttr('disabled');
  } else {
    $('#phone .warn').html('<span class="text-red">형식에 맞지 않는 번호입니다.</span>');
    $('#veritext').parent('.inputbox').addClass('disinput');
    $('#veritext').attr('disabled','disabled');
  }

});
  //#veritext에서 focusout됬을 때
  //그 값이 "1234" 와 같다면 (조건1)
  $('#veritext').focusout(function(){
    phoneveri = false;
    if($(this).val() == "1234") {
      phoneveri = true;
      $('#phone .warn').html('<span class="text-green">인증되었습니다.</span>');
      $(this).parent('.inputbox').removeClass('inconsitency');
      $(this).next('div').empty();
    } else {
      $(this).next('div').html('<span class="text-red">불일치</span><span class="disagree"></span>');
      $('#phone .warn').html('<span class="text-red">인증번호를 다시 확인해주세요.</span>');
      $(this).parent('.inputbox').addClass('inconsitency');
    }
  });
  
// 주소
// 카카오에서 제공하는 주소찾기 API 활용
// API란? Application Programming Interface의 줄임말
// 프론트앤드(클라이언트)와 백앤드(서버)가 요청과 응답을 받을 수 있게 만들어진 체계
// API 요청에서 가장 중요한 개념 CRUD
// Create, Read, Update, Delete API 요청의 기본요소 네가지
// API를 만드는 역할을 하는 게 서버 개발자 = 즉 백엔드 개발자
function sample6_execDaumPostcode() {
  addressveri = true;
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
          
          } else {
              document.getElementById("sample6_extraAddress").value = '';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
          
      }
      
  }).open();
}

// #joinbtn을 눌렀을 때 필수 요소가 모두 true라면(조건1)
// #join-form을 submit (실행문1)

$('#joinbtn').on('click',function(){
  if(idveri && pwveri && pwchkveri && nameveri && birthveri && genderveri && phoneveri && addressveri){
    $('#join-form').submit();
  } else {
    $('input').trigger("focusout");
    $('#joinchk .warn').html('<span class="text-red">필수요소를 모두 입력해주세요.</span>');
  }
});