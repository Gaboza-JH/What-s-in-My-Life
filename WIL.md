## 1. 팀명
WIL(***W***hat's ***I***n My ***L***ife)

<br>

## 2. 주제

나의 삶을 손쉽게 기록하고 이를 통해 나의 감정을 들여다 볼 수 있는 다이어리형 SNS 

<br>

## 3. 프로젝트 소개
최근 연예인을 비롯한 인플루언서들 사이에서 ‘What’s in my bag’이라고하여 유명인들의 가방 속에는 무엇이 들어있을까? 라는 궁금증과 호기심을 발단으로 하나의 밈처럼 유행하기 시작하였습니다. 저희 웹 페이지는 이것을 모티브로 하여 ‘What’s in my life’ 바로 ‘나’ 자신을 중심으로 나의 삶을 보여주고자 하는 의도로 기획 하였습니다.

<br>

## 4. 기술셋 
![image](https://user-images.githubusercontent.com/103519499/190072792-4e9ebbd5-82d7-46c3-beb3-f5b81e8d7dbd.png)

<br>

## 5. WBS 
[WBS](https://docs.google.com/spreadsheets/d/1bOsanxjV91-35bERrX4HfTuPIeBVuP5O5JR-1OD9w3A/edit#gid=1190077019)

<br>

## 6. ERD 구상
![image](https://user-images.githubusercontent.com/63301908/185432611-f27fae04-47b4-40d6-b097-6a85b7f38f9b.png)

<br>

## 7. API 명세서
[API 명세서](https://amused-museum-d72.notion.site/895aa27c552c4b968b3396ad36481f9f?v=ce9a56d0f2ee4da792e96fffeb707dd6)

## 8. 화면 설계도

> Login & 회원가입 Page <br>
![image](https://user-images.githubusercontent.com/103571758/187861853-8b404ee2-8102-49fd-8401-071cccce456c.png)
  - local 회원가입 및 Api를 활용한 로그인

<br>

> Main Page <br>
![image](https://user-images.githubusercontent.com/103571758/187859995-8b89c826-9dd2-4cd0-975f-83b246f6f5bb.png)
  - 로그인, 비로그인시 사용자에게 다른 Main Page를 보여준다
  - 비로그인시 웹 서비스의 간단한 소개와 로그인시 볼 수 있는 게시물들을 Minislide 형태로 보여준다.
  - 로그인시 상단에는 Bigslide에 금주에 좋아요가 가장 많은 상위 5개의 게시물이 출력되고 하단에는 사용자들의 전체 게시물들이 갤러리 형태로 보여준다.<br>
  
<br>

> My Page <br>
![image](https://user-images.githubusercontent.com/103571758/187861399-ff3878ca-7af6-426f-8057-6effa4f31349.png)
![image](https://user-images.githubusercontent.com/103571758/187861505-7a8e1d8f-9892-458e-a1ca-4619440e5dbd.png)
  - My Page에서는 나의 프로필에 대한 정보를 보여준다.
  - 내가 올린 게시물에 대한 금주의 감정 분석 그래프를 보여준다.
  - 게시물 작성 및 갤러리 형태로 화면에 보여준다.
  - 프로필과 게시물을 수정할 수 있다.

  <br>

 > 게시물 page <br>
 ![image](https://user-images.githubusercontent.com/103571758/187861607-67dc3adf-c290-43a0-87cf-43ea45ada145.png)
  - 사용자가 게시물을 클릭시 보여지는 화면

