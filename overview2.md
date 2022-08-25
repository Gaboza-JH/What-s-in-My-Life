## <strong>W</strong>hat's <strong>I</strong>n My <strong>L</strong>ife? (WIL) 
<hr>
<br>

### 현재 진행상황 ( ~ 08.19)
- ERD 구상 
- API 명세서
- 추천 게시물 노출시킬 알고리즘 구상

<br>
<hr>
<br>

## 아키텍쳐 기술 스택 정리
![image](https://user-images.githubusercontent.com/63301908/185431710-2ad6f2b6-7628-4e9a-98c5-591713ac2ef4.png)

<br> 
<hr>
<br> 

## ERD 구상

![image](https://user-images.githubusercontent.com/63301908/185432611-f27fae04-47b4-40d6-b097-6a85b7f38f9b.png)

<br>
<hr>
<br>

 
## API 명세서
https://www.notion.so/woodybuzz/0e69d9298fe84f6885369a19ac7e9d7b?v=ff6b59e4e598436da2b34b472e9c6096

<br>
<hr>
<br>


## 추천시스템 방식 
<br>

### 추천 방식
 - 크롤링을 통해서 sns의 이미지 data를 얻어 학습시켜 원하는 모델을 구현하고 사용자가 최근 좋아요를 누른 게시물과 가장 유사한 형태의 또 다른 게시물들을 화면에 노출되도록 하는 것이 목표입니다.

### 알고리즘
- 방법1 <br>
 : 컨텐츠 기반 필터링: 키워드와 태그를 사용 (유튜브)
 
- 방법2 <br>
: 협업 기반 필터링: 사용자의 나이, 거주지역, 생활패턴 등 (인스타그램, 영화추천)

### 회의할 사항
- 태그를 포함한 이미지와 단순 이미지를 각 각 어떤 기준으로 추천 게시물화 시켜야 할 지 구상
- 좋아요를 누른 게시물들을 어떤 기준(가중치)으로 나눠서 학습을 시켜야하는지 구상
- 모델 학습에 필요한 data를 어떤 방식으로 수집해야 되는지 구상 
- 수집한 data들을 어떤 방식으로 가공을 해야되는지 구상

<br>
<hr>
<br>

## 주간 계획 ( ~ 08.26)
1. Front 페이지 구성 및 화면 설계 
2. 학습에 필요한 이미지 데이터 수집 (instagram 크롤링)
3. S3 클라우드 환경 설정
4. 아키텍처 설계(기술 스택 활용 및 동작 과정 정리)
5. 소셜 로그인 API 통합

<br>
<hr>
<br>

## WBS
https://docs.google.com/spreadsheets/d/1bOsanxjV91-35bERrX4HfTuPIeBVuP5O5JR-1OD9w3A/edit#gid=1190077019
