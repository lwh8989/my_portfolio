
# 씨앗 프로젝트

초기 프로젝트를 진행할 때 업무 자동화 통일을 위한 방안으로 씨앗프로젝트를 구성하였습니다.

웹서버를 실행하여 `nunjucks` 뷰 엔진을 실행하고 있고 `gulp`를 이용하여 기초적인 마크업 업무 자동화 시스템을 구축하였습니다.

## 구성

- express
- njk
- gulp
- less
- spritesmith

## 설치 방법

1. `$ git clone {{ repo_url }}`
1. `$ npm install` 최초 설치 시
1. `$ npm start` 서버 실행 시
1. `$ npm run dist` 최종 HTML 산출물 `./dist`에 생성