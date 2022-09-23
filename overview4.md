## <strong>W</strong>hat's <strong>I</strong>n My <strong>L</strong>ife? (WIL) 

<br>

## 파트별 현재 진행 상황 및 주간 계획 (~ 09/23)
<hr>

## [FE/BE]
>1 진행 사항
 - 프론트 연동 완료 :
    - 마이페이지
        - 게시물 등록 연동 완료 + 버튼 통합
        - 게시물 리스트 연동 완료
    - 메인페이지
        - 전체 게시물 리스트 연동 완료
        - 게시물 클릭시 화면에 보여줄 modal창 수정 및 연동 완료
        - modal창 좋아요 버튼 연동 완료
        - mouse:hover 기능으로 좋아요 개수 출력 연동 완료
        - 빅슬라이드에 금주의 게시물 연동 완료
        

 - 데이터 모델 서버와 통신 테스트 완료 :
 
     - 게시물 등록시 유저가 작성한 게시물 내용(content)을 감정 분석 모델에 보내 긍정/부정 결과 값을 얻고 DB에 update된 게시물 테이블 확인
     - 긍정/부정 결과 값 프론트에 차트 시각화 완료
     ![image](https://user-images.githubusercontent.com/69191828/191885645-ad216b46-d796-48cd-b60d-56590a1cc461.png)
     

- 프론트 로그아웃 기능 추가 완료
- 토큰 시간 만료되었을 때 자동 로그아웃 기능 구현 완료
- 로컬 유저 회원가입, 로그인 프론트 연동 완료

>2 수정 사항
- ec2 ip 주소로 소셜 로그인 애플리케이션 서비스 URL 및 Callback URL 설정 수정

>3 진행중
- 프론트 디테일 작업 :
    - 게시물 상세 modal창에 좋아요 수가 뜰 수 있도록 변경
    - svg 아이콘으로 좋아요 버튼 수정
    - 비동기 페이지 요청
    - 갤러리 이미지 크기 조정 및 보이는 게시물 숫자 조정
- 백엔드 디테일 작업 : 
    - Restful API
    
## [Web server 배포]
> 배포 pipeline

<img width="983" alt="image" src="https://user-images.githubusercontent.com/103571758/191890872-35732b23-a751-46d3-9c36-054cad5d1181.png">

> EC2 인스턴스 환경에서 도커 테스트 필요
<img width="963" alt="image" src="https://user-images.githubusercontent.com/103571758/191895490-b2bef32b-f50b-4cc7-a6b7-5bcd55283545.png">


> Jenkins Freestyle Project에서 Docker Image 하나씩 만들어서 Spring, React 각각 실행 (Test)
<img width="1153" alt="image" src="https://user-images.githubusercontent.com/103571758/191893754-a950af27-2c63-4560-829e-b04566ab96e2.png">


> Jenkins Pipeline 실행
 - git Repository Clone하여 코드 최신버전 빌드
 - Docker image build 후 compose로 실행
<img width="653" alt="image" src="https://user-images.githubusercontent.com/103571758/191890955-f6eecbcc-444c-4f6b-a601-fc74b2f6773a.png">

> Jenkins를 통해 배포 자동화
 - Docker image를 각 컨테이너에서 실행 중
<img width="1177" alt="image" src="https://user-images.githubusercontent.com/103571758/191891216-3f1a5bbb-7a38-4862-a761-eb32fba06163.png">

> projectwil.shop 도메인 연결

<img width="1343" alt="image" src="https://user-images.githubusercontent.com/103571758/191891098-174e7e74-9628-4064-9b04-3316f4ce23ca.png">

<br>
<hr>

 
## [DE]
>1 진행 사항
- airflow 환경 구축
   ![image](https://user-images.githubusercontent.com/103519499/191882414-2e97319d-7f99-4728-82b2-a742f7789925.png)

- workflow 구상 및 작성
   - 구상 <br>
     ![image](https://user-images.githubusercontent.com/103519499/191893360-29c7597d-b3f3-4ff9-b38c-4356c6bc09c8.png)
   
   - DAG <br>
    ![image](https://user-images.githubusercontent.com/103519499/191884366-ec5175eb-029a-4fa7-a971-5f37df232a3d.png)

   - Task 및 Operator
      - PythonOperator (Python함수를 실행위한 Operator)
         ![image](https://user-images.githubusercontent.com/103519499/191885008-0bcd2b3f-c80a-4969-9438-7405d63c2b2b.png)

      - SSHOperator (Secure Shell 원격 호스트에 접속 후 명령어로 파일 실행위한 Operator / ssh telnet 활용)

         ![image](https://user-images.githubusercontent.com/103519499/191885135-05abd128-2428-4cd3-8d3e-33b7c7ff4700.png)
         ![image](https://user-images.githubusercontent.com/103519499/191885189-02d36e0f-8c49-41dc-b03d-68bbc18e1d24.png)

   - Tasks 의존관계 설정 <br>
   ![image](https://user-images.githubusercontent.com/103519499/191884783-1c6a925e-cce4-46cf-8713-18644e92b0f0.png)
      

- airflow 자동화 시스템 파이프라인 설계 및 구성
   - daily (datat수집 및 전처리 -> s3저장 -> 학습할 model에서 끌어가서 파일변환)
   ![image](https://user-images.githubusercontent.com/103519499/191882635-df4800d3-a5ff-43eb-ad3d-487d6a0794d9.png)

   - weekly (일주일치의 파일 하나로 통합 -> train/test Set으로 split -> model 학습 -> 학습 결과 gitpush -> gitpull)
   ![image](https://user-images.githubusercontent.com/103519499/191883415-fa3583d1-94f7-4e11-ac95-d170dd0fe2e5.png)

- 결과 확인
   - daily <br>
      ![image](https://user-images.githubusercontent.com/103519499/191886581-c2b5c588-022c-4dcd-acb0-25a6135e411f.png)

      ![image](https://user-images.githubusercontent.com/103519499/191892264-315f1994-d43f-4bf9-b8b8-243b7049e172.png)

      ![image](https://user-images.githubusercontent.com/103519499/191892472-8a2c3950-7b02-4f4e-970e-b7ee8f7af2f7.png)
      
   - weekly <br>
      ![image](https://user-images.githubusercontent.com/103519499/191892539-f8cb5ffa-761e-49b1-ac5d-2d9f479c0877.png)

      ![image](https://user-images.githubusercontent.com/103519499/191892783-4e416833-6570-41df-a362-1029144ea937.png)
      
      ![image](https://user-images.githubusercontent.com/103519499/191890510-64a4dac1-0de5-40d5-8f31-6807af6ac2e8.png)


<br>

>2 수정 사항
 - lambda Crawling code 
   댓글의 결측치를 제거하는 과정에서 영어와 특수문자만 있는 댓글이 최종적인 결과에 빈 리스트로 추가되어 학습을 돌릴때 out of range문제가 발생하는 문제점을 해결
 - CrawlingData가 저장된 S3와 model을 학습할 GPU_Server 연결시 권한 문제 해결

<br>

>3 진행 중
- 매주 학습 model에서 업데이트되는 결과가 저장된 github에서 실제 운영중인 model이 자동으로 pull할 수 있도록 연결

- 중복 값 제거

- 지난 주 Crawling한 파일들 S3에서 자동 삭제 가능하도록 구현

<br>
<hr>



## [DA]

>1 진행 사항
 - S3에서 json 형태로 받아와 txt파일로 변환하여 모델  업데이트를 진행하고 git에 재학습한 모델을 push 라고 modelserving 쪽 서버에 git pull 하는 하나의 사이클 완료.
 - modelserving 서버에서 docker swarm의 service 를 활용하여 scale out 완료(현재 컨테이너 5개로 운영) -> 서비스 배포시 여러 사용자가 보내는 api에 대해 부하분산을 해 줄 것으로 기대.
 - react와 modelserving(django) api 통신과정에서 발생하는 CORS 이슈 해결 -> 서빙쪽에서 보내주는 output 값을 db로 들어가는 것을 확인 
 - 게시물에 대한 긍부정을 chart로 뿌려주는 과정까지 완료
 
>2 수정 사항
- 학습시킨 모델 파일이 용량 문제로 git에 push 되지 않던 문제를 git-lfs로 해결
![image](https://user-images.githubusercontent.com/63301908/191882179-68cda9b6-a304-4223-a1bb-f5fbfd507ab9.png)

- GPU_Server에서 Crontab으로 설정해두었던 배치를 airflow로 이식 -> airflow로 데이터파이프라인 스케줄링이 가능함.


>3 진행 중
- 파일 합치는 코드 구현(concat)
- 코드 구현 완료 후, lambda로 크롤링하는 과정부터 최종 model serving서버에 git pull까지의 일련의 과정 테스트 


<br>
<hr>



## WBS
https://docs.google.com/spreadsheets/d/1bOsanxjV91-35bERrX4HfTuPIeBVuP5O5JR-1OD9w3A/edit#gid=1190077019
