## <strong>W</strong>hat's <strong>I</strong>n My <strong>L</strong>ife? (WIL) 

<hr>
<br>

## 파트별 현재 진행 상황 및 주간 계획 (~ 09/16)
<hr>

### [BE+FE 프로젝트 계획 특이사항]
- Database 테이블 축소
    - Hashtag 관련 테이블 삭제
    - 댓글 관련 테이블 보류
    - 팔로우 테이블 보류
    >![image](https://user-images.githubusercontent.com/103571758/190538100-5c0fb73d-6c5c-4186-921e-ab10a513116d.png)


## BE
> 각 테이블 CRUD 처리
 - User Table : 회원 추가, 수정, 삭제 처리
 - Post Table : 게시글 등록, 수정, 삭제 처리
 - Image Table : 이미지 업로드, 삭제 처리
 - Likes Table : 좋아요 등록, 삭제, Counting처리

> [API 명세서](https://www.notion.so/895aa27c552c4b968b3396ad36481f9f?v=ce9a56d0f2ee4da792e96fffeb707dd6)

- JWT 토큰값을 받도록 API 수정 (일단 작동되는 것을 목표로 두어 추후 헤더로 토큰값 주고받을 수 있도록 수정할 예정 + 여유가 된다면 refresh token 관련 로직 추가)

> 배포 환경 설정
- Docker Springboot Server Container 생성 <br>
도커 환경에서의 실행
<img width="1034" alt="image" src="https://user-images.githubusercontent.com/103571758/190534302-f55c700a-8f46-40b8-8169-891b33ea56b0.png">
<img width="689" alt="image" src="https://user-images.githubusercontent.com/103571758/190534411-a5b189fc-bdce-446e-a4f2-5976f4a7e85d.png">
front server Docker Container 띄울 예정

- Jenkins 환경설정 진행 중
<img width="1437" alt="image" src="https://user-images.githubusercontent.com/103571758/190534670-6130f3f5-d6cc-41c7-8078-70837adb3db0.png">
 script 작성 진행 예정



<br> 
<hr>
<br> 

## FE
> BE와 FE 연결하는 과정 진행 중
 - 소셜 로그인시 발급받은 jwt로 유저 아이디 전달

 - 토큰값을 통해 비인가유저와 로그인 유저 판별 > 페이지 분기하여 렌더링 (토큰값 만료 시간 판별 및 토큰값 삭제 로직 구현 진행 중)

 - 네이게이션바
    - 로그아웃 기능 추가 예정

 - 마이페이지 
    - 유저가 등록한 게시물 수 연동
    - 유저가 등록한 게시물 별 좋아요 받은 총 집계 연동
    - 회원 닉네임 정보 수정 연동
    - 게시물 등록 연동 예정
    - 게시물 리스트 연동 예정

 - 메인페이지 
    - 전체 게시물 리스트 연동 예정
    - 게시물 클릭시 화면에 보여줄 modal창 수정 및 연동 예정
    - 빅슬라이드에 금주의 게시물 연동 예정


<br>
<hr>
<br>

 
## DE
- 모델에 학습시킬 크롤링한 데이터를 결측치 제거, 라벨링, 전처리 후 S3에 json 형태로 저장 

![image](https://user-images.githubusercontent.com/103519499/190532604-c68d5546-00b0-4e8a-a615-91f5b44ea3f7.png)

![image](https://user-images.githubusercontent.com/103519499/190533227-7f645301-f4d3-4e6b-81fd-b586ddc14e05.png)

- 매일 학습을 통해 업데이트를 할 모델에 학습 데이터를 넘겨줄 S3와 연결

![image](https://user-images.githubusercontent.com/103519499/190534536-f3fb22ec-efa8-439f-bd04-e34ca576a254.png)

- json형태로 저장되는 데이터를 text형태로 변경 계획

- airflow를 활용해서 데이터 수집부터 모델학습 및 업데이트까지 하나의 파이프라인 구축 예정


<br>
<hr>
<br>


## DA

- 여러 테스트를 통해 KOBERT 모델에 훈련 전 데이터 처리를 위한 토크나이저는 없는 것이 좋다고 판단 -> 기초적인 전처리만 수행할 예정

![image](https://user-images.githubusercontent.com/85923524/190533505-c2587513-a3ec-46a1-8947-7821b957fdf0.png)


- Django 프로젝트로 (데이터 모델, 예측) 각 기능별 파일 분기 완료

- docker 컨테이너에 완성된 django 프로젝트를 올리기 위해 선수 지식 docker에 대해서 테스트 진행 완료 

- 배포를 위한 도메인 등록 완료 
(http://www.projectwil.shop/)

![image](https://user-images.githubusercontent.com/63301908/190533713-a01ac9e4-d202-40e6-a470-6dc393badb9d.png)

<br/>

- 이를 바탕으로 현재 프로젝트를 docker 이미지화를 해서 컨테이너를 만들고, api통신 테스트 진행 예정 

- Crontab을 사용해 데이터전처리, git push 등 자동화 수행 중 -> 배치가 필요한 작업들 순차적으로 crontab 적용할 예정 

- 프론트에서 예측 결과값을 차트로 뿌려주는 과정을 수행 해야함.

<br>
<hr>
<br>


## WBS
https://docs.google.com/spreadsheets/d/1bOsanxjV91-35bERrX4HfTuPIeBVuP5O5JR-1OD9w3A/edit#gid=1190077019
