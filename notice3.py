from fastapi import FastAPI, HTTPException
# fastapi 라이브러리를 사용해 웹애플리케이션 구축, FastAPI 클래스는 웹애플리케이션 생성되고 HTTPException은 HTTP 예외를 처리하는데 사용
from pydantic import BaseModel, Field
# pydantic 라이브러리에서 BaseModel과 Field 클래스를 가져오는 구문, pydantic은 데이터 모델을 정의하고 유효성 검사에 유용하고 Field는 필드에 관한 조건 설정
from typing import List, Optional
# typing 모듈에서 List, Optional 타입 힌트를 가져오는 구문, 필드의 타입을 명확하게 지정하기 위해 사용
from databases import Database
# database 라이브러리는 비동기 DB접근 지원, Database 클래스는 DB 연결을 설정하고 쿼리 실행 및 트랜잭션 관리
from datetime import datetime
# datetime 클래스를 통해 날짜와 시간을 다루기 위한 목적
import decimal
# decimal 모듈은 정확한 소수점 계산이 필요한 경우에 유용
import pytz  
# pytz 라이브러리 추가, 특정 시간대를 고려하여 날짜와 시간 변환 및 조작 가능 
# 일본시간대로 설정하기 위해 활용
from fastapi.middleware.cors import CORSMiddleware


japan_timezone = pytz.timezone('Asia/Tokyo')
# pytz 라이브러리를 활용해 일본의 시간대(Asia/Tokyo)를 나타내는 시간대 객체 생성
# 날짜와 시간을 변환 및 조작 가능

app = FastAPI()

# # CORS 설정
# origins = [
#     "http://localhost",  # 필요한 도메인을 여기에 추가
#     "http://localhost:8000",
#     "http://57.180.41.44",  # 실제 요청이 발생하는 도메인 추가
# ]


# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
    # allow_headers=["*"],
)

DATABASE1_URL = "mysql://admin:Seigakushakorea0308(!@localhost/boardDB1_sjh3"
DATABASE2_URL = "mysql://admin:Seigakushakorea0308(!@localhost/boardDB2_sjh3"
DATABASE3_URL = "mysql://admin:Seigakushakorea0308(!@localhost/boardDB3_sjh3"
# localhost에서 57.180.41.44:5003으로 변경하니까 우선 CORS문제는 해결됨
# 연결 설정 및 url주소지정, mysql서버에 연결하기 위해 데이터베이스 URL 정의

database1 = Database(DATABASE1_URL)
database2 = Database(DATABASE2_URL)
database3 = Database(DATABASE3_URL)
# DATABASE_URL을 활용하여 각 데이터베이스 별도 연결 설정


class CreateData(BaseModel):
    # messageId 컬럼은 자동 생성되는 기본키로서 추가되지 않음
    purposeIdx: str
    message: str
    mean: decimal.Decimal
    meanAddPhrase: decimal.Decimal
    meanAddMor: decimal.Decimal
    meanAddAll: decimal.Decimal
    runningTime: str
    createdDate: datetime = Field(default_factory=lambda: datetime.now(japan_timezone))
    # 필드의 기본값을 설정하여 (일본)현지 시간으로 반환하는 람다 함수 활용
    # 람다 함수는 Python에서 사용하는 익명 함수의 한 형태로 간결하게 함수를 정의할 수 있는 도구
    # 일시적으로 사용되는 간단한 함수나, 다른 함수 내에서 즉석으로 정의하여 사용될 때 유용
    yesValue: str
    noValue: str
    confirmStatus: bool = False
    # 초기값을 False로 지정함


class UpdateData(BaseModel):
    sendDate: Optional[datetime]
# datetime 객체로 지정되고, 만약 값이 입력되지 않으면 None 간주
# 업데이트시 sendDate 컬럼만 변경되는 것으로 판단하여 하나의 컬럼만 기입

class CreateAnswer(BaseModel):
# 답변메시지 유효성 검사를 위해 DB에서 설정한 필드와 타입을 지정
    messageId: str
    answer: str
    mean: decimal.Decimal
    meanAddPhrase: decimal.Decimal
    meanAddMor: decimal.Decimal
    meanAddAll: decimal.Decimal
    # confirmStatus: bool = False
    yesOrNo: bool = False
    # answermessages에는 confirmStatus컬럼 대신 yesOrNo컬럼으로 대체


@app.on_event("startup")
async def startup():
    await database1.connect()
    await database2.connect()
    await database3.connect()
# startup 핸들러는 중복 정의가 안되어 한번만 정의
# 각 데이터베이스 연결 설정


@app.on_event("shutdown")
async def shutdown():
    await database1.disconnect()
    await database2.disconnect()
    await database3.disconnect()
# shutdown 핸들러는 중복 정의가 안되어 한번만 정의
# 각 데이터베이스 연결 해제


@app.get("/private_data")
# 개인DB 조회하는 API
async def get_private_data():
    
    try:
        query1 = """
                SELECT
                    messageId, purposeIdx, message, mean, meanAddPhrase, meanAddMor, meanAddAll, runningTime, createdDate, yesValue, noValue, confirmStatus FROM firstmessages
                """

        query2 = """
                SELECT
                    answerId, messageId, answer, mean, meanAddPhrase, meanAddMor, meanAddAll, yesOrNo, sendDate, receiveDate FROM answermessages   
                """

        # 개인 DB 조회시 firstmessage와 answermessage 컬럼에 대한 값을 모두 가져오기 위해 두개의 쿼리문 생성
        first_data = await database1.fetch_all(query1)
        answer_data = await database1.fetch_all(query2)
        # query1과 query2에 대한 모든 값를 각각 first_data와 answer_data에 저장

        if first_data is None:
                raise HTTPException(status_code=404, detail="fisrtmessage not found")
        

        # 기본 데이터 구조화. 기본 데이터를 딕셔너리 형식으로 한곳에 저장
        # 기본 메시지와 관련된 데이터를 효율적으로 저장하고 검색하기 위한 목적
        messages = {}
        for record in first_data:
        # 기본메세지 관련 DB에서 조회된 메세지를 반복
            message_id = record['messageId']
            # 키값인 messageId 값을 추출하여 기본 message_id 변수에 저장
            messages[message_id] = {
            # 테이블 컬럼을 message의 속성으로 딕셔너리화해서 차후 쉽게 검색, 호출이 가능하도록 함
                "messageId": record['messageId'],
                "purposeIdx": record['purposeIdx'],
                "message": record['message'],
                "mean": record['mean'],
                "meanAddPhrase": record['meanAddPhrase'],
                "meanAddMor": record['meanAddMor'],
                "meanAddAll": record['meanAddAll'],
                "runningTime": record['runningTime'],
                "createdDate": record['createdDate'],
                "yesValue": record['yesValue'],
                "noValue": record['noValue'],
                "confirmStatus": record['confirmStatus'],
                "answers": []
            }

        # 답변 데이터를 메시지에 연결
        # answer_data 리스트에서 답변 데이터를 가져와서 각 메시지에, 해당하는 답변을 연결
        for answer in answer_data:
        # 답변메세지 관련 DB에서 조회된 메세지를 반복
            message_id = answer['messageId']
            # 키값인 messageId 값을 추출하여 답변 message_id 변수에 저장
            if message_id in messages:
                messages[message_id]["answers"].append({
                # 데이터베이스에서 가져온 답변 데이터를 messages 딕셔너리에 있는 각 메시지에 연결
                    "answerId": answer['answerId'],
                    # "answer": answer['answer'],
                    "answer": f"ㄴ {answer['answer']}",
                    # 모든 답변메세지 앞에 "ㄴ"을 추가하여 기본메세지와 구분이 가능하도록 설계
                    "mean": answer['mean'],
                    "meanAddPhrase": answer['meanAddPhrase'],
                    "meanAddMor": answer['meanAddMor'],
                    "meanAddAll": answer['meanAddAll'],
                    "yesOrNo": answer['yesOrNo'],
                    "sendDate": answer['sendDate'],
                    "receiveDate": answer['receiveDate']
                })

        return {"firstmessages": list(messages.values())}
    # messages.values()는 각각의 메시지에 대한 정보와 답변 목록을 포함한 딕셔너리를 반환하는 메서드.
    # 이를 리스트화해서 "firstmessages"키에 지정
    # 유저가 모든 메시지와 관련된 답변을 "firstmessages" 키를 통해 접근가능 하도록 설계
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "내부 서버 오류",
                "message": str(e)
            }
        )


@app.get("/answer_data")
# /answer_data 경로로 GET 요청을 처리하는 API 엔드포인트 정의
# answermessages 테이블의 데이터를 가져와 유저에게 반환(전달)하는 역할
async def get_answer_data():
    try:
        query = """
        SELECT 
            answerId, messageId, answer, mean, meanAddPhrase, meanAddMor, meanAddAll, yesOrNo
        FROM answermessages
        ORDER BY answerId
        """
        answer_data = await database1.fetch_all(query)
        
        if not answer_data:
            raise HTTPException(status_code=404, detail="답변을 찾을 수 없습니다.")
        
        return {"answermessages": [dict(answer) for answer in answer_data]}
        # 쿼리 결과를 JSON 형식으로 변환하여 유저에게 전달
        # answer_data의 각 항목을 딕셔너리로 변환하고, 이를 리스트 형식으로 표시
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "내부 서버 오류",
                "message": str(e)
            }
        )



@app.get("/2team_data")
# 팀DB 조회하는 API
async def get_2team_data():
    try:    
        query = "SELECT messageId, message, sendDate FROM firstmessages"
        # 팀DB로서 메시지ID와 메시지 내용만을 가져오기 위한 쿼리문
        result = await database2.fetch_all(query)
        # query에 대한 값을 모두 가져와 result 변수에 저장
        if result is None:
            raise HTTPException(status_code=404, detail="Message not found")
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal Server Error",
                "message": "An unexpected error occurred. Please try again later."
            }
            )
    # result에 데이터가 없는 경우 404 에러코드 표시 설정
    # 서버상에서 에러가 발생된 경우 500 에러코드 설정


@app.get("/all_data")
# 전체DB 조회하는 API
async def get_all_data():
    try:    
        query = "SELECT messageId, message, sendDate FROM firstmessages"
        # 전체DB로서 메시지ID와 메시지 내용만을 가져오기 위한 쿼리문
        result = await database3.fetch_all(query)
        # query에 대한 값을 모두 가져와 result 변수에 저장
        if result is None:
            raise HTTPException(status_code=404, detail="Message not found")
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal Server Error",
                "message": "An unexpected error occurred. Please try again later."
            }
            )
    # result에 데이터가 없는 경우 404 에러코드 표시 설정
    # 서버상에서 에러가 발생된 경우 500 에러코드 설정



@app.post("/data")
# create_data 함수 괄호 안 message_id 부분 삭제
# japan_timezone
# runningTime 문제

# 개인, 팀, 전체DB 저장하는 api. 등록버튼을 누르면 firstmessage로 입력내용을 저장(insert)
async def create_data(data: CreateData):
# 데이터를 생성하는 작업을 할때 CreateData basemodel에서 messageId는 파라미터로 가져오지 않기 때문에 "messageId: str"내용 삭제(에러1)
    async with database1.transaction():
    # database1과 트랜잭션을 시작하여 블록내 작업들이 모두 완료되면 종료되고, 중간에 오류가 발생하면 초기 상태로 롤백되어 DB상태 유지 
    # 트랜잭션은 데이터베이스의 신뢰성과 무결성을 보장하는 메커니즘
        search = "SELECT messageId FROM firstmessages ORDER BY CAST(SUBSTRING_INDEX(messageId, '-', -1) AS UNSIGNED) DESC LIMIT 1;"
        # messageId를 - 기준으로 분리하여 마지막 숫자부분을 정수로 변환. 이를 내림차순으로 정렬하여 가장 최근의 메시지 ID값이 하나만 조회되도록 설정 
        result = await database1.fetch_one(query=search)
        # 가장 최근 messageId를 불러오는 쿼리문

        # new_messageId = f"2-3-{messageId + 1}"
         # 새로운 messageId 생성 

        if not result:
            new_messageId = "2-3-1"
        else:
            last_messageId = result['messageId']
            # result에 값이 있는 경우, 가장 최근의 messageId를 last_messageId 변수에 저장
            last_number = int(last_messageId.split('-')[-1])
            # last_messageId.split('-')[-1]을 통해 messageId의 마지막 부분(숫자 부분)을 추출, [-1]은 리스트의 마지막 요소 지칭
            # 해당 부분을 정수형(int)으로 변환하여 last_number에 저장
            new_messageId = f"2-3-{last_number + 1}"
            # new_messageId를 "2-3-{last_number + 1}" 형식으로 생성(자동 추가)

        query = """
        INSERT INTO firstmessages (
        messageId, purposeIdx, message, mean, meanAddPhrase, meanAddMor, meanAddAll, runningTime, createdDate, yesValue, noValue, confirmStatus)
        VALUES (:messageId, :purposeIdx, :message, :mean, :meanAddPhrase, :meanAddMor, :meanAddAll, :runningTime, :createdDate, :yesValue, :noValue, :confirmStatus)    
        """
        # 데이터베이스에 새로운 데이터 삽입
        values = data.dict()
        # Pydantic의 업데이트에 따른 코드의 호환성 보장을 위해 data.dict() 대신 data.model_dump() 사용
        # CreateData = 일본 실시간 시간 추가
        # japan_time = datetime.now(pytz.timezone('Asia/Tokyo'))
        # data.createdDate = japan_time
        # 위 코드를 썼는데 에러 발생, 코드 수정

        values = {
            "messageId": new_messageId,
            # new_messageId 변수에 저장된 값을 사용
            "purposeIdx": data.purposeIdx,
            # data 객체의 purposeIdx 필드를 가져와 그대로 저장
            "message": data.message,
            # data 객체의 message 필드를 가져와 그대로 저장
            "mean": float(data.mean),
            # data 객체의 mean 필드를 가져와 소수점 형태로 변환하여 저장
            "meanAddPhrase": float(data.meanAddPhrase),
            # data 객체의 meanAddPhrase 필드를 가져와 소수점 형태로 변환하여 저장
            "meanAddMor": float(data.meanAddMor),
            # data 객체의 meanAddMor 필드를 가져와 소수점 형태로 변환하여 저장
            "meanAddAll": float(data.meanAddAll),
            # data 객체의 meanAddAll 필드를 가져와 소수점 형태로 변환하여 저장
            "runningTime": data.runningTime,
            # data 객체의 runningtime 필드를 가져와 그대로 저장
            "createdDate": data.createdDate,
            # data 객체의 createdDate 필드를 가져와 그대로 저장
            "yesValue": float(data.yesValue),
            # data 객체의 yesValue 필드를 가져와 소수점 형태로 변환하여 저장
            "noValue": float(data.noValue),
            # data 객체의 noValue 필드를 가져와 소수점 형태로 변환하여 저장
            "confirmStatus": data.confirmStatus
            # data 객체의 confirmStatus 필드를 가져와 그대로 저장
        }
        # 데이터 값 설정. Pydantic 모델의 데이터를 values 딕셔너리 형태로 변환, 각 필드를 타입에 맞게 설정
        # Pydantic은 데이터 유효성 검사 및 설정 관리를 위한 Python 라이브러리

        await database1.execute(query, values=values)
        await database2.execute(query, values=values)
        await database3.execute(query, values=values)
        # query내 VALUES 값이 하단의 values 딕셔너리에서 가져온 각각의 입력값으로 대체(바인딩, 매핑한 데이터를 DB에 삽입)
        # 매핑한 데이터를 DB에 삽입 -> 쿼리문 value값에 실제 입력값을 채워서 DB에 삽입
        # except Exception as e:
        #     raise HTTPException(status_code=500, detail=str(e))
        return {"message": "Data created successfully"}


@app.put("/data/{messageId}")
# sendDate 생성 API 호출. PUT 요청이 해당 경로로 들어오면 timeDisplay 함수 호출
# 초기값인 null에 새로운 정보를 덮어쓰는 방식이라 put(update) 사용
async def timeDisplay(messageId: str):
        query = "SELECT * FROM firstmessages WHERE messageId = :messageId"
        existing_data = await database1.fetch_one(query, values={"messageId": messageId})
        # database1에서 쿼리를 실행하고 결과를 existing_data에 저장
        if not existing_data:
            raise HTTPException(status_code=400, detail="Bad request")
        # 쿼리데 대한 결과값이 없을 경우(데이터가 존재하지 않는 경우)를 에러코드 400으로 처리
        
        now = datetime.now(japan_timezone)
        # 현재 날짜와 시간을 일본 시간대(JST)로 YYYY-MM-DD HH:MM:SS 형식의 문자열로 포맷
        # now = japan_timezone x
        update_query = """
        UPDATE firstmessages
        SET sendDate = :sendDate
        WHERE messageId = :messageId
        """
        await database1.execute(update_query, values={"sendDate": now, "messageId": messageId})
        await database2.execute(update_query, values={"sendDate": now, "messageId": messageId})
        await database3.execute(update_query, values={"sendDate": now, "messageId": messageId})
        # 개인DB, 팀DB, 전체DB상에서 sendDate 데이터값이 동일하게 삽입되도록 설정(연동)
        # sendDate를 업데이트하는 update_query문 실행, values는 sendDate와 messageId 실제 값으로 대체(바인딩)
        return {"timeDisplay": now.strftime('%Y-%m-%d %H:%M:%S')}
        # now 변수에 저장된 현재 일본 시간을 제공
        # {"timeDisplay": "2024-07-23 12:34:56"} 형태로 값이 도출
        # return {"timeDisplay": now} x
        