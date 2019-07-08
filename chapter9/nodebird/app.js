const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').confing();    // .env에 설정된 값을 process.env에 넣어준다

const pageRouter = require('./routes/page');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

// 내부적으로는 모두 next()를 호출해서 다음 step으로 넘어갈 수 있게 한다
app.use(morgan('dev')); // 로그 관리. 개발: dev, short. 운영: common, combined
app.use(express.static(path.join(__dirname, 'public')));    // 정적 파일. public 폴더 내에 항목을 접근 가능
app.use(express.json());    // 요청의 본문을 해석. 보통 폼이나 AJAX 요청의 데이터 처리. json 처리
app.use(express.urlencoded());  // 주소 형식
app.use(cookieParser(process.env.COOKIE_SECRET));    // 동봉된 쿠키를 해석
app.use(session({
    resave: false,  // 요청이 들어왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false,   // 세션에 저장할 내역이 없더라도 세션을 저장할지 설정
    secret: process.env.COOKIE_SECRET,   // cookieparser의 비밀키와 같은 역할
    cookie: {   // 쿠키 옵션
        httpOnly: true, // 클라이언트에서 쿠키를 확인 못하게
        secure: true    // false: https가 아닌 환경에서는 사용 못함
    }

}));    // 세션 관리. 로그인 등의 이유로 세션을 구현할 때 사용. 
app.use(flash());   // 일회성 메시지들을 웹 브라우저에 나타낼 때 사용

app.use('/', pageRouter);   // 주소가 /로 시작하면 page.js를 호출

app.use((req, res, next) => {   // 주소를 찾지 못했으므로 404 에러 생성
    const err = new Error('Not found');
    err.Status = 404;
    next(err);
});

app.use((req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('dev') === 'development' ? err : {};
    res.status(erro.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});